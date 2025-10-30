import { compileExpression } from 'filtrex';

export class ConditionEvaluator{
    private static cache: Map<string, (context:any) => boolean> = new Map()

    static evaluate(expression: string, context: Record<string, any>): boolean {
    try {
      if (!this.cache.has(expression)) {
        const compiled = compileExpression(expression);
        this.cache.set(expression, compiled);
      }
      return this.cache.get(expression)!(context);
    } catch (err) {
      console.error('Condition evaluation failed', { expression, err });
      return false;
    }
  }
}