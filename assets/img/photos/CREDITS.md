# Photo credits

All four photographs are UAE subjects sourced from Wikimedia Commons. Two are
**CC BY**, which makes the footer credit line a licence obligation rather than a
courtesy; the other two are **CC0** and are credited anyway, as on the other
pages. The line is rendered from the `data-photo-credit` element and generated
from `PHOTO_CREDIT` in `_tooling/localise_ae.py`. If you swap any photo, update
this file **and** that constant, then re-run `localise_ae.py`, `assemble.py uae`
and `build_unipage.py uae`.

CC BY-SA, NC and ND images were deliberately avoided, as on the other nine
pages. That rule cost several otherwise ideal candidates here: most of the
high-resolution Sheikh Zayed Grand Mosque frames on Commons are CC BY-SA, as are
the strongest Burj Al Arab frames and several of the best Dubai Marina angles.

Each file was cropped and resized from the Commons original with `sips`. The
output dimensions match the Malaysian, Singapore, French, Australian, New
Zealand, German, Irish and Canadian files, which in turn match the slots, so the
layout cannot shift.

The four subjects sit in **four distinct places** — Downtown Dubai, Dubai
Marina, Abu Dhabi and Zabeel Park in Dubai. Three are Dubai frames, which is a
deliberate departure from the "four different cities" spread the other pages
keep: this page is Dubai-forward by design, and the three Dubai frames it does
carry are a skyline at dusk, a marina and a green city park, so they do not
repeat each other.

**No photograph has an identifiable person as its subject** — the same rule the
other nine pages follow. The Burj Khalifa, Dubai Marina and Qasr Al Watan frames
are empty of people. The Zabeel Park frame is the only one that carries any: two
people walk up the path in the middle distance, **facing away from the camera**,
so no face is present in the file at all — checked by magnifying that region of
the 4000 px original well past the delivered size. At 1400 px, rendered at
roughly half that, they are a few pixels tall. This is the same judgement the
Singapore page's Gardens by the Bay panel and the Malaysian page's Melaka River
frame rest on, and an easier call than either, because here there is no face to
resolve from any angle.

---

## students-campus.jpg — hero (`#home`), 1200×1143

> **The filename does not describe the subject**, and it is kept because
> `students-campus.jpg` is a literal key in the compiled stylesheet — the class
> `bg-[url('/assets/img/photos/students-campus.jpg')]` plus the matching escaped
> selector and `url()` in `assets/css/main.css`, and the `<link rel="preload">`
> in the page shell. Renaming the file means editing all of those together;
> `verify_site.py` fails on a mismatch, the browser fails silently.

- **Depicts:** the Burj Khalifa in silhouette at sunset, with the Downtown Dubai
  and Business Bay skyline either side of it and Dubai Creek Harbour in the
  foreground.
- **Commons file page:** https://commons.wikimedia.org/wiki/File:Burj_Khalifa_(worlds_tallest_building)_and_the_Dubai_skyline_(25781049892).jpg
- **Author / photographer:** imran shahabuddin
- **Licence:** CC BY 2.0 — https://creativecommons.org/licenses/by/2.0
- **Attribution required:** **yes**
- **Crop:** original 5496×3670 (1.4975:1) → `sips -c 3670 3853` (1.0499:1,
  centred) → resized to 1200×1143, quality 82.
- **Why a centred crop is right here:** the photographer squared up on the Burj,
  which sits within a couple of percent of the frame's vertical axis. The
  ~822 px trimmed from each side is further skyline that repeats, so nothing
  identifiable is lost.
- **Why 1.05:1 and not the original 3:2:** the hero panel measures about
  **596×584 CSS px on desktop (1.02:1) and 319×292 on mobile (1.09:1)** —
  essentially square at every breakpoint. The div is `bg-cover bg-center`, so a
  1.5:1 file would have a third of its width thrown away. A near-square crop
  suits this subject unusually well, because the Burj Khalifa is a single
  vertical spike — the same reason the Malaysian page crops the Petronas Twin
  Towers this way.
- **Safe to reshape:** referenced only as a CSS `background-image` and a
  `<link rel="preload">` — there is no `<img>` tag for it on either page, so its
  ratio has no effect on layout.

## team-working.jpg — `#relocate` ("The Pathway to Settlement"), 1400×933

- **Depicts:** the Abu Dhabi skyline seen across the gardens of Qasr Al Watan,
  the presidential palace — Etihad Towers, the ADNOC headquarters tower and
  Emirates Palace.
