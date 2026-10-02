# The Personal AI Operating System
## 50-Part Master Rebuild and Personalization Prompt

Version: 1.3
Reference implementation: the supplied source OS, used only as a visual and behavioral reference. Its owner identity, domain, brands, handles, links, contact details, claims, and copy must never be inherited by a personalized build.
Purpose: give this entire document to a capable coding agent to rebuild the portfolio operating system for any person, profession, studio, agency, or founder.

---

# HOW TO USE THIS MASTER PROMPT

You are the principal product designer, frontend architect, content strategist, interaction designer, accessibility engineer, QA lead, and deployment engineer for a premium personal portfolio that behaves like an operating system.

Your job is not to make a conventional landing page with an OS-inspired visual theme. Your job is to build a complete, interactive, single-page personal operating system in which the visitor explores the owner’s work through applications, files, windows, folders, a dock, system controls, a browser, a whiteboard, media, proof, case studies, contact tools, and optional experiments.

Treat every instruction below as part of one continuous product specification. Do not truncate the specification. Do not replace implementation with a plan. Do not return a mockup without functional interactions. Ask every onboarding question in the first response, summarize the answers after the owner replies, resolve contradictions, then build, test, and prepare the project for deployment.

The result must feel:

- premium, authored, and specific to the owner;
- unmistakably like a working personal desktop;
- highly readable on desktop, tablet, and phone;
- responsive by reflowing the OS instead of shrinking it;
- useful as a portfolio before it is playful;
- fast and satisfying to operate;
- honest about proof, metrics, and client outcomes;
- safe to publish and easy for the owner to maintain.

The result must not feel:

- like a generic SaaS landing page;
- like a Pokémon, GBA, or game clone;
- like a collection of unrelated visual gimmicks;
- like a pile of tiny pixel text;
- like a dashboard template;
- like an imitation of macOS or Windows using copyrighted assets;
- like an unverified collection of inflated marketing claims;
- like a demo that only works at one viewport size.

Do not begin implementation until the required onboarding interview has been completed or the owner explicitly tells you to use clearly marked placeholders.

---

# REQUIRED FIRST RESPONSE — COMPLETE INTAKE IN ONE MESSAGE

The agent’s first response must be one complete intake form. It must contain the builder/image-capability checkpoint and every question in Part 01, including repository access, asset-storage locations, personal identity, profession, projects, proof, source files, image permissions, avatar direction, social links, contact routes, visual direction, integrations, hosting, domain, privacy, and deployment. Do not split the interview across messages. Do not ask only the first ten questions. Do not defer “personal questions” or “where are your files?” to a later round.

The first response should be easy to answer in one reply:

1. Open with the short builder/image-capability notice below.
2. Ask the owner to select one image-generation option as the first numbered item.
3. Present every remaining Part 01 question in clearly titled groups within the same response.
4. Tell the owner they may write `TBD`, `none`, or `use a clearly marked placeholder` for any unavailable answer.
5. Ask for secret **environment-variable names only**, never raw tokens, passwords, private keys, or `.env` contents.
6. End by asking the owner to send the completed intake in one response and attach or link the relevant repository and asset folders.

Do not clone, inspect, plan, modify files, or begin implementation in the first response. Wait for the owner’s completed intake. A greeting or short explanation may precede the form, but the first response is incomplete unless it contains the entire questionnaire.

Use this checkpoint at the top of that same first response:

> **Recommended builder: Codex.** This project benefits from original image generation for the personalized avatar, companion states, application icons, case-study art, and supporting illustrations. Codex is the recommended path because this workflow can use its native image-generation skill. Claude Code can inspect images, but its standard coding workflow does not include a native first-party image generator. If you use Claude Code or another coding agent without an image-generation tool, the build may contain no newly generated imagery unless you connect an external image-generation API.
>
> Image-generation choice:
> 1. Continue in Codex with native image generation (recommended).
> 2. Continue in another coding agent with an external image generator. Provide the provider, model, and environment-variable name only; never paste the API key into chat.
> 3. Continue without generated imagery and explicitly accept reduced visual fidelity. Use only approved supplied assets and a coherent licensed/open-source icon system—never cheap CSS-shape substitutes, emoji, or fake generated art.

Record the choice in `ownerProfile.imageGeneration` and the Build Contract after the owner replies. Do not silently skip imagery, fabricate assets, or claim an image was generated when it was not.

---

# PART 00 — CLONE, INSPECT, AND PROTECT THE SOURCE

The canonical repository URL, working branch, and permission to clone must already have been requested in the complete first-response intake. After the owner replies, confirm those three values before running this sequence:

```bash
git clone <REPOSITORY_URL> personal-ai-operating-system
cd personal-ai-operating-system
git switch <WORKING_BRANCH>
```

If the repository is private, ask the owner to grant access through their normal Git provider. Never ask them to paste a personal access token, API key, password, private key, or `.env` contents into chat.

After cloning:

1. Read the README, project instructions, deployment configuration, and this master prompt in full.
2. Run a read-only inventory of the routes, UI entry points, assets, fonts, media, integrations, and build commands.
3. Start the existing site locally and capture baseline screenshots at desktop and phone widths.
4. Record the current state of every wallpaper, background image, background video, overlay, theme treatment, and animation.
5. Create a clean working branch. Do not work directly on the production branch unless the owner explicitly approves it.
6. Confirm the repository starts successfully before changing anything.
7. If the repository cannot be cloned or started, stop and return the exact blocker and the smallest owner action needed.

The current background system is protected by default. Existing background videos, wallpapers, atmospheric layers, mode-specific backgrounds, cropping behavior, preload behavior, and transitions must remain intact unless the approved Build Contract explicitly authorizes a change. Personalization must be layered onto the existing system without replacing, flattening, recoloring, or deleting those assets.

Produce a `BASELINE_INVENTORY.md` containing:

- repository and branch;
- install and run commands;
- framework and deployment target;
- current routes and applications;
- current background and video asset paths;
- third-party embeds and environment variables by name only;
- viewport screenshots captured;
- protected elements;
- known broken behavior before changes.

---

# PART 01 — REQUIRED ONBOARDING INTERVIEW

Ask every question in this section in the first response, grouped under the headings below. This overrides any preference for short interview batches. Store every answer in one structured `ownerProfile` object. If the owner skips a question, mark it `TBD`; do not silently invent an answer. After the first intake reply, ask a follow-up only when a contradiction or a launch-blocking omission cannot safely remain `TBD`.

## Identity

1. What is your full public name?
2. What short name, studio name, or operating-system name should appear in the nav?
3. What domain will host the website?
4. What city and country should be associated with your public profile?
5. Which pronouns should the site use?
6. What is your profession in plain language?
7. What is your strongest professional positioning in one sentence?
8. What three to six roles describe you? Example: founder, operator, AI builder, designer, filmmaker.
9. What should the opening headline say?
10. What should the sentence below the headline say?

## Source files and asset handoff

