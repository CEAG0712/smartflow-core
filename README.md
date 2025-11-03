
# SmartFlow Core

SmartFlow Core is a real-time decision tree execution engine designed to empower non-technical stakeholders (e.g., marketing, product managers, analysts) to define, version, and execute complex business logic without touching backend code.

This repository fulfills and exceeds the requirements of a take-home Developer Exercise. The system is modular, extensible, and production-ready.


---

## 📄 Supporting Documentation (Developer Exercise)

* [📘 Business Justification: Why This Engine Matters](./docs/BUSINESS_JUSTIFICATION.md)
* [🧠 System Design Document (Architecture, Actors, Real-Time Flow)](./docs/SYSTEM_DESIGN.md)

---

## 📄 Supporting Documentation (System Design Exercise)

* [📘 System Design Exercise: Turning a Single-Tenant Platform into SaaS](./docs/System Design Exercise - Carlos Arosemena NOV032025.docx)

---


## 🧪 How to Run and Test

### ▶️ Start the API

```bash
# Install dependencies
npm install

# Start the server (default port 3000)
npm run dev
```

The main endpoint is:

```
POST http://localhost:3000/execute-tree
```

This accepts a JSON payload that includes:

* `tree`: the decision tree object
* `context`: runtime data (e.g., player status)

### 📦 Sample Payload (Tests all core actions)

```json
{
  "tree": {
    "type": "Condition",
    "parameters": {
      "expression": "daysInactive > 3"
    },
    "trueAction": {
      "type": "Loop",
      "parameters": {
        "count": 3
      },
      "subtree": {
        "type": "Condition",
        "parameters": {
          "expression": "tier == \"Gold\""
        },
        "trueAction": {
          "type": "SendSMS",
          "parameters": {
            "phone": "+15551234567",
            "message": "You’re a VIP! Here’s a free spin!"
          }
        },
        "falseAction": {
          "type": "SendEmail",
          "parameters": {
            "from": "rewards@game.com",
            "to": "player@example.com",
            "subject": "Level up to Gold for exclusive rewards!"
          }
        }
      }
    },
    "falseAction": {
      "type": "GrantBonus",
      "parameters": {
        "bonusType": "free_spins",
        "amount": 15
      }
    }
  },
  "context": {
    "daysInactive": 4,
    "tier": "Silver"
  }
}
```

### ✅ What This Test Covers:

* ✅ `Condition` logic: evaluates expressions safely using filtrex DSL
* ✅ `Loop`: runs nested action 3 times
* ✅ `SendSMS`: prints message to console
* ✅ `SendEmail`: prints email intent
* ✅ `GrantBonus`: simulates a game incentive action

### 🔍 How to Interpret Console Output

```
[Condition] daysInactive > 3 => true
[Loop] Running subtree 3 times
[Condition] tier == 'Gold' => false
[SendEmail] from: rewards@game.com to: player@example.com subject: Level up to Gold for exclusive rewards!
...
[GrantBonus] type: free_spins | amount: 15
```

This output gives a full trace of how the tree was evaluated.

---


## 🧱 Project Structure

```bash
src/
├── actions/          # Action types (SendSMS, SendEmail, GrantBonus, etc)
├── core/             # Action interface, factory, schema
├── services/         # Tree execution logic
├── controllers/      # HTTP controller for execution endpoint
├── routes/           # API route handlers
├── utils/            # Logger, condition evaluator
```

---

## 💡 Want to Extend?

* Add new actions in `src/actions` and register them in `actionFactory.ts`
* Add versioned tree storage with `treeId`
* Plug in Kafka/SQS to trigger execution on user activity
* Add `/trees` endpoint to persist tree drafts from a frontend builder

---

## 🧠 Credits

Designed with extensibility, testability, and developer happiness in mind.

> For a demo video, additional tree examples, or design presentation, contact the author.

---
