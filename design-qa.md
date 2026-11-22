# Design QA: How it works, FAQ, and Visit & contact

final result: blocked

## Comparison evidence

- Reference: `https://puppy.instabizweb.com/how-it-works`, `/faq`, and `/contact`.
- Implementation: the corresponding local routes at `http://localhost:3000`.
- Captures in `design-evidence/` use 1383 × 844 desktop and 390 × 844 mobile CSS viewports. Both images in each comparison use the same viewport; the browser's visible page width is 1368 or 375 CSS pixels after the scrollbar. Captures were compared at their native pixel size, side by side.
- `how-desktop-comparison.png`: passport panel after the rebuild. The two captures were taken at slightly different scroll offsets; compare the panel contents rather than the viewport top.
- `how-mobile-comparison.png`: journey opening, before the final adjustment to the heading and switch spacing.
- `faq-desktop-comparison.png` and `faq-mobile-comparison.png`: FAQ opening, including the corrected green action.
- `contact-desktop-comparison.png` and `contact-mobile-comparison.png`: contact opening and letter form. The desktop capture precedes the final 12px heading-to-form spacing adjustment.

## Findings and iteration

- [P1 fixed] The local promise, delivery, and trust sections used unrelated card layouts. Rebuilt them as the reference's patterned passport with three stamp illustrations, a scroll-driven plane over the skyline, and a two-column trust list; compared the rendered passport and delivery states on desktop and the passport on mobile.
- [P2 fixed] The FAQ action used an outlined button, and searching lacked the reference's match highlights and result-count wording. Reused the reference button treatment and verified matching and empty search states, clearing, and note unfolding.
- [P2 fixed] The contact letter used incorrect field widths and omitted Teddy below the letter. Matched the reference's responsive field proportions and added the existing sitting Teddy illustration. The mobile form was compared side by side.
- [P2 fixed] Mobile journey switch and heading positioning differed. Adjusted heading typography, section spacing, and contact form placement after comparing the 390 × 844 captures.

## Fidelity and verification limits

- Typography, spacing, gradients, imagery, copy, and interactive states were compared in the captures above. The reference-derived stamp and skyline assets are reused locally; the visible plane is the same vector component used elsewhere in the project.
- The imported journey tab, FAQ unfolding/search/empty/reset, flight marker movement, and mobile overflow were checked in the browser. Enquiry validation tests and the production build passed; a live enquiry was not sent.
- [P2 unresolved] An exhaustive frame-by-frame comparison of every animation, scroll offset, focus/hover state, and both tab panels on both viewport sizes has not been completed. The reference's live Teddy behavior and letter-submission animation have not been matched frame by frame. Exact pixel equivalence is therefore not established.

## Remaining checklist

1. Capture matched desktop and mobile scroll positions for each remaining animation and repeat the side-by-side checks.
2. Verify the contact letter's posting and success states with a controlled test provider; compare Teddy's idle and interaction timing.
3. Repeat the final captures after the last spacing adjustments before marking this report passed.

## Follow-up comparison

- Desktop delivery: at the delivery anchor the reference flight was at `translate(374.6 72.0) rotate(0.7)` and the local flight at `translate(372.4 72.0) rotate(0.4)` before matching the column gap. These are close samples, not a full frame-by-frame motion trace.
- Mobile FAQ: opening two notes leaves only the second open on both sites. Search, matching highlights, empty results, and clearing were checked in the preceding pass.
- Journey tab: the reference uses a spring-animated thumb with a `.5s` transition; the implementation now uses the same timing and keeps keyboard tab controls. The mobile page had no horizontal overflow at 390 × 844.
- Contact validation: the reference shows an inline error summary and highlights name and phone after an empty attempt. The implementation now renders the same feedback and sets `aria-invalid` and `aria-describedby`.
- Contact posting: an isolated copy on port 3001 used a local mock success response; no real provider was called. The success state appeared on desktop and mobile, and the mobile posting state was observed. The letter fold now uses the reference's observed `.65s` perspective animation; reduced motion skips the delay.
- Build and enquiry tests passed. The isolated preview and its copied files were removed after testing.
- [P2 unresolved] The reference envelope/postbox scene and final success artwork were not captured. The reference's initial document exposes timing rules but does not render those illustrations before posting; submitting a real enquiry was not part of the test. The local result therefore remains an approximation and the full animation cannot be certified frame by frame. Other animation timings have only been sampled, not exhaustively matched at every scroll offset.