Before continuing, ask the owner to provide one canonical asset location: a Drive folder, Dropbox folder, repository directory, or local path that they control. Request view access only unless editing is required.

For every asset, collect its path or URL, intended use, permission status, and preferred crop. Do not accept “use whatever you find online” for identity or client work.

Ask:

1. Where are your approved photos, portraits, headshots, logos, videos, background media, screenshots, testimonials, and brand files stored?
2. Which image should be the primary portrait, and which alternatives may be used on desktop and phone?
3. Are transparent cutouts or editable source files available?
4. Which existing repository assets must remain exactly as they are?
5. Which background videos and wallpapers are protected from replacement, deletion, recoloring, or recropping?
6. Which files are licensed, owned, client-approved, generated, or restricted?
7. Are any faces, client logos, screenshots, or private details prohibited from public use?
8. May the builder generate derivative sprites, thumbnails, or crops from the supplied photos?
9. What is the maximum acceptable image or video download size on mobile?
10. Who gives final approval for generated or transformed assets?
11. Should the system include a cute personalized avatar or AI companion based on the owner?
12. Which approved photos and appearance details may be used to establish likeness, clothing, hair, accessories, skin tone, and expression?
13. Should the avatar be a portrait cutout, pixel-art character, illustrated mascot, or a coordinated set of these?
14. Which image-generation path did you select in the required first-message checkpoint: Codex native generation, an external generator, or approved assets only?

## Commercial focus

11. What are the three most important services or products you want to sell?
12. What action should the primary call to action trigger?
13. What action should the secondary call to action trigger?
14. What kind of client, employer, partner, or audience is the ideal visitor?
15. What should a qualified visitor understand within ten seconds?
16. What should a qualified visitor do within sixty seconds?
17. Do you have a Calendly, Cal.com, booking, WhatsApp, phone, or email link?
18. Is there an emergency or fast-response contact channel?
19. What time zone and availability should the system display?
20. What should “Build this OS for yourself” link to?

## Work and proof

21. List every project that may appear publicly.
22. For each project, provide its name, URL, dates, client, category, problem, work, result, screenshots, and disclosure constraints.
23. Which projects are selected case studies?
24. Which metrics are verifiable?
25. Which metrics are founder-reported, client-reported, estimated, or illustrative?
26. Which client names may be published?
27. Which client logos may be used?
28. Which results need a source note or qualification?
29. Which testimonials may be embedded?
30. Which YouTube videos, audio clips, articles, or documents should be included?

## Personal story

31. What year should the journey begin?
32. What were the five to ten turning points?
33. Which failures or lessons can be discussed publicly?
34. What achievements matter beyond revenue?
35. What hobbies or personal interests are relevant?
36. Should the site include a stylized portrait or sprite?
37. Provide source photos for any portrait generation.
38. What should the daily motivation card communicate?
39. What makes your working method distinctive?
40. What should `Founder.txt` say?

## Social and content

41. Provide the canonical YouTube channel.
42. Provide Instagram, X, GitHub, newsletter, podcast, and other public profiles.
43. Explicitly state which networks should not appear.
44. Did any account move, get banned, or change handles?
45. Which videos should appear in the Learn library?
46. Which videos are testimonials?
47. Which articles should be indexed by search engines?
48. Which search phrases are strategically important?
49. Who will approve factual claims?
50. Who will maintain the content after launch?

## Visual direction

51. Pick three adjectives for the visual system.
52. Pick one primary color, one accent color, and one neutral.
53. Should the site support Day, Night, and Dark modes?
54. Should the visual language be pixel-editorial, minimal, industrial, playful, luxury, or another style?
55. Which reference websites or screenshots capture the desired quality?
56. What should be avoided?
57. Should windows have square or rounded corners?
58. Should desktop icons be custom illustrations, simplified glyphs, or photographs?
59. Should the name use a serif, mono, grotesk, pixel, or custom display style?
60. What minimum text size feels comfortable to the owner on a phone?
61. Should the bottom-left companion feel cute, calm, premium, playful, robotic, animal-like, or another direction?
62. Which companion states are required beyond happy and sad: idle, excited, sleeping, alert, dragging, or celebrating?
63. Should the companion remember its last position, reset on refresh, or snap back to a safe corner?
64. Is the exact booking notification copy approved, and may it appear as social proof without identifying the attendee?

## Technical and deployment

61. Is this a static site or does it need a backend?
62. Where will it be hosted?
63. Which repository should receive the code?
64. Which domain and DNS provider are used?
65. Are forms handled by Netlify, Formspree, Supabase, email, or another provider?
66. Is visitor data allowed to persist in local storage?
67. Does the project need analytics?
68. Does it need a consent banner?
69. Which third-party scripts or embeds are approved?
70. What is the launch deadline?

After receiving the answers, produce a short “Build Contract” that includes:

- owner identity;
- business objective;
- primary audience;
- primary conversion;
- approved proof;
- prohibited claims;
- required applications;
- required media;
- required integrations;
- visual direction;
- deployment target;
- unresolved items.
- source repository and working branch;
- canonical asset location and asset-use permissions;
- protected background videos, wallpapers, and motion layers;
- approved booking notification copy and trigger behavior;
- approved companion design, states, movement rules, and mobile behavior;
- approved image-generation mode, provider/model when applicable, asset outputs, and likeness boundaries;
- a reference-identity purge list covering every source-owner name, domain, brand, handle, email, phone number, booking link, social URL, and product-specific nickname that must not ship;
- explicit approval boundaries for claims, images, embeds, publishing, and deployment.

Ask the owner to approve that contract before implementation.

---

# PART 02 — OWNER PROFILE DATA CONTRACT

Create one canonical data module. Content must not be scattered through event handlers and markup. Use a shape equivalent to:

```js
export const ownerProfile = {
  identity: {
    fullName: "",
    shortName: "",
    osName: "",
    domain: "",
    location: "",
    timezone: "",
    roles: [],
    headline: "",
    intro: "",
    portrait: "",
    sprite: ""
  },
  imageGeneration: {
    mode: "codex-native | external-api | approved-assets-only",
    provider: "",
    model: "",
    apiKeyEnvironmentVariable: "",
    approvedSourceImages: [],
    likenessNotes: "",
    requiredOutputs: [],
    finalApprovalBy: ""
  },
  conversion: {
    primaryLabel: "",
    primaryUrl: "",
    secondaryLabel: "",
    secondaryUrl: "",
    bookingUrl: "",
    whatsappUrl: "",
    email: "",
    emergencyLabel: ""
  },
  metrics: [],
  projects: [],
  clientCases: [],
  testimonials: [],
  journey: [],
  achievements: [],
  services: [],
  videos: [],
  music: [],
  socials: [],
  articles: [],
  themes: {},
  legal: {
    copyrightOwner: "",
    assetLicenses: [],
    metricDisclaimer: ""
  }
};
```

Every metric must carry:

