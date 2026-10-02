# Personalization Audit

| Existing source token/content | Action |
| --- | --- |
| `FORMA` / generic agency label | Retain as the owner-approved studio/navigation name; personalize supporting identity as Marco. |
| “Websites, shaped with purpose” / generic studio copy | Replace on the main page with the approved headline and supporting line. |
| `forma-website-design.vercel.app` | Retain only as the owner-provided project link; do not present it as a purchased custom domain. |
| Instagram `forma.hub` | Use the owner-provided canonical profile link. |
| Discord and email rows | Remove from active public contact until supplied. |
| Noir, North, Aura, Meridian demo identities and claims | Keep only on their demo pages/cards with explicit fictional/demo disclosure; do not describe them as client work or verified outcomes. |
| Baseline service prices and package promises | Remove from the personalized homepage until owner confirmation. |
| Baseline fake contact-form success behavior | Do not claim message delivery; link the visitor to the approved Instagram contact path pending a backend. |
| Metadata, accessibility labels, notifications | Use Forma/Marco content only; no automatic domain greeting or invented contact details. |
| Supplied portraits | Not Marco. Do not use as his portrait or recreate the identifiable people. |

Source review after implementation: the main route renders `PersonalOS`, not the old pricing or fake form components. Searches of the personalized routes found no old “Websites, shaped with purpose” or “Digital Web Studio” copy. Direct demo routes remain fictional/demo-disclosed. The stale generated `.next` output was not refreshed because dependency access prevented a build, so a built-output scan remains pending.
