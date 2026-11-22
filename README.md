# Blutec AI technical assignment: TeddyPups clone

**Deadline: Monday 23 Nov 2026, 4:42 PM IST** (48 hours after the acceptance email went out on Sat 21 Nov, 4:42 PM). Aim to send by about 3:30 PM so there's slack.

## The assignment (from Gaurav Teli, careers@blutec.ai, 21 Nov 2026)

Role: Full-Stack AI Engineer Intern, Blutec AI (on-site, Ahmedabad). Shortlisted for the technical round.

> **Clone the complete website** https://puppy.instabizweb.com/, matching its design, layout, responsiveness and functionality as closely as possible.

Three deliverables:
1. **Live website URL** (deployed).
2. **GitHub repository URL** with the complete source.
3. **Loom video** (screen share) explaining:
   - development process and project structure
   - technologies and tools used
   - **AI tools used and the exact prompts provided**
   - implementation decisions and challenges faced
   - testing and deployment process

AI policy: any AI or dev tools are allowed, but you must understand the implementation and be able to explain the whole workflow. Their words: the submission and the Loom video "will play a key role" in deciding the next stage.

### How to submit (exact rules)
- **Reply to the original email** ("Technical Round Assignment – Full Stack Developer – Blutec AI" in harshsrivastava8704@gmail.com), to careers@blutec.ai, **and** send a copy to **neelnsoni1306@gmail.com**.
- **Subject must be exactly:** `Technical Assignment Submission – Harsh Srivastava – Blutec AI`
  - Replying in the thread keeps the old subject ("Re: Technical Round Assignment…"), so **edit the subject line** to the one above before sending.

Draft:

```
Hi Gaurav,

Please find my submission for the technical assignment (clone of https://puppy.instabizweb.com/):

Live website: <URL>
GitHub repository: <URL>
Loom video: <URL>

<one or two lines: stack, what's covered, anything notable>

Thank you for the opportunity. I look forward to your feedback.

Best regards,
Harsh Srivastava
```

---

## What the reference site is