```js
{
  value: "₹80Cr+",
  label: "pipeline influenced",
  status: "client-reported",
  source: "approved case-study note",
  public: true,
  lastVerified: "YYYY-MM-DD"
}
```

Permitted status values:

- `verified`;
- `client-reported`;
- `founder-reported`;
- `estimated`;
- `illustrative`;
- `private`.

Never render a `private` metric. Always show a compact disclosure for estimated, founder-reported, or client-reported outcomes.

---

# PART 03 — PRODUCT PRINCIPLE: AN OS, NOT A LANDING PAGE

The homepage is a single desktop environment. It contains a persistent system nav, wallpaper, applications, movable elements, a dock, a media control surface, system mode controls, and a window layer.

Opening an application must not scroll the visitor to an ordinary marketing section. It must open a window, panel, sheet, or full-screen app within the OS.

The desktop should communicate the portfolio even before an application is opened:

- owner identity;
- professional positioning;
- selected apps;
- primary call to action;
- proof summary;
- current availability;
- recognizable portrait or brand mark;
- visible system affordances.

Applications must reveal deeper information:

- Projects;
- Results;
- Systems;
- Proof;
- Journey;
- Socials;
- AI Voice Agent;
- Founder.txt;
- Whiteboard;
- Calendar and booking, launched from the top-right system status. It must show special dates, support a privacy-safe booked-call state, embed the owner's canonical calendar URL, and retain a visible open-in-new-tab URL fallback. Real booked calls must arrive through a private server-side webhook or authenticated calendar feed; never expose attendee names, emails, phone numbers, or secret API keys in the static client.
- Browser;
- Contact;
- Case Files;
- AI Field Notes.

Optional apps may include Learn, Achievements, Team, Music, Experiments, Character Configuration, or Games. Optional apps must not distract from the owner’s work.

---

# PART 04 — INFORMATION HIERARCHY

Use this priority order:

1. Owner name and profession.
2. Portfolio and project work.
3. Verifiable outcomes.
4. Working method.
5. Testimonials and public proof.
6. Contact and booking.
7. Voice agents and live product demonstrations.
8. Journey and personal narrative.
9. Social/content library.
10. Playful extras.

If the screen is crowded, remove or defer lower-priority elements before reducing type below the readability floor.

---

# PART 05 — DESKTOP SHELL

Build an edge-to-edge desktop with no unexplained bottom band. The wallpaper must reach all physical viewport edges beneath the nav.

When personalizing an existing implementation, preserve all current background videos, wallpaper files, atmospheric overlays, animation timings, source-set behavior, object positioning, cropping, and theme variants. Add new interface layers above them. Any background change requires an itemized Build Contract approval and a before/after comparison.

Desktop shell requirements:

- occupy `100dvh`;
- use `position: fixed` or an equivalent stable shell;
- account for safe areas;
- avoid accidental body scrolling on desktop;
- provide internal scrolling on mobile;
- maintain correct z-index layers;
- preserve theme colors when windows open;
- keep the dock and music player above the wallpaper;
- keep windows above apps and below critical system overlays;
- avoid content being hidden behind fixed controls.

Recommended layer model:

```txt
0000 wallpaper
0100 environmental details
0200 portrait and decoration
0300 desktop identity
0400 application icons
0500 sticky widgets
1000 window layer
4500 system windows
5400 command palette
5500 dock
5600 music controls
5700 active drag object
9000 boot screen
```

---

# PART 06 — SYSTEM NAVIGATION

The nav should resemble a compact system bar. It should not resemble a conventional marketing navbar.

Required nav content:

- sprite or owner mark;
- OS name;
- Work;
- Proof;
- Journey;
- Search;
- Day, Night, Dark switch;
- availability indicator;
- signal mark;
- current date;
- current local time;
- time zone.

Desktop nav text should normally be at least 12 CSS pixels in a highly legible face. Phone nav text should normally be at least 11 to 13 CSS pixels. If space is limited, hide secondary items instead of shrinking them.

The nav must never overlap Daily Transmission or another desktop widget. Give the desktop an explicit top inset equal to the nav height.

---

# PART 07 — BOOT EXPERIENCE

Provide a short, skippable boot experience.

The boot screen should:

- show the owner sprite or mark rather than generic initials;
- say that the portfolio is loading;
- mention projects, case studies, proof, voice, and media;
- display the OS version;
- contain a visible Skip Boot button;
- complete automatically;
- respect reduced-motion preference;
- never block the site indefinitely;
- avoid autoplaying sound;
- remain readable on a phone.

Store a session flag so repeat visitors can see a shortened boot. Do not make the intro longer than the content it introduces.

---

# PART 08 — IDENTITY MODULE

The identity block includes:

- an eyebrow describing the owner’s roles;
- a prominent full name;
- a morphing system descriptor;
- one concise positioning statement;
- a portfolio button;
- a project or booking button.

Do not render an automatic domain greeting anywhere in the interface. In particular, do not place inherited domain-greeting copy above, below, or beside the owner identity block, including the bottom-right region. The domain belongs in browser metadata, canonical URLs, structured data, contact information, or an explicitly approved neutral domain badge—not as automatic identity copy. If the owner explicitly asks for a domain badge, source it only from `ownerProfile.identity.domain`; never copy the reference implementation’s domain.

Every visible identity string must be derived from the approved `ownerProfile`. No reference-owner name, surname, domain, brand, handle, role, contact link, booking link, project label, social URL, or slogan may survive personalization.

The name must feel authored. Use the approved display direction. For a technical owner, prefer a strong mono or engineered grotesk rather than an ornamental editorial face unless the owner explicitly requests the latter.

The morphing descriptor may rotate through phrases such as:

- `[NAME] OS`;
- `AI SYSTEMS OPERATOR`;
- `VOICE + WEB BUILDER`;
- `FOUNDER MODE: ACTIVE`.

Animate the descriptor with a small spring or font-shift effect. The text must remain available to assistive technology and must not change so rapidly that it becomes distracting.

## Reference-identity contamination gate

Before implementation, create `PERSONALIZATION_AUDIT.md` with two inventories:

1. every identity-bearing token found in the supplied reference, including names, domains, brands, handles, emails, phone numbers, booking URLs, social URLs, product nicknames, alt text, filenames, metadata, structured data, and hard-coded UI copy;
2. the approved replacement value from `ownerProfile`, or `REMOVE` when the personalized build should not contain an equivalent.

Before every production build and again against the built output:

- scan source files, generated HTML, JavaScript bundles, CSS content, page titles, descriptions, Open Graph fields, JSON-LD, manifests, alternate text, link targets, filenames, calendar configuration, notification copy, and hidden accessibility text;
- fail the build when any reference-identity token remains outside non-shipped documentation;
- confirm there is no automatic domain-greeting label;
- confirm the visible name, profession, domain, links, avatar, and contact actions all belong to the current owner;
- record the scan command, result, and any intentionally retained neutral asset in `PERSONALIZATION_AUDIT.md`.

