---
draft: false
title: "Rust: First Pass"
created: 2026-10-26T00:00:00
updated: 2026-10-26T00:00:00
tags: [Rust]
tz: "America/New_York"
---

# Rust: First Pass

> `CLog. 2026-10-27`
>
> - Asked a friend about the "Unit Type" `()`.
>
> <details>
> <summary><code>Changelogs</code></summary>
>
> `CLog. 2026-10-26`
>
> - Went through sections "3.1 Variables and Mutability" and "3.2 Data Types".
>
> </details>
>
> `Init. 2026-10-26`
>
> - Recording some things that stand out as I go through this <a href="https://rust-book.cs.brown.edu" target="_blank" rel="noopener noreferrer">eBook</a> to learn Rust for the first time. See my snippets for it <a href="https://github.com/emaanr/snipbits/tree/main/rust/ext/trpl-bu" target="_blank" rel="noopener noreferrer">here</a>.

# Dump

<details>
<summary>Variables & Mutability</summary>

## Variables & Mutability

- Variables are immutable by default
  - Can't change bound value
  - Causes compile-time error
- Variables must be explicitly declared mutabled using `mut` like so `let mut x = val`
- Constants are always immutable
  - Declared with `const` keyword
  - Not allowed to use `mut`, causes compile-time error
  - Type _must_ be annotated
  - Declarable at any scope
  - Can only be set to a constant expression, values computed at runtime not allowed
  - Valid for entire program runtime within declared scope
- Keyword `let` only declarable in function-scope
- Shadowing supported
  - Use `let` with same variable name
  - Differs from `mut` since it requires use of `let` during reassignment, causes compile-time error
    - By using `let`, can perform some transformations on a value while preserving immutability after resolution
    - Effectively creating a new variable when using the `let` keyword, allows us to change type of value while preserving the access name. I.e. `let spaces = "   "; let spaces = spaces.len();`
      - Using `mut` causes a compile-time error due to variable type mutation, which is not allowed with `mut`

## Data Types

- There are "scalar" and "compound" data type subsets
- Rust is _statically typed_, meaning it must know the types of all variables at compile-time
  - Compiler can usually infer based on value and usage, but in cases where many types are possible, must be explicit. I.e. `let guess: u32 = "42".parse().expect("Not a number!");`

### Scalar

- "Scalar" types represent a single value, of which Rust has four primary scalar types: integers, floating-point numbers, Booleans, and characters.

#### Integers

- Number literals can be written like so:
  - Decimal: `98_222`, where the `_` is purely for readability and processed as `98222` otherwise.
  - Hex: `0xfff`
  - Octal: `0o77`
  - Binary: `0b1111_0000`, similar idea here with `_` for readability.
  - Byte (`u8` only): `b'A'`
- Integer types default to `i32`, which is a signed 32-bit integer.
- Note the special `isize` and `usize` architecture-dependent integer types.

##### Integer Overflow

- Behavior differs depending on compilation in debug mode or not.
  - Debug Mode: Compiler checks for overflow, causing `panic!` if detected.
  - Release Mode (`--release`): Compiler doesn't check for overflow, and instead performs "2's complement wrapping", that is, value `256` in a `u8` type becomes `0`, so on so forth (mod 256 in a sense).
  - The standard library offers families of methods for handling possibility of overflow.

#### Floating-Points

- Floating-Point types default to `f64` since on modern CPUs, it is roughly the same speed as `f32`, but capable of more precision.
- Represented according to IEEE-754 standard.


#### Boolean

- Specified with `bool` and can be `true` or `false`

#### Chararacter

- The `char` is the most primitive alphabetic type.
- There is a difference between single quote and double quote declarations.
  - Single Quote (`''`): `char` literal
  - Double Quote (`""`): String literal
- 4 bytes in size and represents a Unicode scalar value, which means it can represent more than just ASCII, such as accented letters, Chinest, Japanese, Korean, Emojis, and zero-width spaces.
- Note that human intuition for "character" does not translate exactly to what the `char` type actually is.

### Compound

- "Compound" types can group multiple values into one type, of which Rust has two primitive types: tuples and arrays.

#### Tuples

- A "tuple" is a general way of grouping values with a variety of types into one compound type.
- Fixed length, once declared, cannot grow or shrink
- Comma-separated list of values inside parenthesis, where each position has its own associated type, optionally annotated. I.e. `fn main() { let tup: (i32, f64, u8) = (500, 6.4, 1); }`
  - Variable `tup` binds to the entire tuple since it is considered a single compound type element.
