# Basic Functional Programming Library

This Javascript-library intends to gather some useful pieces of functional programming concepts.
It does not claim to be comprehensive but rather tries to put together some common and
often used patterns which can be supplied as very small dependency to your project.

## Environment

Runs in modern Browsers and Node.js.
Includes all type declarations for being used in Typescript.

## Installing

npm install @applied.math.coding/functional

or

yarn add @applied.math.coding/functional

## Getting Started

Simple example which composes three functions.

```
@import {op} from '@applied.math.coding/functional'

function add_1(a: number): number {
  return a+1;
}

function add_2(a: number): number {
  return a+2;
}

function multi_2(a: number): number {
  return a*2;
}

const r = op(add_1).comp(add_2).comp(multi_2)(1);
// computes: r = add_1(add_2(multi_2))(1)
```

## Features

Supports:
- composition
- piping
- partial application
- memoizing
- identity-operator
- constant-operator

## Usage

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
Any number of functions can be composed by,
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
You can create a memoized version of a function by,
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

## License

Copyright (C) <applied.math.coding@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.