- **Commons file page:** https://commons.wikimedia.org/wiki/File:Abu_Dhabi_seen_from_Qasr_Al_Watan_6.jpg
- **Author / photographer:** EditQ
- **Licence:** CC0 — https://creativecommons.org/publicdomain/zero/1.0
- **Attribution required:** no (credited anyway)
- **Crop:** original 3862×2265 (1.7051:1) → `sips -c 2265 3397` (exact 3:2,
  centred — 232 px removed from each side, taking foreground palms on the left
  and low buildings on the right) → resized to 1400×933, quality 82.
- **Note:** this image is rendered with `w-full h-auto object-cover`, so **its
  aspect ratio drives the layout**. Any replacement must also be 3:2.
- **Why the capital for the settlement panel:** the section is about moving from
  a student residence visa to a Green Residence to an Employment Residence Visa
  and possibly a Golden Residence. Every one of those is a federal decision by
  ICP, whose seat is Abu Dhabi — the same reasoning that put Putrajaya in this
  slot on the Malaysian page and Canberra on the Australian one.

## family.jpg — `#relocate` ("Relocating with Your Family?"), 1400×1050

- **Depicts:** Zabeel Park, Dubai — lawns and clipped hedge in the foreground, a
  brick walking path lined with palms, residential towers on the right, and the
  Downtown Dubai skyline with the Burj Khalifa on the horizon.
- **Commons file page:** https://commons.wikimedia.org/wiki/File:Zabeel_Park_5.jpg
- **Author / photographer:** EditQ
- **Licence:** CC0 — https://creativecommons.org/publicdomain/zero/1.0
- **Attribution required:** no (credited anyway)
- **Crop:** **none.** The original is 4000×3000, which is exactly 4:3, so it was
  only resized to 1400×1050 at quality 82. Nothing is cropped away.
- **Why a park, and why this replaced the first choice:** this slot sits under
  "Relocating with Your Family?", and the copy's actual condition is *"provided
  you can show suitable housing for them"* — so the frame needs to say
  *living here*, not *visiting here*. The first build used a restored courtyard
  house in Al Fahidi (`File:Al_Bastakiya_9.jpg`), which was thematically apt on
  paper but read on the page as a museum exhibit mid-renovation: the frame
  carries easels, timber props and a bucket on the flagstones. A green
  neighbourhood park with residential towers behind it is what family life in
  Dubai actually looks like, and the two figures walking the path read as a
  couple out for a stroll without anyone being identifiable.
- **Why the Burj on the horizon is acceptable:** it duplicates the hero subject,
  but as a distant background element rather than the subject of the frame, and
  it usefully places the park in the city rather than making it generic
  parkland. Residential-neighbourhood photography of Dubai — Jumeirah villas,
  Arabian Ranches, Mirdif — would have been the ideal subject, and Commons has
  nothing usable: every candidate found was CC BY-SA or below 2000 px.

## uae-city.jpg — `#universities` ("Why Dubai and the UAE?") background panel, 1400×933

> Referenced by the Tailwind arbitrary-value class
> `bg-[url('/assets/img/photos/uae-city.jpg')]`, which is a **literal key** into
> `assets/css/main.css`. Both the class in the HTML and the escaped selector
> plus `url()` in the stylesheet must be changed together — this file was
> repointed from `malaysia-city.jpg` when the shared CSS was copied over.

- **Depicts:** the Dubai Marina skyline at dusk from the Palm Jumeirah side,
  with Cayan Tower, Princess Tower and the Marina Torch in the cluster.
- **Commons file page:** https://commons.wikimedia.org/wiki/File:Dubai_Marina_Skyline.jpg
- **Author / photographer:** Norlando Pobre
- **Licence:** CC BY 2.0 — https://creativecommons.org/licenses/by/2.0
- **Attribution required:** **yes**
- **Crop:** **none.** The original is 6000×4000, exactly 3:2, so it was only
  resized to 1400×933 at quality 82.
- **Why Dubai Marina and not a second Downtown frame:** the hero is already the
  Burj Khalifa, and this panel sits behind "Why Dubai and the UAE?" — the
  question a student is actually weighing. Dubai Marina, Jumeirah Lakes Towers
  and Dubai Knowledge Park form the western cluster where a large share of the
  directory's Dubai institutions sit, so the panel shows a part of the city a
  reader might genuinely live and study in.
