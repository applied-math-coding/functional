import { op } from "../lib";
import { cons, id } from "../lib/operator";

describe('functional operator', () => {

  it('should compose functions', () => {
    const add_1 = (a: number): number => a + 1;
    const mult_2 = (a: number): number => a * 2;
    const add_3 = (a: number): number => a + 3;
    const r = op(add_1).comp(mult_2).comp(add_3)(3);
    expect(r).toBe(13);
  });

  it('should pipe functions', () => {
    const add_1 = (a: number): number => a + 1;
    const mult_2 = (a: number): number => a * 2;
    const add_3 = (a: number): number => a + 3;
    const r = op(add_3).pipe(mult_2).pipe(add_1)(3);
    expect(r).toBe(13);
  });

  it('should create a constant operator', () => {
    const o = cons(13);
    expect(o('a')).toBe(13);
  });

  it('should create the identity operator', () => {
    const o = id();
    expect(o('a')).toBe('a');
  });

  it('should create a partial application', () => {
    const f = (a: number, b: number, c: number) => a * b + c;
    const r = op(f).partial(2)(3, 4);
    expect(r).toBe(10);
  });

  it('should memoize given function', () => {
    let hits = 0;
    const f = (a: number, b: number, c: number) => {
      hits = hits + 1;
      return a * b + c;
    }
    const f_mem = op(f).mem();
    f_mem(1, 2, 3);
    f_mem(1, 2, 3);
    expect(hits).toBe(1);
  });

  it('should memoize given function', () => {
    let hits = 0;
    const f = (a: number) => {
      hits = hits + 1;
      return a;
    }
    const f_mem = op(f).mem();
    f_mem(1);
    f_mem(1);
    expect(hits).toBe(1);
  });

  it('should memoize given function', () => {
    let hits = 0;
    const f = (a: number, b: object): number => {
      hits = hits + 1;
      return a;
    }
    const f_mem = op<any, number>(f).mem();
    const b = {};
    f_mem(1, b);
    f_mem(1, b);
    f_mem(1, {});
    expect(hits).toBe(2);
  });
});