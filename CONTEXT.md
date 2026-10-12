# THE xDEVS: Website Build Context

> Give this file to every agent working on the xdevs.in website. Place it in the repo root (for example as `CONTEXT.md`, and reference it from `CLAUDE.md`).
> Anything marked **[CONFIRM]** or **[TBD]** is not decided or verified yet. Do not invent it. Use a clearly marked placeholder and list it in your final report.

---

## 1. Company at a glance

| Field | Detail |
|---|---|
| Name | **THE xDEVS** (stylised `THE <xDEVS>`; write "xDEVS" or "THE xDEVS" in running copy) |
| Domain | **xdevs.in** (owned; the website is not built yet) |
| Industry | IT System and Custom Software Development |
| Type | Small, focused dev studio delivering full-stack and blockchain-integrated products |
| Founded | December 2025 **[CONFIRM before publishing]** |
| Founder and CEO | Jacell Sagar Jamble |
| Based in | Mumbai, India **[CONFIRM how to show location publicly]** |
| LinkedIn | https://www.linkedin.com/company/the-xdevs |
| Company email / phone / address | **[TBD]**. Use `hello@xdevs.in` as a visible placeholder only if told to; otherwise leave the form as the only contact route |

### Official description (use verbatim wherever an "About" blurb is needed)

> THE xDEVS stands at the intersection of innovation and technology. We craft intelligent, efficient, and future-ready IT solutions that empower businesses to grow and adapt in the digital era.
>
> Our expertise spans software development, AI-driven systems, and cloud-based solutions, all designed with a focus on performance, security, and scalability. THE xDEVS believes in building technology that not only solves problems but creates opportunities.

### Positioning in one line
A premium, engineering-led studio that ships intelligent, secure, scalable software, from web and mobile to AI and blockchain, for businesses that want to grow.

---

## 2. What we do (services)

Use these six services across the site. Keep the wording consistent.

1. **Custom Software Development**: full-stack web platforms and internal tools, built end to end from requirements and architecture to deployment.
2. **AI-Driven Systems**: intelligent features and automation (LLM integrations, computer vision, ML-powered workflows).
3. **Cloud Solutions**: cloud-based architecture, deployment and scaling with a focus on reliability and security.
4. **Mobile Apps**: native Android and iOS applications.
5. **Blockchain and Web3 Integration**: smart contracts and blockchain-backed features, such as tamper-evident records, on-chain verification and token or payment logic.
6. **UI/UX and Product Design**: interface and product design that is clean, fast and conversion-aware.

**Core strengths to repeat:** Performance. Security. Scalability.

**Tech the team works with** (for the tech-stack section): React, Next.js, Node.js, Django, FastAPI, Android (Kotlin), iOS, Solidity and smart contracts, AWS, and AI/ML tooling (LLMs, Hugging Face, OpenCV).

### Proof points (use carefully)
- A real estate platform delivered as a React + Django REST web app with a native iOS app (listing, browsing, buy/sell flows). **The client name must not appear publicly until the founder approves. [CONFIRM]** Until then, present it as "Real estate platform, web + iOS".
- Android and iOS apps built for other client businesses (no names).
- **Do NOT invent** client logos, testimonials, statistics, years of experience, team size, awards or revenue figures. If a section needs numbers, use qualitative statements, or mark `[TBD]`.

---

## 3. Brand identity

### Logo
- A chrome, brushed-silver, 3D **"X"** built from layered chevrons (`>` shapes), on pure black.
- Wordmark: **THE** (white, bold, stencil-like) over **`<xDEVS>`** with a small chrome X inside the angle brackets.
- The logo asset is provided as a PNG on a pure-black background. Place it at `/public/brand/`. Use it on black surfaces only. Request or create an SVG or transparent version for other uses **[TBD]**.
- The `< >` code-bracket motif is a recurring brand detail. Use it for small section labels such as `< services />`.

### Colour (monochrome only)
| Token | Hex | Use |
|---|---|---|
| `--black` | `#000000` | Page background, hero |
| `--graphite-900` | `#0B0B0C` | Elevated surfaces |
| `--graphite-700` | `#24272C` | Cards, panels |
| `--silver-400` | `#B9BDC4` | Highlights, borders, icons |
| `--silver-100` | `#F2F3F5` | Light highlights, metallic gradient end |
| `--white` | `#FFFFFF` | Headlines, primary text |
| `--grey-500` | `#6B7078` | Secondary text, captions |
| `--line` | `rgba(255,255,255,0.10)` | Hairline borders on dark |