"TeddyPups U.A.E.: Premium teacup puppies in Dubai". It's a puppy-seller brand site built by the agency Insta Biz Web. It's **not a one-pager**: the sitemap (https://puppy.instabizweb.com/sitemap.xml) lists **49 URLs**, which are 7 main pages and 42 puppy profile pages.

### Its stack (read from the page source)
- **Next.js** (App Router, built with Turbopack): `/_next/static/chunks/...`, and images through `/_next/image`.
- **Tailwind CSS v4**: theme tokens as `--color-*` and `--font-*` CSS variables, and classes like `bg-honey`, `text-cocoa`, `h-dvh`.
- **Lenis** smooth scrolling.
- Native `<dialog>` for the full-screen menu and the photo viewer.
- Lots of hand-written CSS keyframe animations, all prefixed `tp-`.
- Behind Cloudflare: the footer email is obfuscated by Cloudflare's email protection.
- `/admin` redirects to a separate backend, `bkpuppy.instabizweb.com/admin`, which is probably a CMS for puppies and enquiries. That's a **stretch goal**, not visible on the public site.

Matching that stack is the easiest route: **Next.js + TypeScript + Tailwind v4, deployed on Vercel**.

### Design tokens (copied from their CSS)
| Token | Value | Use |
|---|---|---|
| `--color-cocoa` | `#2a170e` | main text, dark surfaces |
| `--color-cocoa-soft` | `#5a3a28` | secondary text |
| `--color-honey` | `#f2be6b` | primary accent, buttons |
| `--color-honey-soft` | `#fbe3b4` | soft fills |
| `--color-milk` | `#fffdf8` | page background |
| `--color-blush` | `#f9cdbf` | pink accents |
| `--color-toffee` | `#c2622b` | warm accent |
| `--color-toffee-deep` | `#a24a1a` | |
| `--color-toffee-ink` | `#8e3f15` | |
| `--color-sky` | `#bfddf5` | sky/blue accents |
| `--color-sky-deep` | `#2f6e9e` | |
| hero sky gradient | `#fffdf8` → `#fff1d8` | `--sky-top` / `--sky-bottom` |

Fonts (all on Google Fonts, so load them with `next/font/google`):
- **Fraunces**: display serif, for headings (`--font-display`).
- **Figtree**: body sans (`--font-sans`).
- **Shantell Sans**: handwritten accents like "every puppy is family", "where to, friend?" and "hello, it's me" (`--font-hand`).

Breakpoints: Tailwind defaults (640 / 768 / 1024), plus one at 900px. The site respects `prefers-reduced-motion` everywhere (13 media queries), so do the same.

### Signature animations (keyframe names from their CSS)
- `tp-curtain-*` (lift/cover): the hero intro reveal.
- `tp-peek`, `tp-tag-swing`, `tp-ear-twitch`, `tp-blink-*`, `tp-breathe`: the row of puppies peeking up in the hero (`tp-lineup`). Each pup is positioned with CSS vars `--x`, `--w`, `--peek`, `--tilt`, `--i`.
- `tp-runner-*` (bob, legs, wag, ear, x): a running-puppy loader or illustration.
- `tp-msg-in`, `tp-dot`: the animated WhatsApp chat mock-up in "Your puppy journey".
- `tp-print-step`, `tp-paw-pat`: paw-print step indicators.
- `tp-plane-bob`, `tp-flag`, `tp-stamp-in`, `tp-stamp-thump`: the "puppy passport" and import-route (Korea to Dubai) visuals.
- `tp-sunrise`, `tp-sun-set`, `tp-twinkle`: the dusk/night "Happy families" section.
- `tp-env-in`, `tp-letter-fold`, `tp-env-post`, `tp-sent-in`: the contact form folds into an envelope and "posts" on submit.
- `tp-door-open`, `tp-house-open`: house/door illustrations.
- `tp-menu-in/out`, `tp-menu-link`, `tp-menu-backdrop-out`: the full-screen menu.
- Also `tp-float`, `tp-pop-up`, `tp-poster-in`, `tp-box-up`, `tp-doodle-hop`, `tp-step-in`, `tp-hold-still`.

Component class names worth inspecting in DevTools: `tp-lineup`, `tp-polaroid`, `tp-tape`, `tp-photowall`, `tp-chat`, `tp-phone`, `tp-msg`, `tp-stamp`, `tp-flight`, `tp-route`, `tp-house`, `tp-door`, `tp-basket`, `tp-qa`, `tp-night`, `tp-horizon`, `tp-snaps`, `tp-meet`, `tp-way`, `tp-entry`.

### Shared layout
- Skip-to-content link.
- **Header:** logo, nav links (Home, Puppies, Happy families, How it works, FAQ, Visit & contact), a "WhatsApp us" button, and a **Menu** button.
  - The Menu button opens a full-screen `<dialog>` menu titled "where to, friend?", with the same links and the phone number.
- **Footer:**
  - "Home, at last." plus a brand blurb.
  - **Explore** links: Available puppies, Gone home, Happy families, How it works, Delivery & collection (`/how-it-works#delivery`), FAQ, Visit & contact.
  - **Say hello:** WhatsApp, phone `+971 50 000 0000` (a placeholder), email, "Downtown Dubai, United Arab Emirates", and Instagram / TikTok / Facebook.
  - "© 2026 TeddyPups U.A.E.", and sticky "WhatsApp us" and "Call" buttons on mobile.
  - Leave out the agency credit link (wa.me to Insta Biz Web).
- **WhatsApp links:** `https://wa.me/<number>?text=<prefilled message>` all over the site (for example "Hi TeddyPups! I'd love to know more about your puppies.", or "Ask about Max on WhatsApp" with the puppy's name filled in).

### Pages

**1. `/` (Home)**, sections in order:
1. **Hero:** handwritten "every puppy is family", "Premium teacup puppies in Dubai", and "Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide."
   - Buttons: **View available puppies** and **Enquire on WhatsApp**.
   - The animated lineup of 6 pups, each linking to its profile.
2. **Meet the pups:** "Real puppies, real photos, looking for their families right now."
   - Cards: name or breed, sex, age, a "with video" tag and an "Available" badge.
   - A "See all available puppies" link.
3. **Two ways to meet your puppy:**
   - "Puppies in Dubai / In our showroom" links to `/puppies?origin=local`.
   - "Imported for you" (exclusive Korean teacup puppies) links to `/puppies?origin=imported`.
4. **Your puppy journey:** "A premium, step-by-step concierge experience."
   - Steps: 1 Choose your breed, 2 Get photos & details, 3 Secure & safe delivery.
   - A WhatsApp phone mock-up shows the chat ("TeddyPups U.A.E. · online").
   - Breed chips link to `/puppies?breed=`: Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu.
5. **Why families trust TeddyPups** ("puppy passport"): Vet-checked & healthy; Korea to Dubai, safely; Support 24/7; Trusted by families worldwide.
6. **Happy families & puppies** (the dusk/night scene):
   - Intro text and a testimonial: "TeddyPups truly made our dream a reality…", Sarah M., Dubai, UAE.
   - Photo captions with emoji, and a "See every happy family" link.
7. **Questions, answered:** 3 FAQs and a "Read all questions" link.
8. **CTA:** "Ready to meet your new best friend?", with "welcome home", **Enquire on WhatsApp** and **Visit & contact**.

**2. `/puppies`** ("from Teddy's sketchbook / Available puppies")
- "Every listing shows real photos of the actual puppy…"
- Sketchbook-style cards: Available badge, ▶ video tag, name, breed, sex and age.
- Filters through the query string: `?breed=maltipoo|poodle|pomeranian|cavapoo|shih-tzu` and `?origin=local|imported`.
- Below the cards, an **"Already gone home"** strip (Ace, Leo, Mia, Sadie…) that links to `/gone-home`.

**3. `/puppies/[slug]`** (puppy profile; 42 slugs, for example `maltipoo-max-male` or `korean-teacup-maltipoo-female`)
- Breadcrumb: Available puppies / Max.
- **Gallery:** photo counter ("1 / 2"), ‹ › arrows, a video (▶), a "hello, it's me" note, and a lightbox `<dialog>` ("Photo viewer").
- **Facts:** Breed, Boy or girl, Age, Where ("In Dubai" or "Imported for you"), and an "Ask about Max on WhatsApp" button.
- **"the way home"** steps. The imported version is: Reserve your puppy → Personalized consultation → Import and arrival → Welcome home. The local version differs, so check a local pup.
- **Enquiry form** ("dear TeddyPups… / Ask about Max"):
  - Fields: Your name\*, Phone or WhatsApp\* (hint "With country code, e.g. +971 50 123 4567"), Email (optional), Your area (optional, e.g. Dubai Marina), and Message (prefilled "Hi! I'd love to know more about Max (Maltipoo).", max 2000).
  - Hidden fields: `puppyId`, plus a **honeypot** field `website` (anti-spam).
  - Buttons: "Send enquiry", then "Previous pup / Next pup".

**4. `/gone-home`**
- "Every puppy here has already joined a loving family…", with a "See available puppies" link.
- Cards styled as **tickets**: "one ticket home · Ace · Pomeranian, boy · TeddyPups · home ♥ · admit one".

**5. `/happy-families`** ("our wall of happy endings")
- "64 moments and counting" and the testimonial.
- A **polaroid photo wall** (tape, captions with emoji) that opens in the lightbox.

**6. `/how-it-works`**: four numbered chapters.
1. **Two ways home:** "In Dubai, meet in person" vs "Imported, order upon request", each with its own steps.
2. **Our premium puppy promise:** Hand-selected breeders, Full transparency, Safe stress-free delivery.
3. **Delivery & collection** (`#delivery`): Take your puppy home the same day, Delivery within Dubai, Safe international cargo, Worldwide delivery.
4. **Why choose us:** International cargo, Support 24/7, and so on.

The page ends with the "Unique and high quality puppies" CTA.

**7. `/faq`** ("Questions & answers")
- "sniff out a question": a **search box** (placeholder "delivery, Korea, vaccinated…") that filters live.
- "9 notes on the board": the 9 questions as **accordion** notes on a board.
- "Ask your own question".

**8. `/contact`** ("Get in touch with us")
- A **letter-style fill-in-the-blanks form**: "Dear TeddyPups, my name is \_\_, and you can reach me on \_\_ or by email at \_\_. I live in \_\_, and I'm curious about [select a puppy or 'any puppy (not sure yet)']…" plus a message.
  - Name is required (min length 2). Phone is required, type `tel`. Email, area and message are optional. It has the same honeypot.
  - On submit the letter folds into an envelope and gets stamped (the `tp-env-*` / `tp-stamp-*` animations).
- **Visit us in Downtown Dubai**, with an "Open in Google Maps" link.

Also: `/sitemap.xml`, `robots.txt`, favicon and apple icon, and good `<title>`s ("Max, Maltipoo puppy | TeddyPups U.A.E.").

---

## Suggested plan (about 40 working hours)

**Sat night: setup and skeleton**
1. `npx create-next-app@latest teddypups --ts --tailwind --app --eslint` (or `.` in this folder). Put the colour and font tokens in `globals.css` under `@theme`.
2. **Dropbox:** this folder syncs to Dropbox (`Desktop` = `Dropbox\PC\Desktop`). Stop it from syncing `node_modules` and `.next` once they exist. In PowerShell, in the project folder:
   `Set-Content -Path .\node_modules -Stream com.dropbox.ignored -Value 1` (and the same for `.next`).
3. `git init`, create a public GitHub repo, and push early. Deploy to Vercel straight away so the live URL exists from hour one.
4. Data: one typed file, `src/data/puppies.ts`, holding all puppies:
   - fields: slug, name, breed, sex, age, origin local/imported, status available/gone-home, photos[], video?
   - plus the testimonials, FAQs and happy-family photos.
   - The site is static, so `generateStaticParams` builds every puppy page.
5. Layout: header, full-screen menu `<dialog>`, footer, sticky mobile WhatsApp/Call buttons, and the skip link.

**Sunday: all pages**
- Home, then `/puppies` (filters from `searchParams`), then `/puppies/[slug]` (gallery, lightbox, enquiry form), then gone-home, happy-families, how-it-works, faq (search + accordion), and contact (letter form).
- **Forms:** a Server Action or `app/api/enquiry/route.ts`.
  - Validate on the server: zod, the required fields, phone format, max lengths. Silently drop the request if the honeypot `website` is filled.
  - Then **email the enquiry with Resend** (free tier) or **save it** (Supabase or Vercel Postgres).
  - Show the success state either way.
  - This is the "functionality" part of "design and functionality", so make it real and mention it in the Loom.

**Monday morning: polish, test, ship**
- The signature animations: hero curtain and pup lineup, the chat mock, the envelope send, the dusk scene. Respect `prefers-reduced-motion`.
- Smooth scrolling with Lenis (`npm i lenis`).
- Side-by-side checks against the original at **390px, 768px and 1440px** on every page.
- Lighthouse (performance, accessibility, SEO), keyboard navigation, metadata, and sitemap/robots.
- Final deploy, then the README for the repo, then the **Loom by about 2 PM**, then send the email.

**Stretch goal, only if time is left:** a small `/admin` (password-protected) to add or edit puppies and read enquiries, mirroring their `bkpuppy` backend.

### Images
The puppy photos sit on their server under `/media/...` and come out through `/_next/image?url=...`. Either:
- download the ones you need into `public/` for this private assignment, or
- use free stock puppy photos (Unsplash or Pexels).

Whichever you pick, say so in the repo README and the Loom. Don't hotlink their URLs: they can break, and that looks bad in a review.

### Useful commands for studying the reference
- Page HTML: `curl -sL https://puppy.instabizweb.com/puppies -o ref-puppies.html`
- CSS: the two stylesheets linked from the page head, `/_next/static/chunks/*.css`. The main one is about 143 KB and holds all the `tp-*` keyframes and tokens.
- Screenshots at three widths for side-by-side comparison: Playwright, or Chrome DevTools device mode.

---

## Prompt log (required for the Loom)

Blutec wants **"AI tools used and the exact prompts provided"**. Keep a running `PROMPTS.md` from the very first prompt: date/time, tool, the exact prompt, and what you kept or changed.

Entries so far (tool: **Claude Code**):
1. `accept blutec`: Claude sent the acceptance reply to the assignment email.
2. `create a new folder in my desktop. And in that create a readme file and give it the context needed. I will carry on from there itself.`
   - Claude created this folder.
   - It analysed the reference site (sitemap, page HTML, CSS tokens, fonts, animations, forms) and wrote this README.

## Loom outline (about 6–8 minutes)
1. 30 s: who you are and what was built (live site walkthrough on desktop, then mobile).
2. 1.5 min: **project structure**: `app/` routes, components, `data/puppies.ts`, the API route or server action.
3. 1 min: **tech and tools**: Next.js, Tailwind v4, Lenis, Resend or Supabase, Vercel, GitHub.
4. 1.5 min: **AI tools and exact prompts**: show PROMPTS.md, and where AI helped versus where you changed or fixed its output.
5. 1.5 min: **decisions and challenges**: data-driven static pages, form validation and honeypot, animation performance and reduced motion, responsive matching.
6. 1 min: **testing and deployment**: breakpoint comparisons, Lighthouse scores, form test, Vercel deploy from GitHub.

## Checklist
- [ ] All 7 main pages and every puppy profile page
- [ ] Filters on `/puppies` (breed, origin)
- [ ] Gallery and lightbox, video on puppy pages
- [ ] Enquiry form and contact letter form, validated server-side, honeypot, real delivery (email or DB)
- [ ] Full-screen menu dialog, WhatsApp deep links, sticky mobile CTA
- [ ] FAQ search and accordion
- [ ] Animations, reduced-motion respected
- [ ] Matches at 390 / 768 / 1440
- [ ] Metadata, sitemap.xml, robots.txt, favicon
- [ ] Deployed (Vercel), public GitHub repo with a README
- [ ] PROMPTS.md complete
- [ ] Loom recorded (by you), link set to "anyone with the link"
- [ ] Email sent with the **exact subject**, to careers@blutec.ai **and** neelnsoni1306@gmail.com, before **Mon 23 Nov, 4:42 PM IST**