Do not solve contamination by hiding text with CSS. Remove or replace it at the data source.

---

# PART 09 — DAILY TRANSMISSION

Daily Transmission is a movable desktop widget, not a live-activity feed.

It must contain:

- current date;
- one motivational statement;
- a visible “Add a Quick Sticky” action;
- an OS label;
- a small status indicator.

The statement can change daily from a curated array. Avoid generic hustle clichés. The widget must sit below the nav and must become a normal block in the phone layout.

The quick-sticky action opens the Whiteboard app directly.

---

# PART 10 — APPLICATION ICON SYSTEM

Create an original icon family with one consistent visual grammar.

Every icon must share:

- canvas size;
- visual weight;
- outline weight;
- highlight direction;
- shadow direction;
- palette;
- pixel density or illustration style;
- label treatment.

Icons should be professional and clean, not over-rendered fantasy objects unless that style is explicitly approved.

Each desktop app includes:

- icon;
- strong app name;
- one-line description;
- optional badge such as `MAIN DRIVE` or `PROOF VAULT`;
- hover state;
- open indicator;
- accessible button name.

Do not render descriptions below 13 CSS pixels on desktop or 14 CSS pixels on phone. Use fewer columns when necessary.

---

# PART 11 — DESKTOP ARRANGEMENT

Allow application icons to be rearranged with pointer dragging on large screens.

Requirements:

- use pointer events;
- support mouse and pen;
- avoid hijacking normal vertical scrolling on touch devices;
- persist positions in local storage;
- provide Reset Desktop Icons in Settings or Whiteboard;
- keep moved items within the visible desktop bounds;
- elevate the dragged item;
- add a clear grab/grabbing cursor;
- preserve keyboard operation for opening apps;
- never make dragging the only way to use an application.

On phones, disable free dragging by default and use a predictable grid.

---

# PART 12 — WINDOW MANAGER

Build a small window manager with:

- open;
- close;
- focus;
- z-index promotion;
- drag by title bar;
- maximize or full-screen;
- restore;
- optional minimize;
- internal scroll;
- responsive phone sheet.

Each window requires:

- three visible controls;
- application title;
- optional state text;
- scrollable body;
- keyboard focus management;
- Escape behavior;
- correct ARIA dialog semantics where appropriate.

On phone, windows should become nearly full-screen sheets with 4 to 8 pixels of outer space. The window body must remain readable and scroll independently above the dock and media controls.

---

# PART 13 — PROJECTS APP

Projects is the main drive and the primary portfolio destination.

The Projects app must:

- open by clicking Enter the Portfolio;
- present selected case files before secondary experiments;
- support at least six to ten projects;
- show category, role, dates, problem, build, outcome, and URL;
- distinguish live links from archived work;
- show screenshots or branded case imagery;
- never use broken links;
- use honest result language;
- allow a visitor to open a detailed case.

Project schema:

```js
{
  id: "",
  name: "",
  client: "",
  category: "",
  dates: "",
  role: "",
  problem: "",
  intervention: "",
  outcome: "",
  outcomeStatus: "verified",
  url: "",
  repository: "",
  image: "",
  stack: [],
  services: [],
  featured: true
}
```

Prioritize real deployed work over visual experiments.

---

# PART 14 — RESULTS APP

Results must show company/client outcomes, not a vanity page about the owner.

Each case result must include:

- client or anonymized category;
- challenge;
- delivered system;
- metric;
- metric disclosure;
- compact narrative;
- image;
- external link when available.

Example structure:

```txt
UK Realty
₹80Cr+ pipeline influenced in one month
Client-reported case outcome
AI systems, marketing infrastructure, and operating support
```

If a result cannot be verified, label it. Never present pipeline as realized revenue. Never imply causation when the system only influenced or assisted an outcome.

---

# PART 15 — CASE-STUDY VISUALS

Generate a bespoke visual for each flagship case study.

Visual requirements:

- original composition;
- no unauthorized client logo;
- readable at card size;
- consistent palette;
- no embedded fake metrics;
- no illegible AI-generated text;
- export in a modern image format;
- include descriptive alt text;
- use `object-fit: contain` when the illustration should remain complete;
- retain enough negative space for a premium layout.

Before publishing, inspect every generated image at actual rendered size.

## Image-generation execution rules

If the chosen builder has native image generation, use it to create the approved visual set during the build. Do not stop after writing prompts. Generate, inspect, select, crop, optimize, integrate, and test the actual files.

If an external generator was selected:

- confirm provider, model, output rights, cost expectations, and the environment-variable name before use;
- read the key only from the environment or secret manager;
- never print, commit, log, or request the raw key in chat;
- preserve the generation prompt and non-secret model settings in an asset manifest.

For every generated asset:

- derive identity only from the current owner’s approved photos and written appearance notes;
- never reuse the reference owner’s face, clothing, domain, initials, colors, or distinctive avatar details;
- keep one coherent art direction, palette, outline system, lighting model, and level of detail;
- generate without text unless the asset is specifically a typographic composition, then verify every character manually;
- remove warped hands, duplicate limbs, broken objects, illegible marks, unintended logos, and background contamination;
- export an editable/high-resolution master plus web-ready AVIF or WebP and a transparent PNG when transparency is required;
- provide explicit dimensions, responsive variants, meaningful filenames, alt text, and an entry in `ASSET_MANIFEST.md`;
- inspect at the actual desktop and phone render sizes before approval.

If the owner chose approved assets only, do not imitate generated art with crude CSS shapes, emoji, or unrelated stock assets. Use supplied imagery and one coherent licensed/open-source vector icon family.

---

# PART 16 — SYSTEMS APP

Systems explains how the owner works.

Recommended operating loop:

1. Find the leverage.
2. Lock the system.
3. Build the sharp edge.
4. Integrate the workflow.
5. Prove and hand off.

For each step explain:

- purpose;
- owner responsibility;
- client responsibility;
- artifact produced;
- validation gate;
- common failure mode.

Avoid vague phrases such as “we innovate.” Show the actual operating method.

---

# PART 17 — PROOF APP

Proof is a video-first testimonial vault.

Requirements:

- actual approved video embeds;
- thumbnail;
- title;
- duration;
- client/category label;
- story context;
- canonical external URL;
- expand/cinema mode;
- close and exit-full-screen control;
- loading state;
- privacy-friendly embedding where practical.

Do not invent testimonial names, titles, or results. A joke or placeholder video must be clearly marked and removed before launch.

---

# PART 18 — VIDEO STORY LAYER

Every proof video should include a short case-story layer:

- who the work was for;
- what constraint existed;
- what was built;
- what changed;
- what the viewer should listen for;
- link to the related project or case file.

Keep the story separate from the client’s spoken words. Do not rewrite a testimonial as a fabricated quote.

---

# PART 19 — JOURNEY APP

Journey is a chronological, visual narrative.

Each milestone contains:

- year or date;
- title;
- short story;
- image or artifact;
- skill or operating-system upgrade;
- optional related project.

