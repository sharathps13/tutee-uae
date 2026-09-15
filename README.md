# Tutee Connect — Study in Dubai & the UAE

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
