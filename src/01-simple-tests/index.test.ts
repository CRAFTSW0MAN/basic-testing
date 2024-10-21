import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 20, b: 43, action: Action.Add });
    expect(result).toBe(63);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 43, b: 20, action: Action.Subtract });
    expect(result).toBe(23);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Multiply });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 4, action: Action.Divide });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 4,
      action: Action.Exponentiate,
    });
    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 2,
      b: 4,
      action: 'invalid',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'invalid',
      b: 4,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
