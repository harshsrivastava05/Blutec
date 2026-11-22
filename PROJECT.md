# Phase-one development notes

Run `npm install`, then `npm run dev` and open http://localhost:3000. `npm run build` verifies the production build.

The original assignment brief is preserved in README.md. Phase one includes the shared shell, homepage, mobile menu, introductory motion, responsive styling, and a six-photo family lightbox. Images, illustrations and Latin font files were saved from the reference site for this assignment; they are not hotlinked. The reference assets remain third-party material and should be reviewed before use outside the assignment.

The catalogue, archive, puppy profiles, family wall, journey, FAQ, and contact pages are implemented. Contact buttons lead to the contact page; the reference's actual WhatsApp destination belongs to the agency, while its displayed number is a placeholder. The displayed Call action uses that placeholder and is not a verified business number. Both forms call the validated enquiry endpoint; live delivery requires the server settings below. The homepage has scroll-driven puppy doors and journey/dusk effects; the family page includes all 64 reference photos. Closer visual comparison below the fold remains useful.

## Phase two status

The available catalogue, combined URL filters, gone-home ticket archive, and 42 static profile routes are implemented. The homepage puppy parade now moves horizontally with desktop scrolling, and uses a two-column vertical grid on smaller screens. The catalogue uses the reference query keys `breed`, `origin`, `collection`, and `gender`.

This is still a partial clone. All 42 reference puppy galleries are mapped to local original media: 126 images and six videos. The reference collection snapshot and collection script are in scripts/. Both enquiry forms use the same validated Resend endpoint and clearly show errors if delivery is unavailable. The journey and dusk scenes also respond to scrolling; they are approximations and have not been verified as frame-identical to the reference. Full responsive and real-device comparisons remain. No deployment has been made.

## Enquiry delivery setup

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `ENQUIRY_FROM` (a sender permitted by the Resend account), and `ENQUIRY_TO` (the intended recipient). Set the same server-side variables on the hosting provider; set `NEXT_PUBLIC_SITE_URL` to the deployed origin for the sitemap and robots file. Restart the development server after editing environment settings. The secret must stay server-side and must not be committed.

The form returns success only when the provider accepts the request; a missing configuration or provider failure displays an error and retains the entered fields. The honeypot is silently discarded. `node --experimental-strip-types --test tests/enquiry.test.mjs` tests validation and a mocked provider without sending email. An actual delivery and inbox receipt still need to be verified after configuration.

Reference photos are included for the assignment and remain third-party materials. The desktop and mobile pages have been compared in a browser, but exact animation timing, physical-device testing, deployed delivery, and the submission process remain unverified.
