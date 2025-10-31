import { parseAction } from '../core/actionFactory';
import { Action } from '../core/Action';

export async function executeTree(tree: any, context: Record<string, any>): Promise<{ duration: number }> {
  const action: Action = parseAction(tree);
  const start = Date.now();
  await action.execute(context);
  const duration = Date.now() - start;
  return { duration };
}
