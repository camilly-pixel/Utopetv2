# Project memory

## Product intent & audience

- Veterinary/pet-care web app with two primary user roles: **veterinário** (vet) and **tutor** (pet owner).
- Routes: `/veterinario`, `/tutor`; `/` redirects to `/veterinario`; unknown routes also fall back to `/veterinario`.
- App UI text is in **Brazilian Portuguese**; user communicates in Portuguese.

## Brand personality & voice

- Practical, clean communication suited to a veterinary/professional context.
- No text or layout changes were requested in the latest task — user is sensitive to preserving existing copy and layout.

## Visual design & UX direction

- Built with Vite + React, Tailwind CSS, Lucide React icons (per `.bolt/prompt` constraints; no other UI/icon packages added).
- SPA routing is in place; **SPA fallback to `index.html`** is configured so direct URL access to `/veterinario` and `/tutor` works on the published site.
- Asset/image paths verified to load correctly on direct URL access.

## Decisions, constraints & rationale

- Unused imports were already removed before the latest check; manual file review confirmed no remaining unused imports.
- Type-check (`tsc`) and production build both pass without errors.
- Unknown route fallback goes to `/veterinario` (acts as default/home).
- A legacy/stale home page file exists but is no longer referenced anywhere in the app; deletion was offered but not yet confirmed by the user.

## Open questions & assumptions

- Route behavior was verified via navigation rules and build output, not via a live browser click-test (no browser available in assistant environment).
- **Unresolved:** user has not confirmed whether to delete the unused legacy home page file.
- Assumption: Brazilian Portuguese remains the app language for future content.