# v142: StarBorder on the main CTAs

React Bits' `<StarBorder />` (JS + CSS variant), ported to plain JavaScript, because the page is not a React app. The code is `initStarBorder` in uae.js, plus the CSS block marked v142.

**Applied to:**
- header "Free counselling";
- hero "Book free counselling" and "Explore 90 universities";
- "Request a free consultation";
- the "Explore all 90 licensed universities" banner;
- "Get help with your test";
- "Evaluate scholarship profile" and "Check loan eligibility";
- "Plan your earnings with us";
- "Get family visa help";
- "Submit profile".

**Not applied to** the repeated per-item buttons (per emirate, per service, per university, and in the university pop-up), to keep the effect special.

**Behaviour:**
- A gold star with a fading trail laps the border every 4.5 s, with a soft bloom. On gold or cream buttons the star is deep bronze instead.
- On hover or keyboard focus it runs one fast lap.
- A press sends light racing both ways round the border from the point pressed. This replaces the old ripple on these buttons.
- Off-screen buttons pause.
- With reduced motion the star rests.
- On phones and tablets the star rests on the border and only runs when the button is tapped, so scrolling stays at 60 fps.
- `html`/`body` now clip horizontal overflow, so the glow can never widen the page.

**Checks:** all functional tests pass, and slow frames are 0–3% on every device size tested.

## v143 fix
- The old shine sweep on the primary buttons slid outside them once the star light was allowed past the edge, leaving stray white glows next to the buttons. It now sweeps inside the button.

## v144
- Calmer motion: the star takes 9 s per lap (was 4.5 s), the hover lap lasts 2.2 s (was 0.9 s), and the shine sweeps over about 2.7 s every 9 s (was 0.8 s every 5.5 s).

## v145
- The "Ask us anything" question bar is now a dark pill with a multicolour light edge (blue, red, yellow, green) and a soft glow below it, after the reference screenshot. It brightens on hover and focus.

## v147
- "Family residence" panel: the family-on-the-beach photo you supplied, upscaled to HD (2048x3068, published at 800 and 1600 px wide), with a warm dark wash so the 2021 heading, the sentence and the cards stay readable.

## v148
- English checker: the papers photo you supplied, upscaled to HD (2244x2804, published at 700 and 1400 px wide), fills the empty lower half of the dark panel and fades in from behind the table. "Get help with your test" now sits on a dark glass backing.

## v149
- English checker panel: the papers photo is now a tilted, gold-edged "document card" in the lower right, with a gold "CAA minimum" seal on its corner. The panel background stays plain dark.

## v150
- English checker panel: the papers photo now fills the top of the panel and fades through a gradient into the dark. The heading, text, table and button start below it. The v149 card and seal are removed.

## v151
- English score checker redesigned as a premium instrument:
  - dark espresso card with a glowing gold dial and gold selected chips;
  - the score is read big inside the arc, and the arc colour and glow follow the score;
  - a live pill shows "Cleared" or "0.5 to go";
  - the slider track fills up to the score, with the CAA minimum marked as a bright notch, and has a glowing gold handle;
  - gold sparks burst the first time a score clears the minimum;
  - the result box is tinted gold when the score clears and copper when it is below.