- Values can be extracted like so by using a pattern with `let` called _destructuring_:

  ```rust
  fn main() {
    let tup = (500, 6.4, 1);
    let (x, y, z) = tup;
    println!("The values of the tuple are, ({x}: i32, {y}: f64, {z}: i32)");
  }
  ```
- Tuple values can also be accessed directly via `.` notation, followed by the index to access:

  ```rust
  fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);
    let five_hundred = x.0;
    let six_point_four = x.1;
    let one = x.2;
  }
  ```

- A mutable tuple's individual elements can be modified:

  ```rust
  fn main() {
    let mut x: (i32, i32) = (1, 2);
    x.0 = 0;
    x.1 += 5;
    // Results in x = (0, 7)
  }
  ```

##### Unit Type `()`

- TODO: Briefly mentioned, revisit, seems a bit involved

#### Arrays

- Another way of representing a collection of multiple values as a compound type.
- Unlike tuple, every element _must_ have the same type.
- Fixed length (unlike some other languages).
- Declared as per usual: `let arr = [1, 2, 3, 4, 5];` and accessed via indices as per usual: `arr[0]; // 1`
- Allocated on the stack rather than the heap.
- Not as flexible as vector type, which is a similar collection provided by the standard library that is allowed to grow or shrink because its contents live on the heap.
- Array type annotation done like so: `let arr: [i32; 5] = [1, 2, 3, 4, 5];` where `i32` is the type and `5` is the fixed length of the array (number of elements).
- Can initialize with the same value like so: `let arr = [3; 5];` which produces `let arr = [3, 3, 3, 3, 3];`
- Single chunk of contiguous memory of a known, fixed size, allocated on the stack.
- Accessing an array index that is out of bounds causes a runtime-error.
  - Example of Rust's memory safety principles, other low-level languages don't check for this, resulting in accessing invalid memory, i.e. SEGFAULT.

</details>

## Concepts

> Concepts that come up that I _know_ I need to solidify my understanding of. Some general, some Rust-specific. I'll return to these.

- Literals vs Constants vs Constant Expression
- Expressions vs Statements
- 2s Complement & Other Binary Representations
- LSB vs MSB
- Computer Architecture Bit-age

## Conversation

> Concepts that were introduced by talking to smart friends.

- A tuple in Rust is a product type. Consider a tuple of type `(u8, u8, u8)`. Each of those `u8`'s can represent a value from `0` to `255`, therefore, the set of unique values that can be represented is `256` x `256` x `256`, or `256` to the power of `3`.
  - Came up when asking about the Unit Type, still need to explore it more but it represents `1`, think of it as () being to the power of `0`. There is also the Never Type, represented by `!`, i.e. `fn func() -> !`. The never type seems to be used by compiler for optimizations among other things.

---

<details>
<summary>TODO/REVISIT: Unit Type <code>()</code> and Never Type <code>!</code>
</summary>

### Central Mental Model

Types describe possible values. **Product types multiply those possibilities, sum types add them, unit contributes one possibility, and never contributes zero.**

This is called a type's **cardinality**.

- `bool` has 2 possible values.
- `u8` has 256 possible values, inclusive of 0.
- Unit `()` has exactly 1 possible value.
- Never `!` has 0 possible values.

### Unit Type `()`

- `()` is an **empty tuple** with a cardinality of 1.
- This is because the product of zero factors is mathematically defined as 1, the **empty product**.
- `()` does in fact represent a product raised to the power of 0, connecting Rust's type system to some interesting mathematical ideas.
- `()` occupies 0 bytes because storing its value requires no information; we already know what it must be: `()`.

```rust
let x: () = ();
let y: () = ();

println!("{}", std::mem::size_of::<()>()); // 0
```

### Never Type `!`

- Never `!` has 0 possible values, while `()` has exactly 1 possible value.
- A type with no possible values is called an **uninhabited type**.
- You cannot construct a value of `!` because no such value exists.
- Examples:
  - Functions that never return normally.
  - Loops that never exit.
  - Expressions `return`, `break`, and `continue` also have never-type behavior because they transfer control away rather than producing a value at that expression's location.

**Fundamental purpose:**