The journey must communicate progression rather than a résumé dump. Include meaningful failures when approved. Use a clear vertical timeline on phone.

---

# PART 20 — ACHIEVEMENTS APP

Achievements can use a game-like vault without becoming childish.

Achievement categories:

- audience;
- attention;
- shipped work;
- client proof;
- founder milestone;
- technical milestone;
- personal discipline;
- community.

Every badge needs a plain-language explanation. Avoid meaningless counts. Never imply a credential that was not earned.

---

# PART 21 — SOCIALS APP

Socials should document public work and distribution.

For each network show:

- network name;
- current handle;
- relevant metric;
- purpose;
- external URL;
- status.

If an account was banned or replaced, the owner may show a short human note and the active backup account. Do not include LinkedIn if the owner says they do not use LinkedIn.

Use original gamified icons only if they remain clean and readable.

---

# PART 22 — LEARN APP

Learn is the owner’s YouTube/video library.

It must:

- use real thumbnails;
- group videos by topic;
- open a selected video;
- show title and description;
- link to the canonical channel;
- work without autoplay;
- expose keyboard controls;
- remain usable if third-party embeds fail.

Learn is not a generic education marketplace. It is the owner’s public knowledge library.

---

# PART 23 — AI VOICE AGENT APP

The label should be “AI Voice Agent” or “Talk to the AI Voice Agent,” not “Talk to [Owner]” unless a real owner voice clone is intentionally deployed and disclosed.

Requirements:

- clear agent identity;
- clear purpose;
- approved third-party embed;
- loading state;
- maintenance/offline state;
- fallback contact action;
- privacy note;
- no secret API key in client code;
- multiple agents organized as separate demonstrations when provided.

If a vendor supplies script embeds, give each agent a unique mount target or separate route so duplicate script IDs do not collide.

---

# PART 24 — FOUNDER.TXT

Create a notepad-style personal note.

Suggested structure:

- who I am;
- what I build;
- why I care;
- how I work;
- what I am currently exploring;
- who I want to work with;
- what I refuse to compromise;
- contact.

Use the owner’s voice. Avoid generic founder mythology.

---

# PART 25 — WHITEBOARD AND STICKY NOTES

Visitors can add, edit, move, and delete sticky notes.

Whiteboard requirements:

- visible note input;
- Add Sticky button;
- maximum safe note length;
- multiple color choices;
- draggable notes;
- editable text areas;
- delete control;
- local-storage persistence;
- board bounds;
- reset action;
- touch-friendly controls;
- no network transmission unless explicitly approved.

Tell visitors where the note is stored. If it is local-only, do not imply that the owner will receive it. If the owner needs incoming messages, use the Contact app instead.

---

# PART 26 — BROWSER APP

The Browser app is an internal portfolio browser called something owner-specific, such as RajNet.

It can:

- navigate approved project URLs;
- show bookmarks;
- open external links in a new tab;
- display a URL field;
- provide back, forward, refresh, and home controls;
- explain cross-origin iframe limitations.

Do not claim that arbitrary websites can be fully embedded when their security headers prevent framing.

---

# PART 27 — CONTACT APP

Contact must optimize for real conversion.

Include:

- booking action;
- WhatsApp or phone action when approved;
- email-copy action;
- service list;
- compact project brief form;
- name;
- email;
- desired build;
- budget or operating range if appropriate;
- timeline;
- current stack or context;
- success definition.

Provide a clear success state and fallback email route. Protect forms with honeypot or platform spam controls.

---

# PART 28 — FOLDED-CORNER CALL TAB

Create an OS-native call prompt in the physical bottom-right corner.

Desktop behavior:

- a triangular folded corner;
- dark outer layer;
- brand-color inner fold;
- diagonal edge;
- legible “Want this for yourself?”;
- legible “Book a call”;
- direct booking link;
- no oversized floating banner.

Phone behavior:

- convert the fold into a full-width call card in normal document flow;
- do not rotate tiny text;
- do not cover the dock or media controls;
- preserve a minimum 44-pixel touch target.

---

# PART 29 — EMERGENCY CONTACT

Emergency contact means rapid business implementation, not a life-safety service.

Label it clearly:

- `SOS`;
- `REACH [OWNER] NOW`;
- `URGENT BUSINESS IMPLEMENTATION`;
- WhatsApp;
- phone.

Do not create confusion with medical or public emergency services. The phone link, WhatsApp link, and displayed number must match.

---

# PART 30 — CASE FILES AND FINDER

Case Files may use an explorer-style file system.

Possible structure:

```txt
Case Files/
  Start Here/
  Real Estate/
    UK Realty.case
    Investors Propmart.case
  Voice Agents/
    Imperium Marketing.case
  Websites/
  Products/
  Experiments/
  Proof/
```

The explorer should support folders, files, breadcrumbs, back, forward, list view, search, and preview.

If the existing explorer is intentionally frozen or marked beta, do not refactor it without the owner’s permission.

---

# PART 31 — AI FIELD NOTES AND SEO LIBRARY

Create crawlable static article routes for strategically important topics.

Each article requires:

- unique title;
- unique description;
- canonical URL;
- clear author;
- publication/update date;
- useful first-party perspective;
- internal links;
- project evidence;
- structured data where appropriate;
- accessible heading order.

Never claim “number one” ranking as a fact without independent evidence. A target keyword is not a credential.

The OS window can preview the article library, but the articles themselves should also exist as normal static pages so search engines and users can access them without operating the desktop.

---

# PART 32 — SEARCH AND COMMAND PALETTE

Provide a command palette opened by Search and a keyboard shortcut.

Searchable items:

- apps;
- projects;
- cases;
- clients;
- services;
- videos;
- articles;
- contact commands;
- theme commands.

Features:

- fuzzy matching;
- keyboard arrows;
- Enter to open;
- Escape to close;
- visible result type;
- no focus trap bugs;
- mobile search button.

---

# PART 33 — MUSIC PLAYER

The music player may include owner-provided tracks only when the owner has the right to publish them.

Controls:

- previous;
- play/pause;
- next;
- track title;
- artist;
- progress;
- seeking;
- volume;
- accessible labels.

Rules:

- no autoplay;
- remember volume, not forced playback;
- use a real Pause label while playing;
- provide a compact phone layout;
- keep controls above the dock;
- do not cover essential content;
- include licensing information.

---

# PART 34 — THEME SYSTEM

Provide Day, Night, and Dark modes.

Day:

- warm pink-to-cream-to-blue wallpaper;
- dark ink;
- high-contrast cream panels.

Night:

- indigo and violet atmosphere;
- stars;
- moon;
- cream text;
- readable app descriptions.

Dark:

- near-black workstation;
- restrained colored glow;
- light foreground;
- no muddy low-contrast gray text.

All modes must pass contrast review. Theme switching should preserve open windows and user state. Respect system preference only as the initial default if approved.

---

# PART 35 — CUSTOM CURSOR

