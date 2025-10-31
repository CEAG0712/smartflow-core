import { Action } from '../core/Action';

export class SendSMS implements Action {
  private phone: string;
  private message: string;

  constructor(params: { phone: string; message: string }) {
    this.phone = params.phone;
    this.message = params.message;
  }

  async execute(context: Record<string, any>): Promise<void> {
    console.log(`[SendSMS] to: ${this.phone} | message: "${this.message}"`);
  }
}
