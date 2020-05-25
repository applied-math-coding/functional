# Basic Functional Programming Library

This Javascript-library intends to gather some useful pieces of functional programming concepts.
It does not aim to be comprehensive but rather tries to put together some common and
often used patterns which can be supplied as very small dependency to your project.

## Environment

Runs in modern Browsers and Node.js.
Includes all type declarations for being used in Typescript.

## Installing

npm install @applied.math.coding/functional

or

yarn add @applied.math.coding/functional

## Getting Started

Add
```
@import {op} from '@applied.math.coding/functional'
```
to your project.

## Features

Supports:
- composition
- piping
- partial application
- memoizing
- identity-operator
- constant-operator

## Examples and Usages

### Creation:
To supply any given function f with functional-features, do
```
op(f)
```

### Identiy-Operator:
To create an operator which serves as identity, do
```
id()
```

### Constant-Operator:
To create an operator which returns a constant value, do
```
cons(a)
```

### Composition:
Any number of function can be composed by,
```
op(f1).comp(f2).comp(f3)(a)
```
This is equivalent to f1(f2(f3(a)))

### Piping:
You can chain together any number of functions by,
```
op(f1).pipe(f2).pipe(f3)(a)
```
This is equivalent to f3(f2(f1(a)))<br/>
Or make it more readable by using a constant-operator upfront,
```
cons(a).pipe(f1).pipe(f2).pipe(f3)()
```

### Memoizing:
You can create a memoized version of a function f by,
```
const g = op(f).mem();
```
Any calls to g will be served from memory if available.<br/>
Note, this works for functions with any number of arguments.

### Partial Application:
You can create from a given function f(a,b,c) with any number of parameters a
partial-application by,
```
op(f).partial(a)(b,c)
op(f).partial(a, b)(c)
op(f).partial(a).partial(b).partial(c)()
op(f).partial(_, b, _)(a,c)
```
Note, the '_' serves as a placeholder.

## Author

* **math.coding**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details



