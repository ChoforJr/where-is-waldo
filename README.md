# Where's Waldo?

A responsive hidden-object game with four boards, live game synchronization, a public leaderboard, and secure player accounts.

## Architecture

- **Web:** Next.js App Router, React, strict TypeScript, and Tailwind CSS.
- **API:** Express 5 and TypeScript, backed by PostgreSQL and Prisma.
- **Realtime:** Socket.IO shares live gameplay state and leaderboard updates.
- **Authentication:** Passwords are hashed with bcryptjs. Users receive an opaque, random HttpOnly server-side session cookie, and only the SHA-256 hash of the session token is stored.
- **Validation/security:** Zod request schemas, authentication rate limiting, Helmet security headers, explicit CORS origins, and protected account routes.

The frontend and API remain separate deployable applications.

## Local development

Use Node.js 20.19+ and PostgreSQL.

1. Install dependencies in both project directories:

   ```sh
   cd where-is-waldo && npm install
   cd ../where-is-waldo-api && npm install
   ```

2. Configure `where-is-waldo/.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Configure `where-is-waldo-api/.env`:

   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/where_is_waldo
   ALLOWED_ORIGINS=http://localhost:3000
   PORT=5000
   ```

4. Apply database migrations and generate Prisma Client:

   ```sh
   cd where-is-waldo-api
   npx prisma migrate deploy
   npx prisma generate
   ```

5. Run the API and web app in separate terminals:

   ```sh
   # where-is-waldo-api
   npm run dev

   # where-is-waldo
   npm run dev
   ```

The web app is served at `http://localhost:3000`; the API and Socket.IO server share `http://localhost:5000`.

## Commands

| Project | Command | Purpose |
| --- | --- | --- |
| Web | `npm run dev` | Start Next.js development server |
| Web | `npm run build` | Create production build |
| Web | `npm run lint` | Run Next.js ESLint rules |
| Web | `npm run typecheck` | Run strict TypeScript check |
| API | `npm run dev` | Watch and restart typed API |
| API | `npm run build` | Generate Prisma Client and compile |
| API | `npm test` | Run API unit tests |
| API | `npm run typecheck` | Run strict TypeScript check |

## Routes

- `/` — choose a board.
- `/game/[boardId]/[gameId]` — play and submit a completed time.
- `/rankings` and `/rankings/[level]` — public leaderboard.
- `/help` — game instructions.
- `/sign-in`, `/sign-up`, `/account` — account and protected profile.

If you are signed in when you save a completed round, it is also linked to your account profile. Unsigned rounds still appear on the public leaderboard by player name.

## Deployment notes

- Set `NEXT_PUBLIC_API_URL` to the public API base URL ending in `/api`.
- Set `DATABASE_URL`, `ALLOWED_ORIGINS` (comma-separated exact web origins), and `PORT` for the API.
- Apply migrations using `prisma migrate deploy` before starting the API.
- Serve the API and frontend over HTTPS in production; cross-origin production session cookies set `SameSite=None; Secure`, and state-changing auth requests validate the configured origin.
- WebSocket transport uses the same allowed frontend origins and API host.
