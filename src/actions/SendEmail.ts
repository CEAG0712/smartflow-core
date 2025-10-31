import { Action } from '../core/Action';

export class SendEmail implements Action {
  private from: string;
  private to: string;
  private subject: string;

  constructor(params: { from: string; to: string; subject: string }) {
    this.from = params.from;
    this.to = params.to;
    this.subject = params.subject;
  }

  async execute(context: Record<string, any>): Promise<void> {
    console.log(`[SendEmail] from: ${this.from} to: ${this.to} | subject: "${this.subject}"`);
  }
}