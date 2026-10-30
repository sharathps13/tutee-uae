# Tutee Connect — Study in Dubai & the UAE

## October 2026 redesign of `index.html` ("After Hours")

`index.html` is hand-maintained and **no longer comes from `assemble.py uae`**:
re-running that script overwrites it. `universities.html`, `assets/css/main.css`,
`assets/js/main.js` and `supabase-data.js` are unchanged and still power the
directory page. Everything is same-origin, so the CSP in `netlify.toml` holds.

- Concept: Dubai from last light to first light. Hero at dusk (Burj Khalifa),
  petrol and ink chapters through the night, emerald for the residence pathway,
  the enquiry at dawn over the dunes; ivory chapters carry reading.
- Typography: **the Canada page's system, reused exactly** (identified in
  `CANADA/tutee-canada/assets/canada/css/royal.css`): Playfair Display 400/500
  with italics (family name "Playfair") for display, Manrope 400–700 for text
  and UI; display weight 400, letter-spacing −0.02em, line-height 0.98, italic
  for emphasis; scale d-xl/d-l/d-m/d-s and lede copied from the Canada CSS;
  buttons in uppercase Manrope 700 at 0.14em. The eight woff2 files are copied
  into `assets/fonts/` (not linked across projects, so the Canada site is never
  touched). Bodoni Moda, Instrument Sans, Outfit and Fraunces are no longer used and can be deleted.
- Colour tokens (`:root` in `assets/css/uae.css`): ink `#061317`, petrol
  `#08222a`/`#0d2f38`/`#143e48`, emerald `#0f3b31`/`#1d6a55` (accent on light),
  champagne `#e3cfa8` (accent on dark), bronze `#a8825a` (small marks), ivory
  `#f4efe6`, mist `#e4eae7`. The logo always sits on an ivory chip.
