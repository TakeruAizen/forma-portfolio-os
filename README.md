# Forma Personal Portfolio

Marco’s separate responsive personal portfolio, presented as an interactive desktop. This is an independent Next.js project and should be imported into its own Vercel project. It does not replace the original Forma website.

## Run locally

```sh
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Content

- Edit `content/owner-profile.json` for approved identity and public profile details.
- Demo projects live in `components/personal-os.tsx` and are labeled fictional concepts.
- Add project links only after checking that they are public and approved. Keep client names, metrics, and claims out until Marco supplies verification and disclosure permission.
- `BUILD_CONTRACT.md`, `BASELINE_INVENTORY.md`, and `PERSONALIZATION_AUDIT.md` record the current scope and known limits.
- `CLAIM_LEDGER.md` records the source and disclosure handling for public claims.

## Integrations

- Hosting target: Vercel.
- Analytics: Vercel Analytics loads in production only after the visitor opts in. Consent is session-scoped.
- Contact: the supplied Forma Instagram profile. There is no email, booking provider, or contact-form backend configured.
- Theme, text size, consent, and whiteboard notes use session storage; notes are not sent to a server and do not persist beyond the browser session.
- No secrets or environment variables are required by the current implementation.
- `.env.example` is included; it intentionally contains no variable names because no backend has been configured.

## Routes

- `/` — Forma desktop portfolio
- `/blog` — journal index (no articles published yet)
- `/work/noir`, `/work/north`, `/work/project-03`, `/work/project-04` — disclosed demo concepts
- `/intro-preview` — existing intro animation preview

## Deploy

Import the source folder into a Vercel project, use the detected Next.js build, and assign a domain when Marco has purchased one. A GitHub repository has not yet been connected to this local folder.

The repository license has not been selected.