- **Type safety:** Expresses that a computation cannot produce a value.
- **Control flow:** Lets the type checker reason about branches that diverge.
- **Exhaustiveness:** Establishes that certain cases are impossible.
- **Optimization:** Compiler can use those guarantees to recognize unreachable paths.

### Product and Sum Types

- **Product types** multiply their possibilities, i.e. tuples and structs.
  - Think **AND**.
  - More generally, `|A × B| = |A| × |B|`.
- **Sum types** add their possibilities, i.e. enums.
  - Think **OR**.
  - `Option<T>` is an example, combining `None` and `Some(T)`.

**Properties of Unit & Never:**

| Type construction | Cardinality | Mathematical analogy |
|---|---|---|
| `(u8, ())` | 256 × 1 = 256 | Multiplicative identity |
| `(u8, !)` | 256 × 0 = 0 | Multiplication by zero |
| `Option<()>` | 1 + 1 = 2 | Two distinct possibilities |
| `Option<!>` | 1 + 0 = 1 | Only `None` is possible |
| `Result<u8, !>` | 256 + 0 = 256 | No possible error value |

*Examples involving `!` as a generic type argument are conceptual; some such uses remain restricted on stable Rust.*

Mathematically:

- `T × 1 = T`
- `T × 0 = 0`
- `T + 0 = T`

The type interpretations are:

- Unit `()` behaves like **1** under product-type construction.
- Never `!` behaves like **0** under product and sum-type construction.

This is why the names **unit type** and **never type** aren't arbitrary.

The concepts belong to a broader area called **algebraic data types**, which is worth studying alongside Rust's enums, structs, and pattern matching.

---

<details>
<summary>Expanded Examples & Distinctions</summary>

### Tuple Cardinality

Consider:

```rust
let coordinate: (u8, u8, u8) = (10, 20, 30);
```

- Each `u8` can represent 256 possible values.
- The tuple has `256 × 256 × 256 = 256³` possible values.
- This is why tuples are considered **product types**, because their cardinalities multiply.

### Never Type and Control Flow

Consider:

```rust
fn get_number(valid: bool) -> u32 {
    if valid {
        42
    } else {
        panic!("Invalid!");
    }
}
```

Rust expects both branches of the `if` expression to be compatible with the function's `u32` return type.

But:
- The first branch produces `u32`.
- The second branch produces `!`, because `panic!` never returns normally.

**Why does it compile?**

- Because the never type can be coerced into any type.
- Rust can treat `!` as compatible with `u32` because execution will never produce a value from that branch.
- There is no possible value produced by `!` that could turn out to be an invalid `u32` (or any other type), by definition.

### Sum Types and Option<T>

```rust
enum MyOption {
    None,
    Some(u8),
}
```

This is a sum type with cardinality `1 + 256 = 257`.

`Option<T>` works similarly:

- `None` represents the absence of a value.
- `Some(value)` represents the presence of a value.
- `Some()` is invalid for `Option<u8>` because it requires a `u8` value.
- `None` does not take parentheses.

### Infallible

Some uses of `!` in generic type positions are still restricted on stable Rust. For a practical equivalent, Rust provides `std::convert::Infallible`, an enum with no variants.

```rust
use std::convert::Infallible;

fn get_number() -> Result<u8, Infallible> {
    Ok(42)
}
```

- The function can only produce `Ok`, never `Err`, because no value of `Infallible` can be constructed.
- This also illustrates why Rust can reason about impossible cases without needing the program to execute.

### Important Distinctions

**Product types vs. subtypes:**
- A product type isn't a subtype in the usual type-system sense.
- It's a category of type constructed by combining other types.
- Tuples and structs are examples of product types, while enums are typically sum types.

**Unit vs. Never:**
- `()` and `!` are not interchangeable just because both require zero bytes of value storage.
- `()` is **inhabited**: one value exists.
- `!` is **uninhabited**: no value exists.
- Their meaning to the type checker is fundamentally different.

**Scalar/Compound vs. Sum/Product:**
- Scalar and compound types describe a structural classification of types in Rust.
- Sum and product types describe how values are combined mathematically.
- These are different ways of classifying types, not competing classifications.

</details>

### Further Reading / Questions

- [Reddit: Absurd Rust — Never Type](https://www.reddit.com/r/rust/comments/1p1924r/absurd_rust_never_rusts_never_type_and_the/)
- Top and Bottom Types?
- TypeScript comparison?
- Algebraic Data Types?

</details>