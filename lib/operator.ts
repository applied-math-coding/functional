enum OpUtil {
  comp = 'comp',
  pipe = 'pipe',
  partial = 'partial'
}

type Fn<T, R> = (v: T, ...r: T[]) => R;

type FnExt<T, R> = {
  [OpUtil.comp]: <S>(g: Fn<S, T>) => Op<S, R>;
  [OpUtil.pipe]: <S>(g: Fn<R, S>) => Op<T, S>;
  [OpUtil.partial]: (v: T) => Op<T, R>;
};

export type Op<T, R> = Fn<T, R> & FnExt<T, R>;

/**
 * Makes functional operations available on given function.
 * @param f
 */
export function op<T = any, R = any>(f: Fn<T, R>): Op<T, R> {
  const res = (v: T, ...r: T[]) => f(v, ...r);
  res[OpUtil.comp] = <S>(g: Fn<S, T>) => op((v: S) => f(g(v)));
  res[OpUtil.pipe] = <S>(g: Fn<R, S>) => op((v: T) => g(f(v)));
  res[OpUtil.partial] = (v: T) => op((...r: T[]) => f(v, ...r));
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


