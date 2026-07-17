# Backend API

Production-ready starter backend built with Express.js, Prisma ORM, and PostgreSQL.

## Setup

1. Copy `.env.example` to `.env` and set your PostgreSQL connection string and JWT secret.
2. Install dependencies with `npm install`.
3. Generate Prisma Client with `npx prisma generate`.
4. Start development mode with `npm run dev`.

## Scripts

- `npm start` — starts the production server.
- `npm run dev` — starts the server with Nodemon.

## API

`GET /` returns a health-check response. Uploaded files will be served from `/uploads`.
