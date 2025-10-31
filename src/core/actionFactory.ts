import { Action } from './Action';
import { SendSMS } from '../actions/SendSMS';
import { SendEmail } from '../actions/SendEmail';
import { Condition } from '../actions/Condition';
import { Loop } from '../actions/Loop';

/**
 * Defines the shape of incoming JSON describing a decision tree node.
 */
type ActionJSON = {
  type: string;
  parameters?: any;
  trueAction?: ActionJSON;
  falseAction?: ActionJSON;
  subtree?: ActionJSON;
};

/**
 * Recursively parses a JSON object and returns an executable Action instance.
 * Throws detailed errors for missing fields or unsupported types.
 */
export function parseAction(json: ActionJSON): Action {
  if (!json.type) {
    throw new Error('Missing "type" field in action definition.');
  }

  switch (json.type) {
    case 'SendSMS': {
      const { phone, message } = json.parameters || {};
      if (!phone || !message) {
        throw new Error('SendSMS requires "phone" and "message" in parameters.');
      }
      return new SendSMS({ phone, message });
    }

    case 'SendEmail': {
      const { from, to, subject } = json.parameters || {};
      if (!from || !to || !subject) {
        throw new Error('SendEmail requires "from", "to", and "subject" in parameters.');
      }
      return new SendEmail({ from, to, subject });
    }

    case 'Condition': {
      const { expression } = json.parameters || {};
      if (!expression || !json.trueAction) {
        throw new Error('Condition requires "expression" and "trueAction".');
      }
      return new Condition({
        expression,
        trueAction: parseAction(json.trueAction),
        falseAction: json.falseAction ? parseAction(json.falseAction) : undefined,
      });
    }

    case 'Loop': {
      const { count } = json.parameters || {};
      if (typeof count !== 'number' || !json.subtree) {
        throw new Error('Loop requires numeric "count" and a "subtree".');
      }
      return new Loop({
        count,
        action: parseAction(json.subtree),
      });
    }

    default:
      throw new Error(`Unknown action type: "${json.type}"`);
  }
}