- Metallic gradient: `linear-gradient(135deg, #6B7078 0%, #F2F3F5 45%, #B9BDC4 60%, #FFFFFF 100%)`. Use it on key words, button sheens and borders.
- **No coloured accents.** Any glow is cool white or silver. No neon, no blue, no purple.
- Dark mode only.

### Typography
- **Display and body:** Inter (or Inter Tight for headlines), weights 500 to 700, tight letter-spacing on large headlines (-0.02em to -0.04em).
- **Mono:** JetBrains Mono for tiny labels, code-style details and the `< />` motifs.
- Hero headline scale: roughly 80 to 140px on desktop, fluid down to about 44px on mobile (use `clamp()`).
- (Print documents and the JD PDFs use Poppins. The website does not need to.)

### Voice and tone
Confident, precise, calm. Short sentences. Premium but human. No buzzword soup, no hype. Prefer concrete verbs: build, ship, secure, scale.

---

## 4. Design direction

Source of truth: if Stitch exports or screenshots exist in `/design`, **follow them first**. This section fills in anything they leave open.

- **Feel:** Apple-like. Huge confident type, lots of negative space, extreme contrast, cinematic and calm.
- **Surfaces:** soft glassmorphism (blurred translucent graphite, 1px silver hairline borders), subtle film grain, soft light bloom and spotlight gradients.
- **Shapes:** 24 to 32px card radii, fully rounded buttons, 8px spacing grid.
- **3D elements (signature of the site):**
  - Hero: a large chrome 3D "X" emblem with metallic reflections, slow rotation, and mouse-reactive tilt and parallax, with floating glass cubes, polyhedra and thin wireframe rings drifting at different depths.
  - Service cards with 3D tilt on hover and a cursor-following inner spotlight.
  - A rotating wireframe globe or orbiting ring of technology icons for the tech stack.
  - 3D-angled device mockups (laptop, phone) for the work section.
  - Layered panels with z-axis parallax in the process section.
- **Motion:**
  - Smooth inertial scroll with scroll-driven storytelling.
  - Masked line-by-line headline reveals and a shimmering silver gradient on key words.
  - Magnetic buttons with a metallic sheen sweep.
  - A custom soft-glow cursor on desktop.
  - A sticky "How we build" section where 3D objects change as the user scrolls.
  - An infinite capabilities marquee.
  - Animated counters, only where real numbers exist.
  - An elegant loader that assembles the X logo, and smooth page transitions.
- **Must respect `prefers-reduced-motion`**, with static fallbacks for everything above.

---

## 5. Sitemap and page content

### Pages
`/` Home, `/services`, `/work`, `/work/[slug]` (case-study template), `/about`, `/careers`, `/contact`, plus `404` and legal placeholders (`/privacy`, `/terms`).

### Home (`/`), section order
1. **Nav:** floating glass pill. Logo left. Links: Services, Work, Process, Careers, Contact. Right: "Start a project" button. Full-screen glass overlay menu on mobile.
2. **Hero:** headline **"We build what's next."** Sub: *"Intelligent, secure and scalable software, from web and mobile to AI and blockchain."* Buttons: **Start a project**, **See our work**. Giant 3D chrome X.
3. **Capabilities ticker:** Custom Software, AI Systems, Cloud, Mobile Apps, Blockchain, UI/UX.
4. **Services bento grid:** the six services in section 2, each with a short two-line description and a 3D or glass icon.
5. **Process (sticky scroll):** Discover, Design, Develop, Deploy.
   - Discover: understand the problem, users and goals.
   - Design: architecture, UX and a clear plan.
   - Develop: clean, tested, secure code in focused iterations.
   - Deploy: reliable launch, monitoring and room to scale.
6. **Selected work:** horizontal-scroll case-study cards with 3D device mockups (placeholder or approved projects only).
7. **Tech stack:** orbiting or rotating showcase of the stack in section 2.
8. **Why xDEVS:** three large tiles, **Performance**, **Security**, **Scalability**, each with a one-sentence qualitative promise. No fake stats.
9. **Careers banner:** "Join the xDEVS". Internships open across four tracks (see section 6). Button: Apply.
10. **Final CTA:** oversized *"Let's build something extraordinary."* with a short form (name, email, project details) and a glowing button.
11. **Footer:** huge silver xDEVS wordmark, nav links, LinkedIn, and the line "IT System Custom Software Development".

