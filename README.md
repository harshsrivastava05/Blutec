# TeddyPups U.A.E.

A responsive puppy discovery website inspired by [TeddyPups U.A.E.](https://puppy.instabizweb.com/). Visitors can browse available puppies, view individual photo and video galleries, explore puppies that have gone home, read family stories and FAQs, and enquire about a puppy.

The site is built with Next.js App Router, React, TypeScript, and CSS. Its illustrated pages include scroll-driven scenes, a moving Teddy mascot, animated transitions, and reduced-motion support.

**Live site:** [https://blutecc.vercel.app/](https://blutecc.vercel.app/)

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To run a production build locally:

```bash
npm run build
npm run start
```

## Pages

- `/` — homepage, puppy parade, journey, family stories, and questions.
- `/puppies` — available puppies and filters.
- `/puppies/[slug]` — puppy details, galleries, and enquiry form.
- `/gone-home` — archive of puppies who have found families.
- `/happy-families` — family photo gallery.
- `/how-it-works` — adoption, delivery, and care information.
- `/faq` — searchable questions and answers.
- `/contact` — visit details and contact form.

## Enquiry configuration

The contact and puppy enquiry forms send validated requests to `/api/enquiry`. The server uses [Resend](https://resend.com/) to deliver enquiries. Copy `.env.example` to `.env.local` and set:

```dotenv
RESEND_API_KEY=your_resend_api_key
ENQUIRY_FROM=verified-sender@example.com
ENQUIRY_TO=recipient@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use a sender address verified with Resend. Set `NEXT_PUBLIC_SITE_URL` to the public site URL in production. Keep the API key and `.env.local` private. If the server-side email settings are missing, the form reports that enquiries are not configured; it does not claim the message was sent.

## Project structure

- `app/` — routes, layouts, styles, sitemap, and the enquiry API.
- `components/` — shared navigation, galleries, forms, illustrations, and motion.
- `lib/` — puppy data, gallery data, FAQs, and enquiry validation.
- `public/media/` — local images, videos, fonts, and illustrations.
- `tests/` — enquiry validation and delivery tests.
- `design-qa.md` — notes on visual checks and known verification gaps.

Run the enquiry tests with:

```bash
node tests/enquiry.test.mjs
```

Run `npm run format` to format the source, or `npm run format:check` to check it without making changes.

The project includes assets reproduced from the reference site with permission. Confirm that you have the necessary rights before reusing or publishing those assets elsewhere.
