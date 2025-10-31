import { Action } from '../core/Action';
import { ConditionEvaluator } from '../utils/conditionEvaluator';

export class Condition implements Action {
  private expression: string;
  private trueAction: Action;
  private falseAction?: Action;

  constructor(params: {
    expression: string;
    trueAction: Action;
    falseAction?: Action;
  }) {
    this.expression = params.expression;
    this.trueAction = params.trueAction;
    this.falseAction = params.falseAction;
  }

  async execute(context: Record<string, any>): Promise<void> {
    const result = ConditionEvaluator.evaluate(this.expression, context);
    console.log(`[Condition] ${this.expression} => ${result}`);

    if (result) {
      await this.trueAction.execute(context);
    } else if (this.falseAction) {
      await this.falseAction.execute(context);
    }
  }
}
