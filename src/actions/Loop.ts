import { Action } from '../core/Action';

export class Loop implements Action {
  private count: number;
  private action: Action;

  constructor(params: { count: number; action: Action }) {
    this.count = params.count;
    this.action = params.action;
  }

  async execute(context: Record<string, any>): Promise<void> {
    for (let i = 0; i < this.count; i++) {
      console.log(`[Loop] iteration ${i + 1} of ${this.count}`);
      await this.action.execute(context);
    }
  }
}
