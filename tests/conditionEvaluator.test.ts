import { ConditionEvaluator } from '../src/utils/conditionEvaluator';

describe('ConditionEvaluator', () => {
  it('evaluates simple expressions correctly', () => {
    const context = { daysInactive: 7, vipTier: 'Gold' };
    const expr = 'daysInactive > 5 and vipTier == "Gold"';
    const result = ConditionEvaluator.evaluate(expr, context);
    expect(result).toBe(true);
  });

  it('returns false when expression evaluates to false', () => {
    const context = { age: 20 };
    const expr = 'age > 30'; // valid but false
    const result = ConditionEvaluator.evaluate(expr, context);
    expect(result).toBe(false);
  });
});
