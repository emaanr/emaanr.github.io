---
draft: false
title: ESP32
created: 2026-05-05T00:00:00
updated: 2026-05-05T00:00:00
tags: [ESP32, Embedded, Electronics, FreeRTOS]
tz: "America/New_York"
---

# ESP32

My notes on the things I learned through and about the ESP32 from the projects I did. These are probably somewhat imprecise and/or explained at a higher abstraction than what is _really_ happening. The dev board I used was the ESP32 DevKit V1 which uses the ESP32-D0WD-V3 (revision v3.1) chip and the ESP32-WROOM-32 module.

# Physical Structure

The ESP32 ecosystem is layered:

1. PCB (Development Board)
2. Module (WROOM)
3. Chip (ESP32)

## PCB

The outermost layer, the dev board itself. It is a PCB (Printed Circuit Board) with all the components soldered onto it already.

### WROOM

A smaller PCB soldered onto the dev board. Identifiable as the silver metal can with "ESP32-WROOM-32" printed on it. The silver metal can is a shielding to contain the RF emissions.

Espressif sells the WROOM as a pre-certified module so
others can drop it into their own designs without redoing all the work required to establish it in the first place. WROOM is one of several module families offered.

#### ESP32

The silicon die inside the WROOM module. The chip alone has no flash, no antenna, and no shielding, those come from the module.

<!-- # Sleep Modes -->

# Power Supply

Power on a dev board exists in three scopes:

1. Header Pins
2. Power Supply Pins
3. Power Domain Pins

To sumarize, USB-C (or an external 5V supply on VIN) delivers 5V to the on-board LDO regulator, which steps it down to 3.3V. This 3.3V output is distributed in parallel to both the 3V3 header pin and the three VDD pins on the ESP32 chip. GND is the common ground reference for everything.

## Header Pins

These are pins exposed on the edge of the dev board. They let external components draw power from the board or let an external supply power the board. These pins are board-level features, not chip-level. They exist on the dev board's PCB, not on the ESP32
s silicon pinout.

### VIN

The 5V rail. Connected to the USB-C through some protective component like a diode.

### 3V3

The 3.3V rail. The output of the on-board AMS1117-3.3 LDO regulator which steps the input voltage down to 3.3V.

### GND

The board's ground reference. All voltages on the board (5V on VIN, 3.3V on 3V3, etc.) are measured relative to GND.

## Power Supply Pins

The pins on the chip's pinout that the chip itself draws power from. On datasheets or schematics, VDD is the positive power supply pin and VSS is the ground or negative supply pin on a chip. The naming comes from the MOSFET transistor terminologies of gate (G), source (S), and drain (D). So the terms are just V for voltage and double S or D for source and drain respectively.

### VDD

The positive supply pin. Stands for "Voltage at the Drain". 

### VSS

The ground/negative supply pin. Stands for "Voltage at the Source". In single-supply systems, VSS is electrically identical to GND. The chip-level name is VSS, the board-level name is GND, and they are the same node.

## Power Domain Pins

A power domain is an internal group of a chip that shares a single supply input. Domains exist for a few reasons:

1. Distributing current across different bond wires.
2. Isolating noisy pins from quiet ones.
3. Allowing some sections of the chip to stay powered while others are turned off (this is how sleep modes work).
4. Accommodating different sections to run at different voltages.

The dev board takes the 3.3V coming out of the AMS1117-3.3 LDO regulator and distributes it in parallel along 3 different bond wires to each of the VDD pins on the ESP32 chip, allowing each VDD to supply its own distinct 3.3V power to the pins in its domain.

> Note on 3P3: The "3P3" encodes "3.3", the "P" stands in for the decimal "P"oint, likely because the naming conventions used in chip design tools don't permit periods in identifiers.

### VDD3P3_CPU

Powers the CPU and main digital peripherals (the on-chip hardware blocks the CPU talks to). Active during normal operation and powered down during deep sleep. Deep sleep is the ESP32's lowest power mode, where the CPU and most peripherals are turned off.

### VDD3P3_RTC

Powers the always-on RTC (Real-Time Clock) block. Stays alive during deep sleep which is why pins in this domain can be used to trigger wakes.

### VDD_SDIO

Powers the SPI flash interface. Doesn't always run 3.3V which is why there is no "3P3" in the name because the voltage isn't always fixed to 3.3V.

GPIOs 6-11 aren't exposed on the dev board I have. I'm assuming this is because they are consumed by the integrated SPI flash. GPIOs 6-11 are reserved for the integrated SPI flash and should not be used as general-purpose I/O, regardless of whether they're exposed on the headers.

# Voltage Regulation

A voltage regulator takes an input voltage and produces a steady, lower output voltage regardless of fluctuations in the input or changes in the load. There are two main families:

1. Switching Regulators
2. Linear Regulators

