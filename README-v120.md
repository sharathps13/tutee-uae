# Tutee Connect UAE page, v120: performance pass

## What changed
- **Loops are cheaper.** The pulsing CTA dot, live dots, chat "online" dot and the services-dial dashes now animate transform/opacity only, so the GPU handles them without repainting.
- **Off-screen loops pause.** Sections out of view pause their animations.
- **Far sections render lazily.** Funding, residence, life, reviews and Ask use `content-visibility: auto`.
- **No live blur on touch screens.** Glass effects behind the header and tooltips use a solid tint on phones and tablets, because blur is the most expensive effect there.
- **Scroll work touches less.**
  - The lattice parallax moves its own layer instead of restyling the whole chapter.
  - Journey progress is written only to the two elements that draw it.
  - Hero and passport only write a style when its value actually changes.
- **Start-up runs in short slices.** Set-up yields to the browser every ~30 ms, so the page answers taps while it finishes.
  - CTA colour reads are batched.
  - The footer heart-flight route is measured only when the footer comes near.
- **Images are lighter.**
  - Logos are lossless WebP (about 35% smaller, same pixels).
  - New 2200px versions of the hero, city and contact photos stop 1080p screens downloading the 3200px files.
  - Below-the-fold photos load lazily.
- **Files are minified.**
  - CSS: 304 KB → 228 KB.
  - Main JS: 144 KB → 83 KB.
  - Readable copies of uae.css and uae.js are in `source/`.

## Measured (headless Chromium, full-page scroll)

| Device | Before: load | Before: slow frames | After: load | After: slow frames |
|---|---|---|---|---|
| Desktop 1920×1080 | 1.6 s | – | 0.43 s | 1.3% |
| Desktop 1903×940 | 0.9 s | 2% | 0.31 s | 1.2% |
| Laptop 1440×900 (16:10) | – | – | 0.35 s | 0.3% |
| Laptop 1366×768 | – | – | 0.34 s | 0.7% |
| 4:3 1280×960 | – | – | 0.32 s | 1.0% |
| Tablet 768, CPU slowed 4× | 2.6 s | 16% | 0.79 s | 0% |
| Phone 390, CPU slowed 4× | 2.6 s | 8.7% | 0.83 s | 0.1% |
| Phone 360, CPU slowed 6× | 3.9 s | 20% | 1.19 s | 0% |

Slow frames are frames that took longer than 20 ms.

## Follow-up (mobile check)
- Mobile pages were screenshotted top to bottom at 390px.
- The far-section lazy rendering (`content-visibility`) is now desktop-only. On phones the sections are much taller than the placeholder height, which made the scrollbar and jump links less accurate.
- The enquiry form is now wired up in the first moments after load, so lead capture never waits.
