# Order System

A simple full-stack **Order Management System** built with **NestJS (backend)** and **React (frontend)**. This project focuses on clean architecture, validation, and practical design decisions suitable for learning and interviews.

---

## Backend Features

* DTO validation (class-validator)
* Structured error handling
* Clean architecture (Controller → Service → DTO)
* In-memory data handling using **Map (O(1) lookup)**

---

## Frontend Stack

* React (Hooks)
* Bootstrap (UI)
* Fetch API (HTTP calls)

---

## Project Structure

```id="n8x2k1"
order-system/
├── order-api/
│   ├── src/
│   │   ├── order/
│   │   │   ├── dto/
│   │   │   │   └── create-order.dto.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── order.service.ts
│   │   │   └── order.module.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── order-ui/
│   ├── src/
│   │   ├── pages/
│   │   │   └── order/
│   │   │       ├── OrderPage.tsx
│   │   │       ├── OrderList.tsx
│   │   │       └── OrderMain.tsx
│   │   │
│   │   ├── api/
│   │   │   └── orderApi.ts
│   │   │
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
    └── tsconfig.json
│
├── package.json
└── README.md
```

---

## Prerequisites

* Node.js (v18 or higher)
* npm or yarn

---

## Getting Started

### 1. Clone the repository

```bash id="clone01"
git clone <repository-url>
cd order-system
```

### 2. Install dependencies & run project

```bash id="run01"
npm install
npm run install:all
npm run dev
```

---

## Application URLs

* Frontend: http://localhost:3000
* Backend: http://localhost:3001

---

## Endpoint

* POST /orders

---

## Key Design Decisions

* Used in-memory Maps instead of a database for simplicity and fast setup
* Applied single-item-per-order rule to simplify logic
* Centralized validations and errors using a custom exception pattern
* All business rules handled in backend (wallet, validation, etc.)
* Wallet balance updated only after successful validation
* Some data mapping handled in frontend to keep backend simpler

---

## Trade-offs

* Prioritized simplicity over production-grade architecture
* No database → no persistence
* No transactions → possible inconsistency in failure scenarios
* Monolithic design → not scalable without refactoring
* Strict TypeScript improves safety but adds verbosity

---

## Assumptions

* Each student belongs to one parent
* Each order contains only one item
* Data is pre-defined (students, parents, menu)
* Wallet balance is always valid
* Orders are synchronous
* No authentication/authorization required
* Data resets on server restart

---

## AI Tools Used

ChatGPT was used for:

* Structuring backend and frontend
* Improving validation and error handling
* Refining documentation and architecture decisions

---

## Handling Transactions (Real System)

In this project:

* Orders use a simple status flow: PENDING → CONFIRMED / FAILED

In a real-world system:

* Use database transactions to ensure atomicity
* Or implement Saga pattern for distributed systems

---

# Part 2

## Issue:

Some orders were created successfully, but wallet balance was not deducted.

---

## What could cause this issue?

* No database transaction
* Server crash during processing
* Partial execution failure
* Missing retry/rollback logic

---

## How to debug it?

* Check logs for order and wallet flow
* Compare order data with wallet balance
* Trace request using an ID
* Find where the process stopped
* Reproduce with the same input

---

## How to prevent it?

* Use database transactions for atomic operations Or use Saga pattern in distributed systems
* Add retry and compensation (rollback/refund) logic
* Ensure idempotent APIs for safe retries
* Improve logging and monitoring for tracking flow
