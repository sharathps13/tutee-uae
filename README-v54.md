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
