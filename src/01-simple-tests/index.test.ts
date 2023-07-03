// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const validInput = { a: 1, b: 2, action: Action.Add };
    expect(simpleCalculator(validInput)).toEqual(validInput.a + validInput.b);
  });

  test('should subtract two numbers', () => {
    const validInput = { a: 3, b: 1, action: Action.Subtract };
    expect(simpleCalculator(validInput)).toEqual(validInput.a - validInput.b);
  });

  test('should multiply two numbers', () => {
    const validInput = { a: 3, b: 2, action: Action.Multiply };
    expect(simpleCalculator(validInput)).toEqual(validInput.a * validInput.b);
  });

  test('should divide two numbers', () => {
    const validInput = { a: 6, b: 2, action: Action.Divide };
    expect(simpleCalculator(validInput)).toEqual(validInput.a / validInput.b);
  });

  test('should exponentiate two numbers', () => {
    const validInput = { a: 6, b: 2, action: Action.Exponentiate };
    expect(simpleCalculator(validInput)).toEqual(validInput.a ** validInput.b);
  });

  test('should return null for invalid action', () => {
    const invalidInput = { a: 1, b: 2, action: 'Adddd' };
    expect(simpleCalculator(invalidInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidInput = { a: 'invalid', b: 2, action: Action.Add };
    expect(simpleCalculator(invalidInput)).toBeNull();
  });
});
