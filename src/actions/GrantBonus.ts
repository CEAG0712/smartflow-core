import { Action } from '../core/Action';

export class GrantBonus implements Action {
  private bonusType: string;
  private amount: number;

  constructor(params: { bonusType: string; amount: number }) {
    this.bonusType = params.bonusType;
    this.amount = params.amount;
  }

  async execute(context: Record<string, any>): Promise<void> {
    console.log(`[GrantBonus] type: ${this.bonusType} | amount: ${this.amount}`);
  }
}
