# Project memory

## Product intent & audience

- Veterinary/pet-care web app with multiple user-facing routes: **PT** `/veterinario`, `/tutor`, `/representantes`; **EN** `/en/veterinarians`.
- `/` redirects to `/veterinario`; unknown routes fall back to `/veterinario`.
- App has bilingual content: **Brazilian Portuguese** (primary) and **English** (US market, `/en/veterinarians`).
- English page targets US clinics; pricing in USD.

## Brand personality & voice

- Practical, clean communication suited to a veterinary/professional context.
- User is highly sensitive to preserving existing copy/layout on pages not explicitly being edited; changes must be scoped strictly to the requested page and its own files.

## Visual design & UX direction

- Built with Vite + React, Tailwind CSS, Lucide React icons (per `.bolt/prompt` constraints; no other UI/icon packages).
- Hero pattern (both PT and EN vet pages): centered eyebrow → headline → subtext → two CTAs → trust line ("The veterinarian always makes the call") → large video below (max-width ~960px, rounded, shadow), visible in first fold on desktop.
- Video element: `controls`, `playsInline`, `preload="metadata"`, poster image, "Watch in 1:20" badge overlay; no autoplay with sound.
- Device 3D image (`/utopet-aparelho-3d.jpg`) lives in the device section below the hero, not in the hero itself.
- Page sections include: hero/video, device section, founding clinic program (pricing), ROI simulator, FAQ.
- SPA fallback to `index.html` configured for direct URL access.

## Decisions, constraints & rationale

- English page `/en/veterinarians` is isolated: only its own files were modified; PT pages and shared files untouched.
- US launch pricing: **$2,990** launch (regular **$4,990**), shown with strike-through, "Launch price" label, and "Device, full software and staff training included." line.
- No invented installments, financing, guarantees, or deadlines.
- ROI simulator left unchanged.
- Replaced "get pricing for your clinic" / "Pricing and terms for your clinic" with demo-focused CTA ("Book a demo to see it working on one of your patients.").
- Added FAQ item "How much does it cost?" with exact pricing answer.
- `tsc` and production build pass without errors; site not published.
- A legacy/stale home page file exists but is no longer referenced; deletion offered but not yet confirmed.

## Open questions & assumptions

- Route/build behavior verified via navigation rules and build output, not a live browser click-test.
- Video first-fold fit on laptops not browser-verified; user asked to preview.
- **Unresolved:** user has not confirmed whether to delete the unused legacy home page file.
- Assumption: Brazilian Portuguese remains the primary app language; English is limited to `/en/veterinarians` unless expanded.