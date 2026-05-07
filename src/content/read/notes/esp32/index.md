---
draft: false
title: ESP32
created: 2026-05-05T00:00:00
updated: 2026-05-05T00:00:00
tags: [ESP32, Embedded, Electronics, FreeRTOS]
tz: "America/New_York"
---

# ESP32

My notes on the things I learned through the ESP32 from the projects I did.

# Power

On datasheets or schematcs, VDD is the positive power supply pin and VSS is the ground or negative supply pin on a chip. The name comes from the MOSFET transistor terminologies of gate (G), source (S), and drain (D). So the terms are just V for voltage and double S or D for source and drain respectively.

## VDD

Stands for Voltage at the Drain (positive supply). 

### VIN

### 3V3

## VSS

Stands for Voltage at the Source (negative supply).

### GND

# Pin

## Per-Pin Limit

# Power Domain

A power domain is an internal grouping of pins that physically share a single power supply input. A chip with multiple domains has multiple VDD pins, each feeding a different subset of the GPIOs.

## Per-Power-Domain Limit

[^1]: [MPU-6050 Register Map](https://invensense.com/wp-content/uploads/2015/02/MPU-6000-Register-Map1.pdf)