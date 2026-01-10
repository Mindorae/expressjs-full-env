# expressjs-full-env

A batteries-included **Express.js + TypeScript (ESM)** starter template with a clean baseline for building APIs:

-   i18n (request-level translation)
-   structured logging (Winston + Daily Rotate)
-   centralized error handling
-   standardized API responses

> Goal: provide a ready-to-clone Express environment that feels “framework-like” (think Django style), but stays simple.

---

## Features

-   **Express v5 + TypeScript** (ESM / NodeNext setup)
-   **dotenv** for environment variables
-   **Request logging** via `morgan`
-   **Security deps preinstalled**: `helmet`, `express-rate-limit` _(wire them as needed)_
-   **Winston logger**:
    -   console logging (dev)
    -   daily rotated log files (prod)
-   **i18n** (`i18next` + filesystem backend):
    -   language detection + `src/locales/{lng}/common.json`
    -   `req.t()` available inside handlers
-   **Standard API responses**
    -   `sendSuccess()` / `sendError()` with translation support
-   **Centralized error handling**
    -   `asyncError()` wrapper for async routes
    -   `globalError` + `routerError` handlers
-   **Health endpoint**: `GET /api/health`

---

## Requirements

-   Node.js (recommended: **18+**)
-   Yarn (or npm/pnpm if you prefer)

---

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/Mindorae/expressjs-full-env.git
cd expressjs-full-env
```

2. Install dependencies:

```bash
yarn
```

3. Create your .env file (optional):

```env
HOST=0.0.0.0
PORT=7741
NODE_ENV=development
DATABASE_URL=
```

4. Run in dev mode:

```bash
yarn dev
```

Server will start at:

```markdown
http://HOST:PORT
```

---

## Scripts

-   `yarn dev` → run dev server with hot reload (`tsx watch`)
-   `yarn build` → compile TypeScript to `dist/`
-   `yarn start` → run compiled server (`node dist/src/server.js`)
-   `yarn test` → placeholder (adjust when adding a real test runner)

---

## Project Structure

```
src/
  config/
    constants.conf.ts   # env + HTTP_STATUS
    i18n.conf.ts        # i18next setup
    logger.conf.ts      # winston config
    types.conf.ts       # shared TS types
  locales/
    en/common.json
    ar/common.json
  middlewares/
    i18n.middleware.ts  # sets req.t / req.language
  types/
    express/index.d.ts  # Express request augmentation
  utils/
    errors/
      index.ts          # asyncError, globalError, routerError
      message.ts        # sendSuccess, sendError
  server.ts             # app entrypoint
```

---

## Standard API Responses

Success example:

```ts
return sendSuccess(req, res, "SUCCESS", { ok: true }, 200);
```

Error example:

```ts
return sendError(req, res, "USER_NOT_FOUND", "NOT_FOUND", 404, ["details..."], {
    id: userId,
});
```

---

## i18n Usage

The template uses `i18next` with translations in `src/locales`.

### Select language

-   Query string: `?lang=ar`
-   Header: `X-Local: ar` _(you can rename this to X-Locale if you prefer)_

Inside handlers:

```ts
const msg = req.t?.("SUCCESS");
```

---

## Roadmap (planned)

-   Base classes:

    -   `BaseController`
    -   `BaseRoute`
    -   `BaseValidator` (Joi)

-   CLI generator script:

    -   create controller + routes + validation skeleton from args

-   Example CRUD module (simple resource scaffold)

---

## License

Apache-2.0
