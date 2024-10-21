import { simpleCalculator, Action } from './index';

const testCases = [
  // Action.Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // Action.Subtract
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 20, b: 2, action: Action.Subtract, expected: 18 },
  { a: 30, b: 22, action: Action.Subtract, expected: 8 },
  // Action.Multiply
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 30, b: 20, action: Action.Multiply, expected: 600 },
  // Action.Divide
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },
  // Action.Exponentiate
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  // Action Invalid
  { a: 10, b: 2, action: 'invalid', expected: null },
  { a: 2, b: 4, action: 'invalid', expected: null },
  { a: 3, b: 3, action: 'invalid', expected: null },
  // Invalid Arguments
  { a: 10, b: 'invalid', action: Action.Add, expected: null },
  { a: 'invalid', b: 4, action: Action.Subtract, expected: null },
  { a: 'invalid', b: 'invalid', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Must correctly execute the "action" operation, with attributes "a" and "b", and get the correct "expected"',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