## Switching Regulators

Transfer energy in pulses through an inductor. A lot more efficient but with more complexity and noise.

## Linear Regulators

Burns the input/output difference as heat and are simpler and less noisy.

### LDO

A Low-Dropout regulator is a linear regulator designed to operate with a small input-to-output voltage difference (the "dropout"). The dropout from 5V to 3.3V is small which makes LDOs practical here.

### Dev Board

The dev board uses a LDO regulator for its power supply. Recall that the dev board is a higher abstraction layer than the WROOM Module which houses the ESP32.

#### External AMS1117-3.3 LDO

The regulator on my specific dev board is unclear but it is most likely this one or something similar to it.

The board-level regulator. A fixed 3.3V LDO that can maximally support 1A of current but more practically supports 800 mA of current. It sits on the dev board's PCB next to the USB connector. Takes 5V from USB (or the VIN header pin) and produces the 3.3V that powers everything: the chip's VDD pins, the 3V3 header pin, and any 3.3V peripherals wired to it.

The 3V3 header pin is connected directly to this regulator's output, so external components powered from 3V3 share the AMS1117's current budget with the ESP32 chip itself. At peak ESP32 current draw (~500 mA during WiFi transmit), the AMS1117 dissipates (5V − 3.3V) × 0.5A ≈ 0.85W as heat, which is why the regulator gets warm during heavy WiFi use.

### ESP32

The ESP32 also has an on-chip regulator built into the silicon die itself.

#### Internal VDD_SDIO LDO

The chip-level regulator. Built into the ESP32 silicon itself, dedicated to producing 1.8V on the VDD_SDIO domain when configured for 1.8V flash chips. Has no part number as it's not a discrete component, just a region of the chip's silicon designed to act as an LDO.

Configuration is controlled at boot by the MTDI strapping pin (GPIO12):

- MTDI = 0 (default):
  - VDD_SDIO is fed directly from VDD3P3_RTC at 3.3V, bypassing the internal LDO.
- MTDI = 1:
  - VDD_SDIO is powered from the internal 1.8V LDO.

The internal LDO can supply up to 40 mA which is enough to power a small flash chip but not anything beyond that. It exists specifically to support low-power flash chips, not as a general-purpose 1.8V rail.

# Current Limitation

GPIOs have two distinct current limits. Per the ESP32 Series Datasheet §5.3, Table 12 ("DC Characteristics")[^1].

## Per-Pin

The maximum current a single pin can safely source or sink. Exceeding this stresses the pin's output driver and can permanently damage the silicon. This is the limit that current-limiting resistors (such as with LEDs) manage.

Maximum Drive Strength:
- Source (IOH):
  - Up to 40 mA (CPU/RTC Domains) and 20 mA (SDIO) per Pin.
- Sink (IOL):
  - Up to 28 mA per Pin.
- Conservative Guideline for Sustained Operation: 12 mA per Pin.

## Per-Power-Domain

The total current that can flow through all active pins in the same domain at once. The bond wire and on-chip distribution feeding each domain has finite capacity. The per-pin limit being satisfied for every pin individually doesn't mean the domain can supply all of them simultaneously.

The datasheet doesn't give a single hard ceiling. It does include a
footnote:

- As more pins in the same domain source current simultaneously,the available per-pin current drops from ~40 mA toward ~29 mA.

So the per-pin and per-domain limits are coupled. The more pins active at once, the less each one is allowed to push.

This is _internal_ to the chip, distinct from the AMS1117 LDO's ~800 mA total capacity on the 3V3 rail. The 3V3 rail feeds all three chip VDD pins in parallel, so I'm assuming the regulator's limit caps the sum across all domains plus anything else drawn from the 3V3 header pin.

<!-- ## Hardware Fundamentals

### GPIO Modes
### Strapping Pins
### Resistors
#### Current-Limiting Resistors
#### Pulldown Resistors
### Debounce

## PWM

### Duty Cycle & Frequency
### LEDC

## Real-Time Operating Systems

### RTOS
#### Preemptive Scheduling
### Tasks
#### Task Pinning
### SMP
### Scheduler
### Context Switching

## Synchronization Primitives

### Mutex
### Semaphore
#### Binary vs Counting
### Producer/Consumer Pattern

## Concurrency Hazards

### Race Conditions
### Deadlock
### Critical Sections
### Atomicity vs Freshness

## Interrupts

### ISR
#### Interrupt Context vs Task Context
#### IRAM_ATTR
#### portYIELD_FROM_ISR
### Edge-Trigger vs Level-Trigger

## Toolchain & Debugging

### ESP-IDF
### Cross-Compilation
### UART Serial Debugging
### Brownout Detector -->

[^1]: [ESP32 Series Datasheet](https://documentation.espressif.com/esp32_datasheet_en.pdf)