A custom cursor is optional.

If used:

- provide normal and pointer variants;
- keep hotspot accurate;
- preserve native cursor on form text entry;
- disable on touch devices;
- include a normal fallback;
- do not use a huge glowing cursor that hides content;
- respect reduced motion.

---

# PART 36 — PORTRAIT AND SPRITE

Use the owner’s approved image as a desktop portrait or brand sprite.

Rules:

- preserve likeness;
- use a transparent background where needed;
- avoid placing the portrait in an environment that looks physically nonsensical;
- remove running characters, flying cats, or ambient mascots when the owner requests a professional direction;
- do not mix incompatible visual universes;
- provide alt text;
- optimize image size.

The portrait can change pose on click if the change feels intentional. Character Configuration can contain more playful sprite experiments away from the main desktop.

## Personalized avatar generation

When image generation is available and the owner approves likeness use, create an original, cute, premium avatar of the current owner. It should feel like a polished character interpretation of that person—not a generic silhouette and not a copy of the reference owner’s avatar.

Generate a consistent character sheet before integrating the avatar:

- one neutral front or three-quarter hero pose;
- `idle`, `happy`, `sad`, and `excited` expressions or states;
- one compact navigation/boot mark that remains recognizable at 32 to 48 pixels;
- optional transparent portrait or full-body pose when the approved layout needs it;
- the same facial structure, hair, skin tone, clothing logic, accessories, proportions, outline weight, palette, and lighting across every state;
- clean transparent edges, no baked-in shadow unless the UI specification calls for it, and no embedded name/domain text.

Use only approved photos and appearance notes. Ask for approval when likeness is ambiguous. Do not make sensitive inferences from the source images. The owner must be able to reject or regenerate the avatar before launch.

## Bottom-left companion

When approved, add one original, extremely cute two-legged AI companion near the bottom-left safe area. Keep the silhouette compact and relatively slim, with an expressive face and tiny feet. It may share the broad category of modern desktop AI companions, but it must not copy Claude, ChatGPT, or any existing mascot, character, trade dress, or protected asset.

Required behavior:

- provide consistent `idle`, `happy`, `sad`, and `excited/booking` visual states;
- give each state an optional short chirp or squeak triggered only after a user gesture, with a visible mute control and sound off by default;
- optionally provide `idle`, `excited`, `sleeping`, and `alert` states when approved;
- allow pointer dragging on desktop using Pointer Events and pointer capture;
- clamp its position inside the visual viewport and outside critical dock, music-player, CTA, and safe-area regions;
- support keyboard movement or an accessible reposition/reset control if dragging is exposed as meaningful interaction;
- store only non-sensitive state and position in local storage when the owner approves persistence;
- switch state intentionally: booking confirmation may trigger `excited`, idle time may trigger `sleeping`, and a failed action may briefly trigger `sad`;
- return to a stable `happy` or `idle` state after temporary reactions;
- include a visible or discoverable reset-position action;
- use optimized WebP, AVIF, PNG, SVG, or sprite-sheet assets with explicit dimensions;
- include descriptive alt text or mark the visual decorative if all meaning is conveyed elsewhere;
- respect `prefers-reduced-motion` and never autoplay sound.

On phones, keep the companion compact, tappable, and clear of the booking notification, system bar, dock, browser controls, home indicator, and page content. Dragging may be enabled only when it does not block vertical scrolling; otherwise provide tap-to-change-state and a reset control. Test orientation changes and re-clamp the companion after viewport resize.

## Privacy-safe booking ping

Add a compact notification near the bottom-left companion using only the owner-approved template. A safe starting point is:

> Someone just booked a call with [OWNER_DISPLAY_NAME]. Looks like they do not want their business falling behind on AI.

Replace the placeholder exclusively from `ownerProfile.identity.fullName`, then require approval of the entire sentence. Never inherit a reference-owner name. Never show attendee identity, contact details, company, meeting notes, or a fabricated live-booking timestamp.

The ping must:

- be visually distinct from actual browser or operating-system notifications;
- state whether it is a live event, recent anonymized event, or clearly labelled demonstration;
- appear only from an approved trigger such as a private webhook-fed endpoint, successful booking callback, or explicit demonstration mode;
- never claim that a booking happened if the event is synthetic;
- provide a dismiss action and sensible frequency cap;
- remain readable and dismissible at 320 px width;
- never cover the companion, app labels, dock, primary CTA, calendar launcher, or music controls;
- pause or simplify motion when reduced motion is enabled.

---

# PART 37 — OPTIONAL GAMES

Games are optional and lower priority than the portfolio.

If games are included:

- place them inside Game Room;
- open the game full-screen;
- provide an obvious Exit Full Screen action;
- preserve keyboard escape;
- prevent scroll trapping;
- pause when hidden;
- do not auto-play sound.

Game progress systems, leaderboards, usernames, cookies, bosses, equipment, and sound design must be treated as separate product requirements. Do not let game scope compromise the portfolio launch.

---

# PART 38 — RESPONSIVE STRATEGY

Do not scale the entire desktop down.

Desktop:

- one-screen OS composition;
- movable icons and widgets;
- folded corner;
- portrait visible;
- dock centered;
- app grid positioned.

Tablet:

- four-column app grid;
- reduced decoration;
- normal document flow where necessary;
- full-width windows;
- dock remains usable.

Phone:

- fixed system bar;
- internally scrolling wallpaper;
- Daily Transmission as the first block;
- identity as the second block;
- two-column app grid;
- full-width CTA card;
- two-column proof cards;
- full-screen app windows;
- horizontally scrollable dock;
- compact fixed player;
- no free-drag desktop icons.
- companion constrained to a safe bottom-left zone, with touch dragging disabled when it would compete with scrolling;
- booking ping stacked above or beside the companion without covering fixed navigation, CTA, dock, calendar, or player controls;

Test at:

- 320 × 568;
- 360 × 800;
- 390 × 844;
- 430 × 932;
- 768 × 1024;
- 1024 × 768;
- 1366 × 768;
- 1440 × 900;
- 1920 × 1080.

---

# PART 39 — READABILITY STANDARD

Readability is a launch blocker.

Minimum targets:

- body copy: 16 pixels desktop, 17 to 18 pixels phone;
- app labels: 13 to 14 pixels desktop, 14 pixels phone;
- app descriptions: 13 pixels desktop, 15 pixels phone;
- controls: 11 to 12 pixels minimum in a pixel face, preferably larger;
- touch targets: 44 × 44 pixels minimum;
- line height: 1.45 to 1.7 for body text;
- maximum line length: 75 characters for long copy.

Pixel fonts appear optically smaller. Compensate with a larger CSS size. Never reduce important information to 5 to 8 pixels simply to preserve a layout.

Audit:

- nav;
- Daily Transmission;
- app labels;
- app descriptions;
- music controls;
- window titles;
- window state text;
- form labels;
- buttons;
- dock tooltips;
- disclosures;
- dark and night modes.

