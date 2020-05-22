enum OpUtil {
  comp = 'comp',
  pipe = 'pipe',
  partial = 'partial',
  mem = 'mem'
}

type Fn<T, R> = (v: T, ...r: T[]) => R;

type FnExt<T, R> = {
  [OpUtil.comp]: <S>(g: Fn<S, T>) => Op<S, R>;
  [OpUtil.pipe]: <S>(g: Fn<R, S>) => Op<T, S>;
  [OpUtil.partial]: (v: T) => Op<T, R>;
  [OpUtil.mem]: () => Op<T, R>;
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
  res[OpUtil.partial] = (v: T) => op((...r: T[]) => f(v, ...r));  //TODO try to allow for ...v:T[]
  res[OpUtil.mem] = () => op(memoize(f));
  return res as Op<T, R>;
}

type Memoize<R, T> = Map<R, Memoize<R, T> | T>;

function memoize<R, T>(g: Fn<R, T>): Fn<R, T> {
  let lookup: Memoize<R, T> = new Map<R, Memoize<R, T> | T>();
  return (...v: R[]): T => {
    const evalAndEnsurePath = <R, T>(lp: Memoize<R, T>, e: R[]): T => {
      const [e_0, ...e_r] = e;
      if (!lp.has(e_0)) {
        lp.set(e_0, new Map<R, Memoize<R, T> | T>());
      }
      const lp_e_0 = lp.get(e_0) as Memoize<R, T>;
      if (e_r.length) {
        evalAndEnsurePath(lp_e_0, e_r);
      } else if (!lp_e_0.has(null)) {
        const [v_0, ...v_r] = v;
        lp_e_0.set(null, g(v_0, ...v_r) as any as (Memoize<R, T> | T));
      }
      return lp_e_0.get(null) as T;
    }
    return evalAndEnsurePath(lookup, v);
  };
}

/**
 * Produces a constant-operator from given value.
 * @param v
 */
export function cons<S = any, T = any>(v: T): Op<S, T> {
  return op((e: S) => v);
}

/**
 * Produces an operator which serves as identity.
 */
export function id<S = any>(): Op<S, S> {
  return op((v: S) => v);
}


