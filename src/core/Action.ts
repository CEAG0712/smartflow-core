export interface Action {
  execute(context: Record<string, any>): Promise<void>;
}