---

# PART 40 — ACCESSIBILITY

Meet practical WCAG 2.2 AA expectations.

Requirements:

- semantic buttons and links;
- visible focus;
- keyboard-openable apps;
- Escape closes overlays;
- alt text;
- form labels;
- reduced-motion support;
- sufficient contrast;
- no color-only meaning;
- live regions used sparingly;
- descriptive link text;
- logical tab order;
- correct dialog behavior;
- no keyboard trap;
- screen-reader names for icons;
- captions or transcripts for important video content where available.

---

# PART 41 — PERFORMANCE

Targets:

- fast first render;
- no giant uncompressed images;
- lazy-load offscreen media;
- defer third-party embeds;
- preload only critical fonts/assets;
- use image dimensions to prevent layout shift;
- use modern audio and image encoding;
- avoid heavy animation libraries unless justified;
- no repeated global intervals;
- no memory leaks from window reopening.

The boot screen must not hide a slow site. Measure actual load behavior.

---

# PART 42 — SECURITY AND PRIVACY

Never place private API keys in frontend JavaScript.

Requirements:

- sanitize visitor-generated content before HTML insertion;
- use `textContent` for sticky notes;
- add `rel="noreferrer noopener"` to external tabs;
- restrict third-party scripts;
- document every embed;
- use platform form protection;
- do not collect data without a purpose;
- explain local-only persistence;
- add a Content Security Policy when integrations permit it;
- rotate any access token pasted into a conversation or committed accidentally.

---

# PART 43 — CONTENT INTEGRITY

Before launch, create a claim ledger.

For every number or statement record:

- exact public wording;
- owner;
- source;
- verification status;
- last checked date;
- approved route;
- disclaimer if needed.

Remove:

- fake live activity;
- fake revenue notifications presented as real;
- fake customer names;
- fake testimonials;
- unsupported superlatives;
- invented press mentions.

Illustrative UI data is acceptable only when visibly labelled illustrative.

---

# PART 44 — SEO TECHNICAL BASE

Provide:

- semantic title and description;
- canonical domain;
- Open Graph metadata;
- Twitter card metadata;
- favicon;
- `robots.txt`;
- `sitemap.xml`;
- structured Person, ProfessionalService, and WebSite data;
- crawlable blog routes;
- descriptive internal links;
- no broken canonical paths;
- no accidental `noindex`.

SEO content must be useful to a buyer. Do not create thin pages that repeat city and keyword names.

---

# PART 45 — FORMS AND DELIVERY

If using Netlify:

- include static form blueprints in the initial HTML;
- include `form-name`;
- include a honeypot;
- return a success state;
- configure notifications;
- test the production form.

If using another provider:

- keep secrets server-side;
- show failure and retry states;
- provide a mail fallback;
- verify that data actually arrives.

---

# PART 46 — LOCAL STORAGE CONTRACT

Permitted local persistence:

- chosen theme;
- moved desktop icon positions;
- movable widget positions;
- visitor sticky notes;
- boot seen flag;
- music volume;
- optional recent app state.

Use versioned keys such as:

```txt
personal-os-theme-v1
personal-os-layout-v1
personal-os-whiteboard-v1
personal-os-widgets-v1
personal-os-media-v1
```

Handle malformed data gracefully. Provide reset controls.

---

# PART 47 — TEST PLAN

Functional tests:

1. Boot completes.
2. Skip Boot works.
3. Every desktop app opens.
4. Every window closes.
5. Window focus order works.
6. Windows remain within the viewport.
7. Search finds applications.
8. Theme switch works.
9. Current time updates.
10. Projects render.
11. Every project URL resolves.
12. Results show disclosures.
13. Proof videos load.
14. Learn videos load.
15. Voice agent handles offline state.
16. Contact form succeeds.
17. Booking opens.
18. WhatsApp opens.
19. Music plays after user interaction.
20. Pause works.
21. Previous and Next work.
22. Whiteboard creates a note.
23. Whiteboard edits a note.
24. Whiteboard moves a note.
25. Whiteboard deletes a note.
26. Notes survive reload.
27. Desktop icon positions survive reload.
28. Reset works.
29. Blog routes return 200.
30. Sitemap returns 200.

Responsive tests:

- no bottom band;
- no nav overlap;
- no horizontal body overflow;
- no clipped owner name;
- app text is readable;
- controls remain tappable;
- dock does not prevent scrolling;
- music player does not hide conversion actions;
- phone windows can reach all content.

Accessibility tests:

- keyboard only;
- focus visibility;
- screen-reader landmarks;
- reduced motion;
- contrast;
- zoom at 200 percent.

---

# PART 48 — VISUAL QA CHECKLIST

Inspect the build at actual size, not only in a design canvas.

Check:

- icon consistency;
- label baseline alignment;
- shadow direction;
- border weight;
- app spacing;
- owner name treatment;
- wallpaper continuity;
- nav height;
- Daily Transmission safe zone;
- folded-corner geometry;
- dock centering;
- mobile dock overflow;
- window chrome;
- form readability;
- night contrast;
- dark contrast;
- generated-image quality;
- absence of accidental white or blue bands;
- absence of childish ambient assets unless approved.

Take screenshots at the agreed breakpoints and compare them as a set.

---

# PART 49 — REPOSITORY AND DEPLOYMENT

Repository requirements:

- descriptive repository name such as `personal-ai-operating-system`;
- complete source;
- assets;
- README;
- setup instructions;
- content customization instructions;
- environment-variable example;
- license;
- deployment config;
- no secrets;
- meaningful commits.
- `BASELINE_INVENTORY.md` documenting protected source behavior and background media.

Suggested structure:

```txt
personal-ai-operating-system/
  index.html
  styles.css
  app.js
  content/
    owner-profile.js
    projects.js
    cases.js
    videos.js
  assets/
    icons/
    portraits/
    cases/
    music/
  blog/
  voice-agents/
  games/
  netlify.toml
  robots.txt
  sitemap.xml
  README.md
  AI_OS_MASTER_REBUILD_PROMPT.md
```

Deployment sequence:

1. Run syntax checks.
2. Run functional tests.
3. Inspect repository diff.
4. Remove secrets and temporary artifacts.
5. Commit.
6. Push.
7. Deploy to a preview URL.
8. Verify all public routes.
9. Attach the custom domain.
10. Verify HTTPS.
11. Test forms in production.
12. Test third-party embeds in production.
13. Submit sitemap when approved.
14. Record release version.

---

# PART 50 — DEFINITION OF DONE

Do not call the project done until all of the following are true:

- the homepage looks and behaves like one coherent OS;
- portfolio work is the main content;
- project links are valid;
- case-study claims are approved and labelled;
- applications open and close correctly;
- app text is readable without zoom;
- phone and tablet layouts reflow rather than shrink;
- the wallpaper reaches the bottom edge;
- the nav does not overlap Daily Transmission;
- the folded call tab matches the approved direction;
- a visitor can add a persistent sticky note;
- the contact route works;
- booking works;
- music has Play and Pause;
- themes remain readable;
- no unauthorized or childish ambient elements remain;
- the approved companion has happy and sad states, stays inside safe bounds, and remains usable on touch screens;
- the booking ping uses the approved anonymized copy, has a truthful trigger label, can be dismissed, and does not overlap critical controls;
- `PERSONALIZATION_AUDIT.md` maps every reference-identity token to an approved replacement or removal;
- source and built-output scans contain no inherited owner identity, automatic domain greeting, brand, handle, contact detail, link, metadata, alt text, filename, or notification copy;
- all pre-existing background videos, wallpapers, atmospheric layers, and theme variants remain visually and functionally intact unless an approved contract item changed them;
- the approved personalized avatar is original, recognizable at navigation size, consistent across required states, and contains no inherited identity or embedded text;
- generated visuals look intentional and have been inspected at their actual desktop and phone render sizes;
- blog routes are crawlable;
- favicon and metadata exist;
- no access token or secret is committed;
- local preview is available;
- production deployment is verified;
- the final repository contains this master prompt.

When finished, return:

1. Local preview URL.
2. Production URL.
3. Repository URL.
4. Commit hash.
5. Applications implemented.
6. Tests performed.
7. Known limitations.
8. Owner actions still required.

---

# COPY-PASTE EXECUTION BLOCK

Use the block below when giving this specification to another AI coding agent:

```txt
Build me a premium personal portfolio that behaves like a complete interactive operating system.

Read the attached “The Personal AI Operating System — 50-Part Master Rebuild and Personalization Prompt” from beginning to end before writing code.

Before doing anything else, show me the required Builder and Image-Capability Check. Recommend Codex when native image generation is desired. If the active coding agent has no native image generator, make me choose between configuring an external image-generation provider or explicitly accepting an approved-assets-only build with reduced visual fidelity. Do not begin cloning, interviewing, planning, or editing until I choose. Never request an API key in chat.

First, run the Required Onboarding Interview. Ask no more than ten questions per message. Do not invent missing identity, project, metric, testimonial, social, contact, legal, asset, or deployment information. Create an ownerProfile data contract and a Build Contract from my answers. Ask me to approve the Build Contract.

Before the interview, ask me for the canonical repository URL and working branch, have me authorize access, clone the repository, run the existing build, and create BASELINE_INVENTORY.md. Ask where my approved photos, portraits, logos, screenshots, video, brand files, and proof are stored. Never request secrets in chat. Preserve every existing background video, wallpaper, atmospheric layer, crop, animation, and theme variant unless the approved Build Contract explicitly changes one.

After approval, implement the operating system, not a conventional landing page. Portfolio projects and verifiable client outcomes are the primary content. Apps, windows, files, proof videos, contact, booking, voice agents, the whiteboard, media, themes, and search must function. Make the visual system original and premium.

Treat the supplied implementation as a visual and behavioral reference only. Create PERSONALIZATION_AUDIT.md, inventory every reference-owner identity token, map each token to an approved ownerProfile replacement or REMOVE, and scan both source and built output. No inherited name, domain greeting, brand, handle, contact detail, link, claim, metadata string, alt text, filename, or notification copy may ship. Do not render automatic domain-greeting copy anywhere, especially around the identity block.

When image generation is available, generate and integrate an original, cute, premium avatar of the current owner plus its approved states and the required coherent supporting visual assets. Base likeness only on approved owner photos and appearance notes. Do not reuse the reference avatar’s face, clothes, colors, initials, or distinctive details. Inspect and optimize every output at real desktop and phone sizes. If image generation is unavailable, use only approved supplied assets and a coherent licensed/open-source icon family—never crude CSS shapes, emoji, placeholders, or fake generated art.

Readability is a launch blocker. Reflow the product for phone and tablet. Never shrink essential text to preserve a desktop composition. App labels, captions, window chrome, music controls, buttons, disclosures, forms, and theme text must remain readable.

Use honest claims. Distinguish verified, client-reported, founder-reported, estimated, illustrative, and private data. Never present pipeline as realized revenue. Never promise a number-one search ranking.

Do not expose secrets. Do not autoplay media. Do not use copyrighted game assets. Do not add decorative characters that conflict with the approved professional direction.

Build the approved original bottom-left companion with at least happy and sad states. Make it draggable and viewport-clamped on desktop, touch-safe on phone, accessible, resettable, optimized, and reduced-motion aware. Add the approved anonymized booking ping beside it, disclose whether the event is live or a demonstration, give it a dismiss action and frequency cap, and never expose attendee details.

Build, test, inspect, fix, commit, push, deploy, and verify. Do not stop at a plan or mockup. Return the local URL, production URL, repository URL, commit hash, tests, known limitations, and exact owner actions.
```

---

# OPTIONAL PERSONALIZATION WORKSHEET

Copy this object, fill it in, and attach it with the master prompt:

```json
{
  "fullName": "",
  "osName": "",
  "domain": "",
  "location": "",
  "timezone": "",
  "profession": "",
  "roles": [],
  "headline": "",
  "positioningStatement": "",
  "primaryAudience": "",
  "primaryConversion": "",
  "bookingUrl": "",
  "whatsappUrl": "",
  "email": "",
  "services": [],
  "projects": [],
  "clientCases": [],
  "metrics": [],
  "testimonials": [],
  "videos": [],
  "journey": [],
  "achievements": [],
  "socials": [],
  "articles": [],
  "music": [],
  "visualAdjectives": [],
  "primaryColor": "",
  "accentColor": "",
  "neutralColor": "",
  "displayFontDirection": "",
  "repositoryUrl": "",
  "workingBranch": "",
  "assetLibraryUrlOrPath": "",
  "portraitSourceFiles": [],
  "logoSourceFiles": [],
  "backgroundVideoFiles": [],
  "protectedBackgroundAssets": [],
  "assetPermissions": [],
  "imageGenerationMode": "codex-native | external-api | approved-assets-only",
  "imageGenerationProvider": "",
  "imageGenerationModel": "",
  "imageGenerationApiKeyEnvironmentVariable": "",
  "approvedAvatarSourceImages": [],
  "avatarLikenessNotes": "",
  "avatarRequiredStates": ["idle", "happy", "sad", "excited"],
  "avatarFinalApprovalBy": "",
  "referenceIdentityPurgeList": [],
  "bookingNotificationCopy": "",
  "bookingNotificationMode": "live | recent-anonymized | demo",
  "companionDirection": "",
  "companionStates": ["happy", "sad"],
  "companionPositionPersistence": "",
  "requiredApps": [],
  "optionalApps": [],
  "prohibitedClaims": [],
  "prohibitedVisuals": [],
  "repository": "",
  "hostingProvider": "",
  "domainProvider": "",
  "analyticsProvider": "",
  "formProvider": "",
  "launchDeadline": ""
}
```

End of master prompt.