- Hero (kept at the client's request): the golden-hour desert photograph with the dune cut-out above "Study in Dubai". With motion allowed it is the first layer of a pinned stage (`.hs`, 890svh, 870 on phones), and everything below is driven by scroll position (screens scrolled, q):
  - 0 – 0.7: the headline sinks into the dunes (`--hp`) and the intro copy fades.
  - 0.7 – 1.6: the sand curtain. The photograph splits into ten strips (`.hero-curtain i`, each a slice of the same image at cover 48% 42%, so the swap is seamless) that fall away left to right, accelerating, uncovering the city.
  - Slide two, "From the dunes, into the city." (`city-night-*`): the city settles from a slight zoom and the words rise into place; no blur anywhere. From 2.2 its headline swells past the viewer and the city fades to dark.
  - From 2.8: slide three, "Seven emirates, one federal visa." as a scroll-driven tour of the seven emirates in the client's order: 01 Abu Dhabi (Sheikh Zayed Grand Mosque), 02 Dubai (Dubai Frame), 03 Sharjah (Al Qasba canal), 04 Ajman (Ajman Corniche), 05 Umm Al Quwain (waterfront), 06 Ras Al Khaimah (Al Marjan Island), 07 Fujairah. No timer, nothing to click. Each photograph is cut into seven slices labelled with the emirates; scrolling assembles it, holds it with a pin caption (emirate, place, 0N / 07), then scatters it as the next assembles. The tour eases toward the scroll position over a few frames so it glides rather than stepping with each wheel tick. Photos supplied by Tutee Connect (confirm licences), upscaled 4x with Real-ESRGAN, `em-<emirate>-2000/1000.webp`, each shown whole. The Fujairah photograph shows a pink palace that closely resembles Emirates Palace in Abu Dhabi; confirm it before publishing. The older `uae-*` tour images and `marina-night-*` are no longer used
  arrives soft and sharpens. `initHeroSlides()`; scroll position only, reverses
  exactly; a 02 / 03 counter and "Scroll" sit at the bottom. With reduced
  motion or no JS the slides are ordinary sections. `soft-desert.webp` is no
  longer used.
- Destinations (`#destinations`): a Tutee Connect student passport with one
  spread for each of the seven emirates (Dubai, Abu Dhabi, Sharjah, Ajman,
  Umm Al Quwain, Ras Al Khaimah, Fujairah). Left page: entry number, name,
  CAA-licensed count and QS 2027 count (both computed from
  `universities-data.js`), a short description, the QS-ranked names (Dubai,
  Abu Dhabi) or the full list of institutions (the others, QS-ranked ones
  tagged), and a "See <emirate> universities" link that sets the finder.
  Right page ("visa page", decorative): a map of the UAE with that emirate
  shaded (Natural Earth admin-1 boundaries, public domain), the city, a
  photograph or the institution count, and an entry stamp. The passport,
  stamps and the machine-readable-style line are a brand keepsake, not an
  imitation of an official document. Screens 901px and wider with motion
  allowed: the book lies on a sand desk, pinned (about 5.5 screens); scrolling
  opens the cover and turns one page per emirate, stamps land as each spread
  settles, and thumb-index tabs (DXB, AUH, SHJ, AJM, UAQ, RAK, FUJ) on the
  fore-edge jump to any emirate (`initPassport()`; scroll position only).
  Tablets, phones and reduced motion: the seven spreads laid out in order.
- "Six nations' campuses, one city." now sits in a short ivory band after it.
- The arch shape remains only as the frame of the Student life photograph.
- Imagery below the hero: photographs colour-graded to the palette (petrol
  shadows, champagne highlights) as `assets/img/uae/after-*.webp`; the tower
  interlude uses the Burj Khalifa photograph (imran shahabuddin, CC BY 2.0).
  `after-front-*` is no longer used.
- Motion (no library): hero intro, scroll depth and night-fall (`--hp`), one
  text reveal (`.rise`), picture reveal, destination wipe on tab change, the
  tower interlude unmasking with the scroll (`--p`), journey meter following
  the step in view, pathway drawing itself, count-ups, magnetic CTAs. No
  pinning or scroll hijacking; `prefers-reduced-motion` shows the finished state.
- Sections: hero → intro (`#about`) → destination explorer (`#destinations`,
  ARIA tabs) → tower interlude → services → universities → journey + CAA
  checker → funding → residence pathway → life + family → reviews (one at a
  time) → FAQ → enquiry (`#contact`) → footer.
- The form posts the same JSON to `/api/enquiry`; `destination` is
  "General UAE Inquiry" or "UAE Inquiry: <topic>". Unchanged.
- Licence still to confirm: the desert photograph behind the enquiry section
  was supplied via Pinterest.

## Original build notes

The tenth destination page. Generated, not hand-written: the fragments come from
`_tooling/fragments-uae/` (themselves generated from `fragments-uk/` by
`_tooling/localise_ae.py`), and the two pages are assembled from them.

```bash
cd "../_tooling"
python3 build_dataset_ae.py     # UAE/assets/js/universities-data.js from the CAA registers
python3 localise_ae.py          # fragments-uae/ + this site's main.js and services-data.js
python3 assemble.py uae         # UAE/index.html
python3 build_unipage.py uae    # UAE/universities.html
python3 verify_site.py uae      # static checks
python3 check_twins.py uae      # what the localiser handed through unchanged (review list)
```

**Do not edit `index.html`, `universities.html`, `assets/js/main.js`,
`assets/js/services-data.js` or `assets/js/universities-data.js`.** Every one of
them is generated and the next build overwrites it. Edit `localise_ae.py` or
`build_dataset_ae.py` and re-run.

The content mapping — visa names, work rights, family rules, language tests,
money — is documented in `../_tooling/UAE_SPEC.md`. Read that before changing
any copy.

## Scope: Dubai-forward, UAE-wide

The hero, the photography and the marketing copy are Dubai. The directory,
the visa rules and the work rules are the UAE, because immigration is federal
and identical in all seven emirates. 51 of the 90 institutions are in Dubai, and
4 of the 12 QS-ranked universities, so the framing and the data agree.

Factual slots name the UAE; emotional slots name Dubai. That split is
deliberate — see the note at the top of `localise_ae.py`.

## The directory: 90 institutions, and why that is the right list

The **CAA** (Commission for Academic Accreditation, part of the UAE Ministry of
Education) licenses higher education institutions. A UAE student residence visa
is sponsored by the institution, and only a licensed institution can sponsor
one — so **the licence is the permission**, the same relationship CRICOS has in
Australia and EMGS has in Malaysia. Filtering to an active licence makes the
cards' hardcoded `Intl. Admits: Yes` true at the source rather than by
inference.

- register: **156** institutions, **102** with an active licence
- listed: **90**
- excluded: **12**, none of them on a judgement about quality:
  - **8** armed-forces and police colleges — Zayed Military University publishes
    "Applicants must be UAE nationals", and the register's own websites for these
    are `.mil.ae`, `.milnet.ae` and `dubaipolice.gov.ae`
  - **2** government-service academies with a published nationals-only rule (the
    Anwar Gargash Diplomatic Academy requires applicants to be UAE nationals or
    the children of an Emirati mother; the Emirates Academy for Identity &
    Citizenship is an in-service academy with no public admissions route)
  - **1** whose register entry itself reads *"ADMISSION OF NEW STUDENTS IS
    CURRENTLY SUSPENDED"* (Horizon University College)
  - **1** unverifiable — see below

The exclusion list is asserted in the builder, so a register update cannot
change it silently. This is the German Verwaltungshochschulen rule applied
again: being on an official register is not on its own a reason to list a place
a student cannot apply to.

## The one entry excluded as UNVERIFIED — re-check this

**Hamdan Bin Zayed College** (CAA GUID 1265, Abu Dhabi) is excluded because
nothing could be established about it either way: the register's website field
is the bare string `https:`, it has no accredited programme in the CAA
programme register, and no admissions route is findable. Listing it would assert
`Intl. Admits: Yes` about an institution with no evidence it admits anyone.

It is **not** excluded on quality, and it is the only judgement call in the set
that is not backed by a published fact. **Re-check it when caa.ae's register is
serving again** and either restore it or record the real reason.

## Both CAA captures are Internet Archive snapshots

`caa.ae` currently answers its own register pages with *"ERROR: Please try again
later or contact ccc.moe@moe.gov.ae"* — the institution list renders empty and
every detail page errors, in a real browser as well as with curl. So the two
registers are vendored under `../_tooling/reference/`:

| file | captured |
|---|---|
| `caa-licensed-institutions.json` | **2026-06-16** |
| `caa-accredited-programmes.json` | **2025-04-18** (the last full capture) |
| `khda-dubai-he-open-data.xlsx` | downloaded live from KHDA |

Re-run `build_dataset_ae.py` against the live site when it recovers. The
fourteen-month gap between the two CAA captures is the reason 20 institutions
carry `accredited: "n/a"` — they are overwhelmingly the branch campuses licensed
in Dubai during 2025-26, after the programme capture was taken.

## What is real data here, and what is not

**Real, off the regulators' own registers:**

- `accredited` — the institution's count of CAA-accredited programs. The UI
  labels it **"CAA accredited"**, never "Offer rate": it is not a selectivity
  figure. `"n/a"` where the programme capture predates the licence.
- `programs` — the institution's three largest subject areas: CAA's own
  programme disciplines ordered by number of accredited programs, or KHDA's
  Census 2024-2025 specialisations ordered by enrolment for the Dubai campuses
  CAA's programme capture misses. Seven institutions have neither and ship an
  empty string, which the card renders cleanly (the Malaysian page ships 108 of
  them).
- `rank` / `ranked` — QS World University Rankings 2027.
- `location` — the emirate from CAA; for Dubai, the free-zone district KHDA
  publishes (Dubai International Academic City, Dubai Knowledge Park, DIFC,
  Dubai Internet City, Dubai Silicon Oasis, Dubai Design District).
- `alt` — acronyms, the emirate, and **the register's own "(FORMERLY: ...)"
  notes**, so a student searching "Emirates Institute for Banking and Financial
  Studies" or "Al Ain University of Science & Technology" still finds the
  renamed institution.

**Editorial, and marked as such in the generated file's header:**

- `type` — the register publishes no institution category. The four values
  describe how an institution is constituted, not its quality: `Federal
  Institution` (the Ministry's three: UAEU, Zayed University, HCT),
  `International Branch Campus` (a foreign university's own UAE campus),
  `Government Institution` (established by the federal or an emirate
  government), `Private Institution` (the rest).

Note which institutions are deliberately **not** branch campuses: Canadian
University Dubai, the American University in Dubai, the American University in
the Emirates, the American University of Sharjah and the British University in
Dubai are each licensed in their own right and deliver a foreign curriculum —
none is a foreign university's campus. That distinction was wrong in the first
build and is now called out in the builder.

## Ranking: the first country in this set that needs no rebadging

QS 2027 covers **exactly 12** UAE universities, and the home-page carousel
renders **exactly 12** cards each with a hardcoded `Rank #N` badge. So every
badge is a real published position and nothing is rewritten — unlike New Zealand
(cards 9-12 carry an NZQA category) and Singapore (cards 5-12 rebadged).
`localise_ae.py` asserts that all twelve are `ranked: true`, so if a future
dataset pushes an unranked institution into the top twelve the build fails
rather than inventing a position.

## Country-specific build notes

- **Currency.** `swap_currency` is `'dirham'`. lucide has no dirham glyph, so
  the two decorative "Financial AID" markers take the currency-neutral
  `banknote` — the resolution Malaysia reached for the ringgit. A `$` would be
  as wrong here as on the UK page even though the dirham is pegged to the
  dollar. `services-data.js` ships the pound glyph inline, so `localise_ae.py`
  swaps that too and asserts no pound survives.
- **City image.** `uae-city.jpg`. Both the escaped Tailwind selector and the
  `url()` in `assets/css/main.css` were repointed from `malaysia-city.jpg`.
- **Spelling.** British `-ise`, American **`program`** — the convention the
  Australian and Singapore pages use. The CAA writes "Accredited Programs", so
  `programme` is a leak pattern; but `Centre` stays in "Dubai International
  Financial Centre" and "Trade Centre", which are proper nouns. Mixing the two
  inside one page is the actual defect, and `check_twins.py` will not catch it
  because the handed-through nodes are the British half.
- **The largest `allow` list of any country** in `verify_site.py`. Dubai's whole
  proposition is that other countries' universities teach there, so the register
  is full of institutions whose legal names carry a foreign nationality.
- **A `**` in the source data.** The CAA programme register contains a level
  written `**Diploma`. The builder asserts no `**` reaches any field, because
  `verify_site.py`'s markdown-leak rule would otherwise fail the build — and
  markdown does not render in HTML text nodes anyway.

## The three copy claims this page must never get wrong

1. **There is no work right attached to a student residence visa.** The UK
   fragment promises automatic term-time work at £12-£15/hr in five separate
   nodes. Work here needs a No Objection Certificate from the institution *and*
   a permit the **employer** obtains from MoHRE or the free zone. **No official
   weekly hour limit is published** for university students; secondary sources
   assert 15 and 20 hours and contradict each other, so **the page states no
   number**, and the chat tells a student to be sceptical of sites that quote
   one. `localise_ae.py` asserts the phrase "no automatic right to work"
   survives into `main.js`.
2. **There is no settlement.** The UK section is titled "Settle in the UK" and
   ends at Indefinite Leave to Remain. UAE residence is renewable, never
   permanent, and there is no naturalisation route for an ordinary graduate. The
   section is retitled "Build Your Life in the UAE" and the fourth step says so.
   `localise_ae.py` asserts "no settlement or citizenship route" survives into
   `services-data.js`.
3. **Duolingo is dropped.** It is not on the CAA's standard and not on the
   published accepted-test lists of the licensed institutions sampled. Ireland
   is the only page that names it (ISD accepts it) and Malaysia the only one
   that names it in the negative. There is no language test at the UAE visa
   stage at all — the CAA sets the minimum for **admission**: EmSAT Achieve
   English 1100 / TOEFL 500 (61 iBT) / IELTS 5.0 undergraduate, EmSAT 1400 /
   TOEFL 550 (79 iBT) / IELTS 6.0 graduate.

## Things a reviewer should check before launch

- **Hamdan Bin Zayed College** — the one unverified exclusion, above.
- **The programme capture is from April 2025.** 20 institutions show
  `accredited: "n/a"` and 7 show no subject areas as a direct result. Re-run
  the builder once caa.ae serves its register again and both numbers should
  shrink.
- **Tuition and living-cost figures are ranges**, from institutions' own fee
  schedules and published cost-of-living surveys, not from one authority.
  `UAE_SPEC.md` §5 lists them; confirm they are still current at launch.
- **`type` is editorial.** Skim the 90 values, particularly the
  Government/Private split for Emirates Aviation University (owned by the
  government-owned Emirates Group) and the American University of Sharjah
  (private non-profit, founded by the Ruler of Sharjah).
- The enquiry form needs `RESEND_API_KEY` in the deployment environment — see
  `../_tooling/ENQUIRY_SETUP.md`.

## v23: black and gold (22 Oct 2026)
- Whole page restyled (the client found every section except the seven-emirates slide boring). Kept: the desert hero photograph and its sinking title, the seven-emirates slice tour, all content, forms, finder and integrations.
- Colour: true black with gold (#d4b26a) and warm white (#f6f3ec) text; a few light surfaces (enquiry form, English checker, residence note, passport pages, dialogs) keep dark ink. Contrast: body 19:1, soft text 9.4:1, gold 10.4:1, button text 10.4:1.
- Type: Bodoni Moda (headings, self-hosted variable font) and Instrument Sans (text and controls). No italic accent words; capitals labels set in sentence case.
- Hero to city: the gilded opening (a gold line draws across the horizon and the desert parts top and bottom), replacing the sand curtain.
- New details: a faint gold mashrabiya lattice behind four dark chapters, drifting slower than the page (`initLattice()`); services as a concierge menu with a gold rule under the open item; universities as dark cards with a gold QS seal; the seven admissions steps on a gold thread that fills as you read; black-and-gold passport.
- Footer links have 44px tap rows on touch screens.
- Plugins used: frontend-design (plan and anti-default review), ui-ux-pro-max (palette and font-pairing search; its luxury results pointed to black + gold and a Didone + clean sans), design:design-critique and VectorLab ux-audit (section-by-section critique), hzblj css-animations (transform/opacity only, reduced motion), taste-skill (lint 0 FAIL; inspect flags remaining are deliberate: seven-emirates numbering and labels, pinned text over photos), playwright-cli (console, reduced motion, phone overflow, forced colours). Not usable here: Superdesign, MagicPath and 21st (their servers are blocked by the network allowlist; MagicPath also needs a login), serena (not connected to this session), vaadin-skills (Java/Vaadin only), skill-creator (for making skills).

## v24: sand and bronze (22 Oct 2026)
- Client asked for a lighter overall theme and chose "Sand & bronze". Reading chapters alternate warm sand (#f3ebdd), paper (#fbf8f2) and deeper sand (#eadfcb) with espresso text (#2a2118, 13:1) and bronze accents and buttons (#7a4f24, 5.4–6:1 on sand; paper text on bronze 6.7:1).
- The photographic moments stay dark espresso (#241a12) with gold (#d9b878): the two slides, reviews, the enquiry over the dunes, the footer, and the small dark inserts (earn-while-you-learn, English-checker intro, the 2021 family figure).
- The passport sits on a sand desk with an espresso cover and gold foil; the lattice is bronze on sand.
- Fonts, layout and motion unchanged from v23 (Bodoni Moda + Instrument Sans; gilded opening; seven-emirates tour).

## v25: the city rises from the dunes (22 Oct 2026)
- Replaces the gilded opening. After "Study in Dubai" sinks, the night city floods up from below the screen with the exact shape of the dune crest, then that edge reshapes, column by column (centre first), into the traced outline of Downtown Dubai's real towers: the skyline grows out of the sand into the golden desert sky, traced by a glowing gold line. The night city is scaled so its Burj Khalifa stands exactly on the hazy Burj in the desert photograph. Then the desert sky fades to dusk and "From the dunes, into the city." rises in.
- Both outlines were traced from the photographs (dune crest from the hero cut-out's alpha, skyline from a sky mask of the city photo; 400 samples each) and ship as data on the SVG (`data-rise`). uae.js maps them through object-fit: cover for any screen, then writes a clip-path polygon on the hero and the gold polyline (transform-free; median frame 16.7 ms).
- Pinned stage now 960svh (940 on phones). Reduced motion and no JS: unchanged plain sections.

## v26: lighter rise (23 Oct 2026)
- The client found v25 "heavy". Same idea, lighter execution: about one screen from dunes to city instead of two (rise 0.3–0.6, towers grow 0.6–1.1, desert sky fades to dusk 0.85–1.2 while the towers finish, so there is no hold on a double skyline); no glow (the blurred SVG glow repainted every frame), a single 1.2px warm-white line at 80% that fades as the towers settle; gentler centre-first stagger; 96 outline columns instead of 140. Pinned stage 845svh (825 on phones).

## v27: window seat (23 Oct 2026)
- Replaces "the city rises from the dunes" (the client found it heavy). After "Study in Dubai" sinks, the desert photograph closes into an aircraft window floating on sand (a rounded inset clip with a paper-white frame and a soft shadow), "Next stop, Dubai." and "A four-hour flight from home." appear either side (above and below on phones), the view inside the window turns from desert to Dubai at night, and the window opens out into the city slide. Only a clip and opacities change; about one screen of scroll. Pinned stage 860svh (840 on phones).

## v28: the Germany page's type (23 Oct 2026)
- Headings now use Fraunces exactly as the Germany page does: weight 340, optical size 144, SOFT 20, tracking -0.025em, with the closing words of a heading in a soft italic (weight 300, SOFT 100) in the accent colour (bronze on sand, gold on dark). Text and buttons in Manrope (400–700). Self-hosted: `fraunces-latin-full-normal/italic.woff2` (variable: weight, opsz, SOFT, WONK; from @fontsource-variable/fraunces, SIL OFL) and the existing Manrope files. The Germany page was only read, not changed.

## v29 — real cabin window
- The window-seat transition now uses your aircraft-window photo, upscaled 4x (Real-ESRGAN) and exported at 1000/1800/2400px (`assets/img/uae/cabin-frame-*.webp` with the glass cut out, `cabin-sky-*.webp` for the clouds).
- Scroll: the camera pulls back from the desert into the cabin window, clouds drift past the glass, Dubai at night appears, then the camera flies forward through the window into the city. Only a scale, a polygon clip and opacity change.
- Captions are now light text on the blue cabin wall; header switches to light text once the cabin is in view.
- Tests: test11 all passed (desktop, 390px, 768px, reduced motion, no-JS, form flows with mocked API).

## v30 — big window, city in the glass, smoother scroll
- The cabin window is now large, like sitting at the seat: the frame fills the screen height on desktop and the width on phones.
- Fixed a v29 bug where the wall colour covered the glass after the clouds (the city did not show through the window).
- Through the glass: a short pass through cloud, then the next slide, Dubai at night, drifting slowly as if from a moving plane, then we fly through the window into it.
- The whole pinned stage (hero, window, city, seven emirates) now eases after the scroll position instead of jumping with each wheel step.
- Tests: test11 all passed; scroll frame time median 16.7 ms on desktop and phone.

## v31 — clean window cut, no clouds
- The glass is now cut right up to the inner trim of the window frame (refitted shape), so no blue sky from the photo shows at the edges or corners.
- Removed the cloud pass: the desert dissolves straight into Dubai at night inside the window (0.72–0.95 screens).
- `cabin-sky-*.webp` are no longer used.
- Tests: test11 all passed.

## v32 — no white wash leaving the Dubai slide
- The Dubai city slide no longer fades to the sand background as you scroll on; it stays fully visible until the seven-emirates slide has faded in over it, so the change is dark-to-dark.
- The big swelling "From the dunes, into the city." headline now fades out early, before its letters grow large enough to haze the photo.
- Only `assets/js/uae.js` changed. Tests: test11 all passed.

## v33 — no emirate names on the photo slices
- Removed the vertical emirate names (Abu Dhabi, Dubai, Sharjah…) from the seven slices of every photo in the seven-emirates tour.
- Changed: `index.html`, and `assets/css/uae.css` (the section now clips its own overflow, which the pattern layer used to do). Tests: test11 all passed (window-seat checks now wait 700 ms for the eased scroll).

## v34 — realistic passport cover
- The "Choose your emirate" passport now has a navy leather cover (generated grain texture `assets/img/uae/pp-leather-navy.webp`) with pressed gold foil, laid out like a real passport: Arabic and English lines at the top, a large emblem, the title in Arabic and English, and the e-passport chip mark.
- The emblem is our own (a ring of seven stars for the seven emirates around a compass star), not the UAE coat of arms, and the cover says "Student Passport" / "جواز الطالب", not an official passport title.
- Arabic set in Amiri (OFL), subset to just these words: `assets/fonts/amiri-pp-700.woff2` (18 KB).
- Tabs and inside covers are navy to match.
- Tests: test11 all passed.

## v35 — hero headline spacing
- "Study in Dubai": the letters and words were crammed together (spacing tuned for the old Bodoni font), so "Study" ran into "in" and the "y" tail hit "Dubai". Now normal letter and word spacing, a little more line height, and room for the descender.
- Only `assets/css/uae.css` changed. Tests: test11 all passed.

## v36 — full Burj Khalifa on the city slide
- The Dubai night photo is now anchored to its top edge (`object-position: 42% 0%`), so the whole Burj Khalifa, spire included, stays in frame on wide screens and phones; any cropping now comes off the roads at the bottom.
- Only `assets/css/uae.css` changed. Tests: test11 all passed.

## v37 — passport photo hover card
- Hovering a photograph pinned in the passport (Dubai and Abu Dhabi spreads) opens a medium card beside it: the photo larger, "In this photo · <emirate>", the place name and a short description (Dubai Marina; Qasr Al Watan with Etihad Towers).
- The photo lifts and straightens on hover. Mouse/trackpad only; touch screens are unchanged. Reduced motion: no animation.
- Changed: `index.html`, `assets/css/uae.css`, `assets/js/uae.js` (new `initPhotoPop`). Tests: test11 all passed.

## v38 — bigger, interactive photo card; click the stamp to re-stamp
- Passport photo hover: the print tilts toward the cursor and lifts; a large card (up to 720px) opens beside it with the photo big and panning as you move over the print, the place name over the image, coordinates badge, description, Emirate / Near facts, and a mini UAE map with the emirate filled and a pulsing pin.
- Click an entry stamp to press it again: it lifts off and lands at a slightly new angle.
- Hover and stamp clicks are matched by position (hit-testing inside the 3D book was unreliable). Mouse/trackpad only for the card; reduced motion: no tilt, pan or animation.
- Changed: `index.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v39 — photo card centred
- The passport photo card now opens in the centre of the screen, growing out of the photo, with the page dimmed behind it (up to 760px wide).
- Changed: `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v40 — a photo on every passport page
- Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah now have the user's photos pinned on their visa pages (replacing the institution-count cards; the counts stay on the left pages), each with the hover card: Sharjah waterfront, Ajman Corniche, the sailfish roundabout (UAQ), Al Marjan Island (RAK), the falcon roundabout (Fujairah).
- HD: each photo upscaled with Real-ESRGAN, blended with Lanczos and sharpened, exported at 2000px (`after-<emirate>.webp`, used in the big card) and 1000px (`after-<emirate>-1000.webp`, the small print).
- Changed: `index.html`, `assets/js/uae.js` (card loads `data-hd`), 10 new images. Tests: test11 all passed.

## v41 — "Six nations' campuses, one city." as an arrivals board
- Six country tabs (GB, AU, US, FR, IT, IN, with campus counts). Click, hover (mouse) or arrow keys pick one, and its Dubai branch campuses flip onto a dark airport-style arrivals board, row by row, with each campus's district.
- 26 campuses, names and districts taken from the CAA-licensed dataset (`why_block.py`; the build fails if a name drifts). Only clear-cut home countries are listed.
- The four reasons are now numbered cards that lift on hover.
- Accessible tabs (role=tablist, aria-selected, arrow/Home/End keys). Reduced motion: no flip.
- Changed: `index.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initWhyBoard`). Tests: test11 all passed.

## v42 — background pattern a little stronger
- The star-lattice pattern behind sections is more visible: opacity 0.11 → 0.2 on light sections, 0.14 → 0.22 on dark ones. Only `assets/css/uae.css` changed. Tests: test11 all passed.

## v43 — services as a flight route with boarding passes
- "Nine services, one counsellor." is now a route map: the nine services are numbered stops on a dashed flight path from home to the UAE. Pick a stop (click, arrow keys, or the ← / → buttons) and a plane flies there along the route, inking the path behind it; that service's boarding pass slides in.
- Each boarding pass: From Home → To UAE, service title, tagline, full description, and a tear-off stub (stop number, code, class, seat, barcode, "Request this service" — still sets the enquiry form's destination).
- Phones: the route becomes a swipeable row of stops. No JS: all nine passes listed. Reduced motion: no flight or slide.
- Changed: `index.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initRoute`). test11 updated for the new section; all passed.

## v44 — services fit on one screen
- The whole services section (heading, route, boarding pass) now fits in one screen: the consultation button moved up beside the 99% figure, the ← / → controls sit on the route's header line, the route is flatter, the pass header is one line (Boarding pass · Service 05 / 09 … Home ✈ UAE) and the description runs in two columns.
- Measured section heights: 788px at 1903×940, 775px at 1440×900, 641px at 1366×768 (smaller type on short laptop screens), 658px at 1280×800 — all within the visible area below the header.
- Fixed the 99% figure styling. Tests: test11 all passed.

## v45 — no pattern behind the services
- Removed the star-lattice watermark from the "Nine services, one counsellor." section (data-lattice taken off #services). Changed: `index.html`, and `assets/css/uae.css` (the section now clips its own overflow, which the pattern layer used to do). Tests: test11 all passed.

## v46 — route stops respond to hover
- With a mouse, resting on a stop on the services route (its number or its title) flies the plane there and opens that boarding pass, after a 140 ms pause so passing over stops does not trigger them. Click and keyboard still work; touch screens unchanged.
- Changed: `assets/js/uae.js`, `assets/css/uae.css`. Tests: test11 all passed.

## v47 — top twelve on the main page, a new directory page
- Main page "Universities" is now "The UAE's top universities": the 12 in the QS World University Rankings 2027 as a ranked list beside a dark stage. Hover (or focus) a name and it takes the stage: big QS rank, name, emirate, type, subject areas and a pulsing pin on a UAE map. Click opens the detail dialog. Below: a big "Explore all 90 licensed universities" card and emirate shortcuts (Dubai 51 … Umm Al Quwain 1) that open the directory filtered.
- New `universities.html` (replaces the old-design page, same header, footer and dialog as the main page): breadcrumb, "Every licensed university in the UAE.", live stats (90 / 12 / 41 branch campuses / 7), a large search box, an "All universities / Top universities · QS 2027" switch, subject and type filters, a sticky "Pick an emirate" panel with a clickable UAE map plus bars showing each emirate's count, results grid, show more, and an "Ask a counsellor" band.
- Filters live in the URL (`?uni_emirate=Dubai`, `uni_q`, …), so "See Dubai universities" in the passport and the emirate shortcuts land pre-filtered. "Enquire about this university" from the directory carries the choice to the main page's form (`index.html?dest=…#contact`).
- Single-file versions: `tutee-uae-site.html` and `tutee-uae-universities.html`, linked to each other (keep them in the same folder).
- Changed: `index.html`, new `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initUniDialog`, `initTop`, finder map/switch). test11 updated (top twelve, directory filters, map, switch, cross-page enquiry, phone, no-JS); all passed.

## v48 — sparkle background pattern
- The star-lattice background pattern is replaced by the user's four-point sparkle: large and small copper sparkles in a staggered grid (copper gradient #e2ad74 → #c88b55, opacity 0.34 on light sections, 0.26 on dark). Only `assets/css/uae.css` changed. Tests: test11 all passed.

## v49 — one single file
- `tutee-uae-site.html` now contains both pages. The university directory rides inside it as a second view: "Explore all universities", the emirate shortcuts and the passport's "See … universities" open it (`#directory`, `#directory?uni_emirate=Dubai`), and the breadcrumb, header links and "Enquire" go back to the main page (the enquiry keeps the chosen university). Works from a downloaded file (file://) as well as a server.
- `tutee-uae-universities.html` is no longer needed; it can be deleted.
- The website folder (`index.html` + `universities.html`) is unchanged in behaviour; only a small label fix in `universities.html`. Tests: test11 all passed; single-file routing checked over http and file://.

## v50 — "From first call to Emirates ID" as a residence file
- Fixed: the step number now stays on screen while you scroll (the background-pattern layer used overflow:hidden, which stopped it sticking; now overflow:clip).
- Left, pinned: a "Your residence file" card. The big number rolls like a meter to each step, the current step's name slides in, a 7-item checklist ticks off as you pass each step (click an item to jump to it), a progress strip fills along the top, and at the end the status turns "Complete" and an "Approved · Emirates ID" stamp lands.
- Right: the route line fills continuously with a glowing marker; the current step lifts onto a paper card, finished steps keep a filled dot.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v51 — English checker as a score dial
- Right: program switch, the four tests as ticket buttons, and a dial. Type a score or drag the slider; the needle swings round, the arc fills (green when it clears, rust when short), a gold notch marks the CAA minimum for the chosen program and test, and a stamp lands: "Cleared" or "<gap> to go". The written verdict stays below.
- Left: the CAA minimums as a scoreboard, with the current test's row lit and the relevant minimum highlighted.
- Same minimums, ranges and verdict wording as before. Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v52 — funding section: moving lender belt, grant voucher, loan card
- The 10 lending-partner logos now run across the full width in two belts moving in opposite directions (seamless loop, faded edges). Hovering pauses the belt and lifts the logo. Reduced motion: a static wrap of the logos.
- "Scholarships & grants" is a dashed voucher card with a big "up to 100% of tuition" figure (from the existing copy) and the three numbered offers.
- "Education loans" is a dark card with a gold education-loan "bank card" that tilts and catches the light as the cursor moves.
- The NOC quote sits beside them. Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initFund`). Tests: test11 all passed.
- English checker: a hint above the slider ("👆 Drag or swipe the slider to set your score, or type it in above", with a moving hand that settles once used), the slider glows twice to draw the eye, and the lowest and highest score for the chosen test sit at its ends.
- Lender logos load straight away so the moving belt never shows empty tiles.

## v53 — "Build your life in the UAE" as a staircase of residence cards
- The four residences are ID-style cards climbing a staircase with a dotted path: Student Residence Visa (sand), Green Residence (green), Employment Residence Visa (navy), Golden Residence (gold). Each card shows when it applies, what it is, how long it lasts (renewed yearly / 5 years / with your job / 10 years) and who sponsors it (your institution / yourself / your employer / yourself plus family), all from the existing copy.
- The cards rise into place one by one when the section scrolls in; hovering or focusing a card lifts and tilts it and dims the others. Phones: two columns, then one. Reduced motion: no rise.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initRes`). Tests: test11 all passed.

## v54 — one logo belt; interactive "Earn while you learn"
- Lending partners: a single moving row of logos (the second, reverse row removed).
- "Earn while you learn": the four rules are now expanding panels. One panel is open (gold, with its full text); hovering or clicking another opens it and the rest fold to slim panels with vertical titles and icons. On phones they stack, and tapping opens one. A slowly turning "0% income tax · every dirham is yours" seal sits by the button. Same wording as before.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initEarn`). Tests: test11 all passed.

## v55 — residence cards: hover fix, stair steps
- The other cards now dim only while the pointer is actually on a card (before, empty space around them and a clicked card kept them dimmed).
- The dotted path behind the cards is gone; each card now stands on its own step, so the four make a staircase. Only `assets/css/uae.css` changed. Tests: test11 all passed.

## v56 — score slider: hint returns at 0, Reset button
- Dragging the slider back to the lowest score brings the "Drag or swipe the slider" hint (and its moving hand) back to life.
- A Reset button appears under the slider once a score is set; it clears the score, puts the slider back at the start and shows the hint again.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v57 — "Life between lectures": the arch becomes a window onto each fact
- The four facts are now selectable cards with icons. Hover (or tap / focus) one and a small live card appears inside the arch photo:
  - Tax-free earnings → a payslip: "Your pay 100% yours", "Income tax AED 0.00".
  - A pegged dirham → "1 USD = 3.6725 AED", fixed to the US dollar since 1997 (the official peg).
  - A four-hour flight home → a plane flies a dotted arc DXB → India, "about 4 hours".
  - Set up in your first week → accommodation, bank account, Nol card, health insurance tick off one by one.
- The arch photo drifts gently with the mouse. Phones: "Tap each one". Same wording for the facts.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initLife`). Tests: test11 all passed.

## v58 — passport pages that feel like paper
- Every page now has paper grain, a warm edge vignette and a faint watermark (the seven-star emblem) under the security pattern.
- A deep gutter shadow where the pages meet the spine.
- Page stacks show at the fore-edges, so the book has thickness.
- While a page turns it bows slightly, its face darkens and catches a highlight as it lifts, and it casts a moving shadow on the page underneath.
- Photos are held on with a strip of tape; the stamps have an inked, slightly broken texture.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v59 — new photo in "Life between lectures"
- The arch now shows the user's reading-room photo (students at desks under a domed, book-lined hall), upscaled with Real-ESRGAN to 1800x2400: `assets/img/uae/life-library.webp`. Caption "Study hours" (the photo is not tagged with a UAE location).
- Changed: `index.html`, `universities.html`, new image. Tests: test11 all passed.

## v60 — "Relocating with your family?" as a family-file builder
- Choose "Studying" or "Employed", then add a partner, children under 18 and children 18 or over with +/− buttons. Each person walks into a drawn house under the big 2021 on the left.
- A "Your family file" checklist builds from our existing guidance: the number of dependant visas, suitable housing (Ejari-registered tenancy in Dubai), one medical test for every relative over 18, documentation, and, for Employment Residence Visa holders' adult dependants, their own permit to work.
- No-JS keeps the original three-point list. Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initFamily`). Tests: test11 all passed.

## v61 — family as a fan of residence cards
- The drawn house and figures are replaced by a fanned hand of residence cards: your gold sponsor card (Student or Employment Residence Visa, follows the switch) and one dependant card per family member (green partner, sand child under 18, navy child 18+ with "medical test"). Cards fly in when added and drop away when removed.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v62 — reviews as a deck of cards with the people behind them
- Each review sits on a paper card on top of a small deck; changing review deals the next card in and shuffles the ones behind.
- Below, a row of monograms (one per reviewer); the active one opens to show name and role, and its ring fills over 8 seconds before the next review comes up on its own. Hover or focus pauses it; it only runs while the section is on screen.
- Click a person, the arrows, keyboard arrows or swipe on phones. Reduced motion: no autoplay or deal animation. Same nine reviews.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v63 — "Ask us anything": the Tutee Connect desk (new section + floating chat)
- New section before the FAQ: popular-question chips on the left, a chat window on the right (typing dots, answers type out, action buttons such as "Try the score dial", "See Sharjah universities", "Ask on WhatsApp"), three follow-up suggestions after each answer, and a text box.
- A floating "Ask us" button (above WhatsApp) opens the same chat as a panel anywhere on the page; it hides while the chat section is on screen. Esc closes it.
- Answers come only from this page: the FAQ, the nine services, the visa route, CAA English minimums, work, family, residence pathway, scholarships, loans and lenders, fees policy, life facts, contact details (new `assets/js/chat-kb.js`, generated by the build), plus the 90-university directory: name lookups ("Is Heriot-Watt licensed?"), emirate counts ("How many universities in Sharjah?") and score checks ("IELTS 5.5 for masters?"). Anything it can't match goes to WhatsApp / the enquiry form; nothing is invented and nothing is sent anywhere.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initAsk`), new `assets/js/chat-kb.js`. Tests: test11 all passed (two new chat checks); single file checked from file://.

## v64 — "New chat" reset in the chat
- A "↺ New chat" button appears in the chat header after the first question; it clears the conversation back to the greeting, resets the suggestions and puts the cursor in the box. A reply still typing when you reset is dropped. Works in the section and the floating panel.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v65 — FAQ moved into the chat section
- The separate "Frequently asked questions" slide is gone. The seven FAQ questions are now tappable buttons inside the chat greeting ("Frequently asked"), followed by five more ("More to ask"); tapping one asks it.
- The FAQ answers also sit on the left of the chat section as an open/close list, so the text stays on the page for search engines and works without JavaScript. Header/menu "FAQ" links now go to this section.
- After a reset the chat goes back to the greeting with these questions, scrolled to the top.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`, `assets/js/chat-kb.js`. Tests: test11 all passed.

## v66 — "Ask us anything" fits one screen
- Tighter section padding, smaller heading and lede, compact FAQ rows (smaller text and buttons), and the chat window now stretches to the same height as the left column, so there is no empty space under it. Measured section heights: 854px at 1903x1073, 792px at 1440x900, 761px at 1366x768.
- Only `assets/css/uae.css` changed. Tests: test11 all passed.

## v67 — enquiry section with a gold student-profile card
- Beside the form, a gold card in the style of a UAE residence card (our own seven-star emblem and wording, "Student profile", not the UAE coat of arms or an official visa card). It fills in live as the visitor types (name, phone with country code, email, and the route if they came from an "Enquire about…" button), shows "Fill in your details" / "Ready to submit", tilts toward the cursor with a moving light, and flips over to "Profile received — Thank you, <name>" when the form submits successfully.
- The form, its fields and the /api/enquiry contract are unchanged. Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initCard`). Tests: test11 all passed.

## v68 — the gold card is the form
- The separate white "Book your free counselling call" box is removed. Visitors type directly on the gold Student Profile card: engraved Holder name, Phone (country code + number), Email, the route line (with "Change" when they came from an "Enquire about…" button) and a dark "Submit profile" button on the card.
- The stamp counts progress ("Fill in your details" → "1 of 3 filled" → "Ready to submit") with a small thud, and a light sweeps across the card when it becomes ready. The card tilts gently with the mouse and lies flat while a field has focus. Validation messages appear as small tags under each field.
- On a successful submit the card flips to "Profile received — Thank you, <name>"; tapping the card or focusing a field flips it back (auto after 8 s).
- Same field names, ids, hidden fields, honeypot and /api/enquiry JSON as before. Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initCard`). Tests: test11 all passed.

## v69 — chat starts with topic tiles
- The greeting no longer lists every question as chips. It shows six topic tiles (Visa & admission, Universities, English scores, Fees & funding, Family & living, Work & after) with line icons; hover fills a tile gold with a light sweep. A tile opens a numbered list of its three questions ("← All topics" goes back).
- Type-ahead: as you type, up to three matching questions appear above the box ("Matching"); tap one to ask it.
- New questions answered from existing page logic: "How many universities are in Sharjah?", "Is IELTS 5.5 enough for a bachelor's?", "Is TOEFL 85 enough for a master's?".
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initAsk`), `assets/js/chat-kb.js`. Tests: test11 all passed.

## v70 — back-to-top fix + new dropdowns
- Logo links (header and the footer logo, now a link too) glide back to the hero. The browser's own long smooth scroll was being cut short by sections on the way (it stopped around the seven emirates); the page now drives the scroll frame by frame (`initHome`). Wheel/touch/key stops it; reduced motion jumps instantly. In the single file, the directory view still returns home as before.
- Every `<select>` (directory: emirate, subject, type; enquiry card: country code) is now a custom dropdown (`initPickers`): rounded trigger with a rotating chevron and a "filter set" dot, a floating panel with search for long lists, gold tick and side bar on the chosen option, keyboard support (arrows, Home/End, Enter, Esc, type-to-jump). Country codes show code + country name (searchable, e.g. "india"). The native select stays hidden in the form, so values, filters and the enquiry payload are unchanged.
- FAQ accordion → numbered cards (01–07) that open into espresso with a smooth height animation and a + that turns into ×.
- Changed: `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v71 — top universities fit one screen
- The chapter was ~1740px tall at 1903×940; it now fills one screen (≈862px under the header). Heading on one line with the intro beside it; the #rank stage card on the left; the twelve universities in two aligned columns of six (name with the emirate under it, equal row heights); "Explore all 90 licensed universities" and the emirate chips (one row) under the list.
- Changed: `index.html` (list and footer wrapped in `.top-side`), `assets/css/uae.css`. Tests: test11 all passed.

## v72 — journey fits one screen, plane instead of the dot
- Desktop (≥1101px): "From first call to Emirates ID" now fits one screen. The seven steps are compact rows on a route line; one step is open at a time with its text and tag. Hover, click, keyboard (Tab / ↑ ↓) or the residence file's checklist opens a step; while the section is in view and untouched it advances every ~4 s, and stops as soon as the visitor interacts.
- The glowing gold dot is gone: a small bronze plane flies down the route to the open step (turns green at the last step, when the file shows "Complete" and the approval stamp). Done steps get filled markers and the line fills behind the plane.
- Phones keep the existing scrolling list.
- Changed: `index.html` (step text wrapped in `.jr-more`, plane element), `assets/css/uae.css`, `assets/js/uae.js` (`initJourneyFit`; the old scroll tracker skips desktop). Tests: updated the journey checks (follows the chosen step, fits one screen, plane on the open step); test11 all passed.

## v73 — bank slide fits one screen
- Desktop: "Your Dubai dream shouldn't break the bank." on one line with the intro beside it; slimmer lender belt (smaller logo tiles); compact scholarship card (100% beside its caption, tighter list) and loan card (smaller gold card, text on one line); quote beside them. Heading → cards now end at ~780px on 1903×940 (was ~1280px). Extra trim for short screens (≤860px tall). "Earn while you learn" follows as its own block with more space above it.
- Changed: `assets/css/uae.css` only (index.html/universities.html rebuilt unchanged in content). Tests: test11 all passed.

## v74 — residence slide fits one screen
- Desktop: "Build your life in the UAE." on one line with the intro beside it; the four residence cards are now equal height on evenly rising steps (pedestals line up on one base); 99% figure and the "Plainly" note in one slim row underneath. Whole section ≈777px tall on 1903×940 (was ≈1364px).
- Changed: `assets/css/uae.css` only. Tests: test11 all passed.

## v75 — review slide pattern
- The copper sparkle background pattern now covers the whole "What our Dubai students say" slide (it was faded out except the bottom-left corner), at a softer strength so the review card stays easy to read.
- Changed: `assets/css/uae.css` only. Tests: test11 all passed.

## v76 — every CTA on one interactive system
- All 28 calls to action (header, hero, passport, services, boarding passes, universities, English test, scholarships, loans, earnings, family, enquiry submit) now share one style: sentence-case label + round arrow dot. Hover: a fill blooms from where the cursor enters, the arrow slides out and a new one slides in, the button lifts with a soft glow, a light sweep passes, and it is gently pulled toward the pointer. Press: a ripple from the tap point. Primary CTAs (Free counselling, Book free counselling, Request a free consultation, Submit profile) catch the light every few seconds and their arrow dot pulses.
- Hover colours are matched to each button (bronze buttons fill gold, gold buttons fill espresso, outline buttons fill gold; the card's Submit fills bronze). The directory banner gets a cursor glow. Reduced motion: no pull, ripple, gleam or pulse.
- Changed: `assets/css/uae.css`, `assets/js/uae.js` (`initCtas`). Tests: test11 all passed (one review-autoplay check is timing-sensitive and passed on rerun).

## v77 — services become the counsellor dial
- "Nine services, one counsellor" is now literal: a dark "Your counsellor" medallion in the centre with the nine services orbiting it as icon nodes (numbered badges). Choosing a service (tap, hover, ← → buttons, arrow keys, or dragging the dial round) spins the dial so that service lands at three o'clock, glowing gold, and a moving dotted beam connects it to its card on the right. The centre shows the service number and name; a small plane circles the outer ring. Until the visitor touches it, the dial turns to the next service every 5 s while on screen.
- Card: service number + code, title, tagline, full description (scrolls inside the card for the longer services so the slide stays one screen), "Free first call" note and "Request this service" (still sets the enquiry destination).
- Replaces the route map + boarding passes. Phones: dial on top, card below. No-JS: all nine cards listed. Reduced motion: no spin animation, plane or beam movement.
- Changed: build (`build5.py` → ORB_NODES/ORB_PANELS), `index.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initOrb`). Tests: services checks rewritten for the dial; test11 all passed.

## v78 — services slide fitted to one screen
- Desktop: the section is exactly one screen tall (under the header) with the content centred. Heading on one line with the intro sentence under it; 99% figure and "Request a free consultation" on the right of the same row; dial sized to the screen height (max 480px) so dial, hint and card all sit inside the slide; card height matches the dial.
- Changed: `index.html` (intro also under the heading), `assets/css/uae.css`. Tests: test11 all passed.
- Fix: hovering no longer picks a service while the dial is still turning (a node sliding under a resting cursor used to set off a chain of spins). `assets/js/uae.js` changed too.

## v79 — dial name tags + journey route line
- Services dial: a hovered service name tag now sits outside the dial, pointing away from the centre, above everything (it used to slide under the counsellor medallion and get cut off).
- Journey: the route line now starts at the first step and ends exactly at the last (it used to run past the last step to the bottom), the filled part grows to the plane, and every marker and the plane sit on the step title line.
- Changed: `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v80 — arrows centred in every CTA
- The arrow inside each CTA circle is now exactly centred (checked on all 19 visible CTA circles: 0 px offset). The arrow glyph itself was drawn off-centre in its box and the two sliding arrows were laid out in a row; now each arrow is absolutely centred, and on hover one slides out right while the next slides in from the left to the same centre point. All other arrow icons on the page (directory banner, prev/next buttons) use the same centred glyph.
- Changed: build arrow constants, `index.html`, `universities.html`, `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v81 — hero desert visual cleaned
- Photo: removed the glowing orange dots and dark smudges on the dune ridge in front of the skyline (small-blob inpainting only on that strip; the rest of the photo is untouched). All four hero files regenerated (back + front cut-out, 1600 and 3072).
- Headline: as you scroll, "Study in Dubai" now lifts away and fades instead of sinking into the desert; the cut-out horizon is flat on the right, so sinking cut the letters with a straight line.
- Changed: `assets/img/uae/hero-desert-*.webp`, `assets/css/uae.css`. Tests: hero check updated (lifts and fades, no zoom); test11 all passed.

## v82 — new HD hero photograph
- The hero now uses the photograph the user supplied (golden-hour Dubai skyline with the Burj Khalifa beyond the dunes), upscaled 4x with Real-ESRGAN, blended 70/30 with a Lanczos resize and lightly sharpened, delivered at 3072x2048 and 1600x1066.
- Framed to show the full Burj Khalifa to its spire (focus 48% 24%); "Dubai" sits on the skyline (crest 0.47). Lighter scrim so the golden dunes keep their colour (darkened only behind the text, bottom-left). Photo credit moved from beside the headline to the bottom right, fading out as soon as you scroll. The cut-out front layer is no longer needed (headline lifts away on scroll), so those two files are now transparent placeholders.
- Changed: `assets/img/uae/hero-desert-*.webp`, `index.html`, `assets/css/uae.css`. Tests: test11 all passed.

## v83 — photos in the four reason cards
- The four "Why the UAE" cards now carry a photo behind the title with a dark fade, hover zoom and the bronze rule running across. Temporary photos (already on the site): Dubai Marina, Downtown Dubai, Abu Dhabi corniche, Sharjah Al Qasba. Replace with campus / graduation / classroom / lab photos when available (each `<img>` in `.why--cards`).
- Changed: `index.html`, `assets/css/uae.css`. Tests: test11 all passed.

## v84 — reason-card photos from the user
- The four cards now use the user-supplied photos, upscaled with Real-ESRGAN, blended and lightly sharpened, cropped 6:5 and saved at 1200 and 640 px (`assets/img/uae/wc-library|grad|pass|talk-*.webp`, with srcset): 01 library reading room, 02 graduation caps and confetti, 03 students holding passports from many countries, 04 a seminar with a presenter.
- Note: the library looks like the Rose Main Reading Room, New York Public Library (not UAE); confirm licences for all four.
- Changed: `index.html`, new images. Tests: test11 all passed.

## v85 — services slide spacing
- Removed the empty band above "Nine services, one counsellor" (content now starts just under the header instead of being centred in a tall box); the dial is larger (up to 560px) and the service card matches its height; card text now uses the full card width (was capped at 66 characters, leaving an empty strip on the right), so more of each description shows before scrolling.
- Changed: `assets/css/uae.css`. Tests: test11 all passed.

## v86 — flag removed from the Sharjah wheel
- The UAE flag on the hub of the Eye of the Emirates wheel (Sharjah photo, passport page) is replaced with a plain steel hub. `assets/img/uae/em-sharjah-1000.webp` and `-2000.webp` changed; nothing else.

## v87 — enquiry background: the road to Dubai
- The enquiry section background is now the user-supplied photo of the desert road leading to the Dubai skyline (Burj Khalifa, Burj Al Arab), upscaled 4x with Real-ESRGAN, blended and sharpened, at 3200 and 1600 px (`contact-road-*.webp`, srcset). Scrim darkens the left (copy) and the bottom (office details) so text stays readable while the skyline and road keep their gold glow.
- Changed: `index.html`, `assets/css/uae.css`, new images. Tests: test11 all passed.

## v88 — passport without scroll lock
- The passport section is now one screen tall and no longer locks the scroll. The cover opens by itself when the passport comes into view (or when hovered). Hovering a thumb tab (DXB, AUH, SHJ, AJM, UAQ, RAK, FUJ) turns the pages to that emirate, riffling through the pages in between; clicking and arrow keys work too. Hint reads "Hover a tab to visit an emirate" until first use. Photo hover pop-ups and re-stamp are unchanged.
- Changed: `index.html`, `assets/js/uae.js` (`initPassport`). Tests: passport checks rewritten (opens on view, hover turns pages, no scroll lock); test11 all passed.

## v89 — clean CTA corners
- Every CTA: the 1px border line is gone (it showed as a ring of the old colour around the pill on hover) and so is the 4px halo ring; outline buttons draw their outline inside the pill; the hover fill and light sweep are clipped to the exact pill shape. Hover keeps lift + soft drop shadow.
- Changed: `assets/css/uae.css`. Tests: test11 all passed.

## v90–v91 — CTA edges, form alerts, header logo, passport fix
- CTAs: on hover the fill overshoots the pill and the button background switches to the fill colour, so no hairline of the old colour shows at the rounded edge.
- Enquiry card alerts: a wrong phone or email turns the field line red, adds a pulsing red "!" seal at the end of the field, drops a dark ribbon tag with the message under it, turns the stamp red ("1 detail to fix" / "2 details to fix") and gives the card a short shake on submit. Messages unchanged; reduced motion: no shake/pulse.
- Header logo: white pill removed, transparent PNG trimmed of its empty margins (`assets/img/logo/logo-trim.png`) and shown larger (66px tall on desktop, 44px on phones) with a faint light halo over the golden hero. Footer and mobile-menu logos keep their light chip (the dark-red lettering would not read on the dark footer).
- Passport: repaints when it scrolls into view (a turn finishing off-screen was not drawn). Tests: test11 all passed.

## v92 — header logo
- Removed the light glow behind the header logo and reduced it to 54px tall (40px on phones). `assets/css/uae.css` only.

## v93 — no white header bar while scrolling
- Desktop: once past the opening hero, the header stays out of view — it no longer slides back in as a white bar when scrolling up. It shows again only when back on the hero. Phones keep the old behaviour (bar returns on scroll up) so the menu button stays reachable. `assets/js/uae.js` (`initHeader`). Tests: test11 all passed.

## v94 — header returns on scroll-up as a floating capsule
- Scrolling up brings the header back again (v93 behaviour reverted), but there is no full-width white bar any more: logo, links and Free counselling sit in one floating, rounded, sand-tinted frosted-glass capsule, inset from the edges; the page shows through around it. Over the hero the header is clear as before. Changed: `assets/css/uae.css`, `assets/js/uae.js`. Tests: test11 all passed.

## v95 — Submit profile button
- Removed the CSS mask used for rounded clipping on CTAs (on some Windows browsers inside the tilted gold card it dropped the arrow circle and cut off the right end of "Submit profile"); plain rounded clipping now, and the submit pill sizes to its content so the arrow circle always fits. `assets/css/uae.css` only. Tests: test11 all passed.

## v96 — WhatsApp and Ask us buttons
- WhatsApp: brand green (#25D366) with white logo, two sonar rings pulsing out, a small wiggle every few seconds, lifts on hover with a white chat-bubble label "Chat on WhatsApp · Usually replies within minutes". Always visible after the opening sequence.
- Ask us: a gold sparkle medallion with a live green dot, attached to a dark speech bubble ("Ask Tutee · replies instantly") that types sample questions in turn (Is IELTS 5.5 enough?, Can my family join me?, …); hover tilts the medallion. Opens the same chat. Phones: medallion only.
- Changed: `index.html`, `assets/css/uae.css`, `assets/js/uae.js` (`initAskRot`, `initWaFree`). Reduced motion: no pulses, spin or typing. Tests: test11 all passed.

## v97 — company mark replaces the placeholder icons
- The user-supplied Tutee Connect mark (C rings + bird) was upscaled 4x with Real-ESRGAN, cut out of its white background (the drop shadow kept as a soft shadow) and saved as transparent PNGs (`assets/img/logo/mark-256.png`, `mark-512.png`). It replaces: the star emblem on the gold Student Profile card (front and the "Profile received" back), the sparkle in the floating Ask us medallion (now a cream disc), and the "TC" avatar in the chat header.
- Changed: `index.html`, `assets/css/uae.css`, new images. Tests: test11 all passed.

## v98 — living chat avatar
- Chat header logo: a gold light ring sweeps round it continuously, the logo gently breathes, it tilts and grows when you hover the header, and while the desk is typing an answer the ring spins fast with a gold glow and the green status dot pulses. Reduced motion: still. `assets/css/uae.css` only. Tests: test11 all passed.

## v99 — Ask us in the bottom-left corner
- The Ask us button moved to the bottom-left corner. At rest only the logo medallion (with the green live dot) shows; hovering it (or keyboard focus) slides out the "Ask Tutee · replies instantly" bubble with the rotating sample questions. The chat window opens above it on the left. WhatsApp stays bottom-right. `assets/css/uae.css` only. Tests: test11 all passed.

## v100 — flight-path scroll line, hero to footer
- A route rail runs down the left edge of the screen for the whole page: a dashed gold track with 12 evenly spaced stops (Welcome, Seven emirates, Services, Universities, Admissions & visa, English score, Funding, Residence, Student life, Reviews, Ask us, Enquire). A small plane rides the line as you scroll, the line fills gold behind it, passed stops fill in and the current one glows. Hover a stop to see its name; click to fly there. Desktop only (hidden under 1100px); built by `initPathway` in `assets/js/uae.js`, styles in `assets/css/uae.css`. Tests: test11 all passed.

## v101 — the golden eagle route
- The scroll rail is redesigned: "Your route" label, a glowing gold line with light pulses running down the travelled part, diamond waypoints (gold once passed), and instead of the plane a dark medallion with the user-supplied golden eagle (upscaled 4x with Real-ESRGAN, background removed: `assets/img/logo/eagle-128|256|512.png`) ringed by a rotating gold halo. The eagle tilts with scroll speed and carries a tag with the current chapter number and name; a % counter sits at the foot. Hover a waypoint for its name, click to go there. Desktop only. Tests: test11 all passed.

## v102 — eagle without a background
- The route rider is now just the transparent eagle PNG (no dark disc, gold ring or halo), with a soft drop shadow. `assets/css/uae.css` only. Tests: test11 all passed.

## v103 — the contrail route
- The scroll rail is redrawn as a gently weaving flight route (SVG): a dotted path ahead, a glowing gold contrail behind, with a bright glint at its head. Waypoints are four-point gold stars (the page sparkle) that light up once passed; the current one sends out a soft ring. A small gold eagle (30px) flies the curve and banks with it; a compact tag shows the current chapter. The rail fades in only after the opening flight, so it no longer sits over the hero. Rail class renamed to `.rt-path` (an old `.fp` style elsewhere was distorting the stars). Desktop only. Tests: test11 all passed.

## v104 — route runs hero to footer
- The contrail route is now visible from the very top of the hero and its last star is the footer (13 stops: Welcome … Enquire, Footer); the eagle lands on the footer star at the bottom of the page. `assets/js/uae.js`. Tests: test11 all passed.

## v105 — journey thread like the Germany page
- Replaced the fixed side rail with a Germany-style journey thread: one route drawn through the whole document (hero → every section → footer) in the left gutter just outside the content, stepping slightly left/right at each chapter. A dashed base line shows the route ahead; the gold line is drawn as you scroll, with the small gold eagle flying at its head (60% down the screen) and banking with the curves. Desktop only (>1180px), hidden for reduced motion (eagle). Germany files were only read for reference, not changed. `initThread` in `assets/js/uae.js`, styles in `assets/css/uae.css`. Tests: test11 all passed.

## v106 — thread moved to the edge
- The journey thread now runs down the far-left edge in line with the Ask us button (measured from the button), clear of every heading and paragraph; the sideways steps are gentler (±5px). `assets/js/uae.js`. Tests: test11 all passed.

## v107 — eagle hover tag
- Hovering the eagle on the journey thread pops up a dark tag "You are here" with the title of the slide it is flying over (e.g. "Build your life in the UAE."; during the opening flight, the slide headline showing). The tag follows if you scroll while hovering. Desktop only. `assets/js/uae.js`, `assets/css/uae.css`. Tests: test11 all passed.

## v108 — footer logo on frosted glass
- The white pill behind the footer (and phone menu) logo is now a rounded rectangle of frosted glass: translucent cream tint, background blur, a light top edge and thin gold outline; logo slightly larger. `assets/css/uae.css` only.

## v109 — bigger, clearer footer logo
- Footer logo uses the trimmed logo file (no empty margins) at 72px tall (was 44px) on a brighter frosted-glass rectangle so its colours read true. `index.html`, `assets/css/uae.css`.

## v110 — clean straight pathway line
- Fixed the kink/zig-zag in the journey line (where two chapters overlapped, the route doubled back on itself). The line is now one straight vertical line exactly in line with the centre of the Ask us button (x = button centre), from the hero to the footer; solid gold stroke. `assets/js/uae.js`, `assets/css/uae.css`. Tests: test11 all passed.

## v111 — back button on the university directory
- "← Back to top universities" button at the top of the directory (before the breadcrumb). It returns to the Top universities slide on the main page (`index.html#universities`; in the single file it closes the directory view and lands on that slide). `universities.html` (directory template), `assets/css/uae.css`. Tests: test11 all passed.

## v112 — footer wordmark: HABIBI, COME TO DUBAI
- The big "Tutee Connect" footer wordmark is replaced with "HABIBI, COME TO DUBAI" in gold outline letters. Hovering it fills the words with gold one after another, left to right (each word lifts slightly under the pointer); on touch screens it shows filled. `index.html`, `assets/css/uae.css`. Tests: test11 all passed.

## v113 — golden glow
- When "HABIBI, COME TO DUBAI" fills on hover, it now fills with a metallic gold gradient and glows with a warm gold halo that gently pulses; outlines again when the pointer leaves. Touch screens show it filled and glowing. `assets/css/uae.css` only. Tests: test11 all passed.
