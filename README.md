# Marco’s Portfolio Desktop

Marco’s separate portfolio, presented as a personal operating system. It opens with a scan-lined startup screen, then a soft sunset landscape with drifting clouds, animated flowers, desktop apps, and an illustrated companion. This is an independent Next.js project and Vercel deployment; it does not replace the original Forma website.

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
- Set `NEXT_PUBLIC_SITE_URL` to this portfolio deployment’s full URL in Vercel so canonical metadata, `robots.txt`, and the sitemap point to the right project. `.env.example` contains a placeholder only.

## Routes

- `/` — Marco’s pixel-art portfolio desktop
- `/blog` — journal index (no articles published yet)
- `/work/noir`, `/work/north`, `/work/project-03`, `/work/project-04` — disclosed demo concepts

## Deploy

The source is connected to [TakeruAizen/forma-portfolio-os](https://github.com/TakeruAizen/forma-portfolio-os). Import that repository into its own Vercel project; pushes to `main` deploy automatically. Use the Vercel URL until Marco purchases a custom domain.

The repository license has not been selected.