### Other pages (outline)
- **Services:** one block per service with what it covers, typical deliverables and a 3D visual.
- **Work:** filterable grid by service type, plus a case-study template (problem, approach, stack, result). Results stay qualitative unless real numbers are provided.
- **About:** the official description, the story and values (engineering-led, security-first, clear communication), and founder note by Jacell Sagar Jamble **[CONFIRM copy]**.
- **Careers:** see section 6.
- **Contact:** form, LinkedIn, and a stylised 3D globe. Email and phone **[TBD]**.

---

## 6. Careers page content (real, current)

THE xDEVS is hiring **10 interns** across 4 roles:

| Role | Openings | Focus |
|---|---|---|
| Full-Stack Developer Intern | 4 | Web apps, APIs and databases |
| Business Development & Sales Intern | 2 | Lead generation and client acquisition |
| Social Media Intern | 2 | Content, community and brand presence |
| Design & Video Editing Intern | 2 | Visual design, motion and video |

- **Duration:** 3 to 6 months
- **Mode:** Remote / On-site / Hybrid
- **Stipend and recognition:** Performance-based stipend, Certificate of Completion and Letter of Appreciation
- **Interview:** Offline (in person)
- **How to apply:** via the LinkedIn company page for now (https://www.linkedin.com/company/the-xdevs). An on-site application form is optional **[TBD]**.
- **Full-Stack candidates** also receive a take-home assessment ("SignSeal"). Do not publish its details on the site.
- Role detail (responsibilities, requirements, perks) lives in the JD document. Summarise it on the page with expandable cards per role.

---

## 7. Technical guidance for builders

### Recommended stack (change only with a stated reason)
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS with the tokens above defined as CSS variables
- **3D:** Three.js via React Three Fiber (`@react-three/fiber`, `@react-three/drei`), lazy-loaded
- **Animation:** GSAP (ScrollTrigger) for scroll storytelling, Framer Motion for UI transitions, Lenis for smooth scroll
- **Forms:** server action or API route sending email through Resend or similar **[TBD provider]**, with validation, rate limiting and spam protection
- **Hosting:** Vercel, with the `xdevs.in` domain (and `www` redirect)

### Performance and quality bars
- Lighthouse target on mobile: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
- 3D scenes must be lazy-loaded, capped in pixel ratio, paused when off-screen, and replaced by a static or lightweight fallback on low-power or mobile devices and under `prefers-reduced-motion`.
- Optimise images (AVIF/WebP), self-host fonts, avoid layout shift, and keep the JS budget sensible.
- Fully responsive: design for 1440px and 390px, verify at 768px and 1920px.
- Accessible: semantic HTML, keyboard navigation, visible focus states, sufficient contrast, alt text, ARIA only where needed.
- SEO: per-page title and meta description, Open Graph and Twitter images, `sitemap.xml`, `robots.txt`, and `Organization` JSON-LD with the official description and LinkedIn link.

### Suggested structure
```
/app            routes (home, services, work, about, careers, contact)
/components     ui/, sections/, three/ (canvas + scenes), motion/
/lib            utils, content, validation
/content        copy + case-study data (typed, easy to edit)
/public/brand   logo and brand assets
/design         Stitch exports and reference screenshots
```
Keep all copy in `/content` so the founder can edit text without touching components.

### Suggested split if running several agents in parallel
1. **Foundation:** project setup, design tokens, layout, nav and footer, smooth scroll, loader and page transitions.
2. **Hero and 3D:** chrome X scene, floating objects, fallbacks and performance tuning.
3. **Home sections:** services bento, process, work, tech stack, why, careers banner and final CTA.
4. **Inner pages:** services, work and case-study template, about, careers, contact, legal and 404.
5. **Quality:** SEO, accessibility, performance audit, responsive QA and cross-browser checks.

Agents should work in separate branches or directories and merge through the foundation agent's design tokens and components, not their own copies.

---

## 8. Hard rules (do not break)

- No fabricated clients, testimonials, metrics, awards, team members or addresses.
- No colours outside the monochrome palette.
- Do not publish any client name until the founder confirms.
- Do not expose the Full-Stack assessment details.
- Keep the official description and service list wording consistent across the site.
- Every animation needs a reduced-motion fallback.
- Report all `[TBD]` and `[CONFIRM]` items you hit in your final summary.

## 9. Definition of done
- All pages in the sitemap exist, responsive, and match the Stitch design where provided.
- 3D hero and key animations work smoothly on desktop and degrade gracefully on mobile.
- Contact form works end to end (or is clearly stubbed with a documented env var).
- Lighthouse targets met, no console errors, accessibility checks passed.
- Deployed preview URL provided, with a README covering setup, env vars, deployment and how to edit content.
