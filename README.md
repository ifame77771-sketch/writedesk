# WriteDesk — production-ready Word-inspired platform

WriteDesk is a full-stack Next.js document platform with authentication, cloud-ready persistence, a rich document editor, document dashboard, autosave, sharing, printing and DOCX export.

## Stack
- Next.js 15 + React 19 + TypeScript
- Tiptap/ProseMirror rich-text editor
- Prisma ORM
- SQLite for local development; switch `DATABASE_URL` to PostgreSQL for production
- Signed HTTP-only cookie sessions using `jose`
- bcrypt password hashing
- DOCX generation with `docx`

## Run locally
1. Copy `.env.example` to `.env`.
2. Set a strong `SESSION_SECRET`.
3. Run `npm install`.
4. Run `npm run db:push`.
5. Optionally run `npm run db:seed` to create the demo account.
6. Run `npm run dev`.

Demo account after seeding: `demo@writedesk.local` / `ChangeMe123!` — change or remove this account before production.

## Production deployment
Use a managed PostgreSQL database and set `DATABASE_URL` accordingly. Set `SESSION_SECRET` to a cryptographically random value and `NEXT_PUBLIC_APP_URL` to the real HTTPS origin. Run `npm run build` and `npm start` or deploy to a Next.js-compatible host.

## Current production features
- Registration and login
- HTTP-only session cookies
- User-scoped document CRUD
- Autosave and manual save
- Document dashboard and search
- Rich text, fonts, colors, alignment, lists, links, images and tables
- Word count and zoom
- Browser printing / PDF through the print dialog
- True `.docx` export endpoint
- Share links with optional expiration support in the data model
- Responsive UI

## Recommended next hardening
- Rate-limit authentication and document APIs
- Add CSRF protection if using cross-site mutation flows
- Add object storage for uploaded images instead of remote image URLs
- Add antivirus/content validation for uploads
- Add PostgreSQL full-text search for large libraries
- Add audit logs and version history
- Add collaborative editing with Yjs/WebSockets
- Add comments and track changes
- Add billing and organization workspaces
- Add automated tests and CI/CD
