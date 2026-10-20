# THE xDEVS website

Marketing site for **THE xDEVS** ([xdevs.in](https://xdevs.in)), built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and a React Three Fiber hero.

Project brief, brand rules and content source of truth: [`CONTEXT.md`](./CONTEXT.md).

## Quick start

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server (Turbopack)                        |
| `npm run build`     | Production build                              |
| `npm run start`     | Serve the production build                    |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | Generate route types and run `tsc --noEmit`   |

Requires Node.js 20.9 or newer.

## Deploying to Vercel

1. Push this repo to GitHub, then in Vercel choose **Add New → Project** and import it. The framework preset is detected as **Next.js**, so no build settings need changing.
2. Under **Settings → Environment Variables**, add the variables below for **Production** (and **Preview** if you want the form to work on previews).
3. Under **Settings → Domains**, add `xdevs.in` and `www.xdevs.in`. The app also redirects `www` to the apex domain in `next.config.ts`.
4. Deploy. Every push to the default branch redeploys production, and pull requests get preview URLs.

### Environment variables

| Name                   | Required          | Purpose                                                                          |
| ---------------------- | ----------------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No                | Canonical URL for metadata, sitemap and JSON-LD. Defaults to `https://xdevs.in`. |
| `RESEND_API_KEY`       | For the form      | [Resend](https://resend.com) API key used to email enquiries. **[TBD]**           |
| `CONTACT_TO_EMAIL`     | For the form      | Inbox that receives enquiries. **[TBD]**                                         |
| `CONTACT_FROM_EMAIL`   | For the form      | Verified sender, e.g. `THE xDEVS <noreply@xdevs.in>`. **[TBD]**                  |

Without the three email variables, the contact form logs submissions to the server console in development. In production it shows a friendly "reach us on LinkedIn" message instead of silently dropping enquiries.

## Editing content

All copy lives in [`/content`](./content). Text changes never need a component edit.

| File                   | Contents                                                     |
| ---------------------- | ------------------------------------------------------------ |
| `content/site.ts`      | Name, official description, nav, pillars, values, founder note |
| `content/services.ts`  | The six services (summary, description, coverage, deliverables) |
| `content/process.ts`   | Discover / Design / Develop / Deploy                         |
| `content/work.ts`      | Case studies (add a new object to create a `/work/[slug]` page) |
| `content/stack.ts`     | Tech stack groups                                            |
| `content/careers.ts`   | Internship roles and details                                 |

Brand assets live in `public/brand`. The 3D emblem, SVG mark, loader and favicons all come from the traced geometry in `lib/emblem.ts`.

## How it's built

```
app/            routes, metadata files (sitemap, robots, OG image, icons), server action
components/
  layout/       nav, footer, loader, smooth scroll, cursor
  sections/     page sections (hero, bento, process, work, stack, …)
  motion/       reveal system, tilt / magnetic interactions
  three/        hero WebGL scene + static fallback
  forms/        contact form
content/        editable copy
lib/            emblem geometry, SEO helpers, validation, rate limiting
public/         brand assets, noise texture
design/         Stitch reference screenshot
```

### Performance and accessibility choices

- **3D hero** is loaded only on desktop with a fine pointer, at least 4 CPU cores and WebGL, after the browser is idle. It pauses when off-screen or when the tab is hidden. Mobile, low-power devices, data-saver and reduced-motion users get the static SVG emblem.
- **Scroll reveals** use one shared `IntersectionObserver` and CSS transitions (`components/motion`), not per-element JS animation, so there is very little to hydrate.
- **Tilt cards and magnetic buttons** run from a single delegated pointer listener (`Interactions.tsx`).
- **Lenis** smooth scroll is loaded on demand for mouse and trackpad users only.
- Below-the-fold sections use `content-visibility: auto`.
- `prefers-reduced-motion` disables the loader, smooth scroll, 3D, tilt and magnetic effects, and reveal animations. Content stays fully visible without JavaScript.
- Framer Motion and GSAP from the original brief were left out. CSS and small scroll listeners covered every effect, and dropping them cut the JavaScript budget substantially.

### Contact form

`app/actions/contact.ts` is a Server Action with zod validation, a honeypot field, a minimum fill time and per-IP rate limiting.

The rate limiter is in-memory, so on Vercel each serverless instance counts separately. If spam becomes a problem, swap `lib/rate-limit.ts` for a shared store such as Upstash Redis from the Vercel Marketplace.

## Open items ([TBD] / [CONFIRM])

- Company email, phone and address: not shown. The form and LinkedIn are the only contact routes.
- Email provider keys (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`).
- Real estate case study client name: withheld until the founder approves.
- Founder note on `/about`: draft copy that needs the founder's approval (`content/site.ts → founderNote`).
- Founded date and public location: not displayed until confirmed.
- Full internship JD detail (responsibilities, requirements, perks): role cards currently summarise the focus areas.
- Optional on-site careers application form: applications go to LinkedIn for now.
- Privacy policy and terms: placeholder text that needs legal review.
- Transparent or SVG master logo from the designer. The site uses a traced vector of the X, plus the supplied PNG for JSON-LD.
- Device mockups in the work section are illustrative until approved screenshots are available.
