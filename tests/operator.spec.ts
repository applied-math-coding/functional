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
});