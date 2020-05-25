# functional
Functional programming library

This is a small but useful library which provides basic function programming
concepts.
It is written in Typescript and can run in Browser as well as Node.js.

Installation:
....

Currently supported are:
- partial application
- memoizing
- composition
- piping
- constant-op
- identity-op

Usage:
  Based on functions f,g,h with any number of parameters,
    a partial-application:
      op(f).partial(a)(b,c)
      op(f).partial(a).partial(b)(c)
      op(f).partial(a,b)(c)
      op(f).partial(a).partial(b).partial(c)()

    a memoized version:
      let g = op(f).mem()
      g(a,b,c), g(a,b,c)

    a composition of functions:
      op(f).comp(g).comp(h)(a)
      is equivalent to f(g(g(a)))

    a piped-composition of functions:
      op(f).pipe(g).pipe(h)(a)
      is equivalent to h(g(f(a)))

    a constant operator:
      cons(a)

    an identity operator:
      id()

    cons(a).pipe(f).pipe(g)()
      is equivalent to g(f(a))
//TODO
