enum Composer {
  comp = 'comp',
  pipe = 'pipe'
}

type Fn<T, R> = (v: T) => R;

type FnExt<T, R> = {
  [Composer.comp]: <S>(g: Fn<S, T>) => Op<S, R>;
  [Composer.pipe]: <S>(g: Fn<R, S>) => Op<T, S>;
};

export type Op<T, R> = Fn<T, R> & FnExt<T, R>;

/**
 * Makes functional operations available on given function.
 * @param f
 */
export function op<T = any, R = any>(f: Fn<T, R>): Op<T, R> {
  const res = (v: T) => f(v);
  res[Composer.comp] = <S>(g: Fn<S, T>) => op((v: S) => f(g(v)));
  res[Composer.pipe] = <S>(g: Fn<R, S>) => op((v: T) => g(f(v)));
  return res as Op<T, R>;
}

/**
 * Produces a constant-operator from given value.
 * @param v
 */
export function cons<S = any, T = any>(v: T): Op<S, T> {
  return op((e: S) => v);
}

/**
 * Produces an operator which serves a identity.
 */
export function id<S = any>(): Op<S, S> {
  return op((v: S) => v);
}

// partial, curry, memoize, object-equality (with custom EQ) goes into value.ts

