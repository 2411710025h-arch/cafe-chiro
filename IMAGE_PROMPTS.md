# CAFE CHIRO — Image Prompts

No image-generation tool was available in the build environment, so the site
ships with designed monochrome placeholders (`components/media/*`). When you
generate the real photography, use the prompts below and drop the files in
`public/` (see **Wiring** at the bottom).

**Global direction (append to every prompt):**

> editorial photography, contemporary Korean café interior, white / warm-grey /
> stainless steel / glass surfaces, soft natural daylight from large windows,
> photorealistic, full-frame camera look, clean and uncluttered, calm premium
> mood. No warm vintage filter, no orange tungsten lighting, no HDR, no visible
> cat toys or clutter, no text, no watermark, not cartoon, no obvious AI look.

Palette to respect: charcoal `#111111`, icy grey `#E6E9EC`, white. Avoid beige,
wood-heavy, retro-café aesthetics.

---

## Cats (portraits, 4:5)

### 1 — CHIRO / ちろ · black · ♂ 4 · THE HOST → `public/cats/chiro.jpg`
> A sleek solid-black domestic shorthair cat sitting upright and composed on a
> pale grey bench a little apart from the viewer, near a floor-to-ceiling
> window. Calm, self-possessed expression, looking toward the camera from a
> slight distance. Eye-level camera, 50mm, shallow depth of field, bright
> diffused daylight, minimalist white-and-grey café background softly blurred.
> Aspect ratio 4:5.

### 2 — NAGI / なぎ · tabby & white · ♀ 3 · THE CURIOUS ONE → `public/cats/nagi.jpg`
> A brown mackerel-tabby-and-white cat perched on a white windowsill, alert and
> curious, head turned to inspect something just off-frame, one paw slightly
> raised. Backlit by soft daylight through glass, 35mm, gentle contrast, clean
> grey window frame, contemporary café. Aspect ratio 4:5.

### 3 — MUGI / むぎ · orange tabby · ♂ 2 · THE SOCIAL ONE → `public/cats/mugi.jpg`
> A lively young orange (ginger) tabby cat mid-movement, walking toward the
> camera on a smooth concrete floor, playful and sociable, ears forward. Low
> eye-level camera, 50mm, shallow depth of field, bright even daylight, blurred
> minimalist café seating behind. Aspect ratio 4:5.

### 4 — TSUKI / つき · grey · ♀ 5 · THE OBSERVER → `public/cats/tsuki.jpg`
> A calm solid-grey (blue) cat resting on a high pale-oak shelf that is part of
> an integrated cat walkway, looking down over the café from above. Quiet,
> observant expression. Slightly low angle looking up, 50mm, soft daylight,
> white walls and stainless accents, shallow depth of field. Aspect ratio 4:5.

---

## Interior & brand (landscape / feature)

### Hero — storefront/interior, 16:9 → `public/interior/hero.jpg`
> Wide interior of a modern minimalist cat café: white walls, warm-grey micro-
> cement floor, stainless espresso counter, pale-oak tables and slim chairs,
> large glass frontage with bright natural daylight, subtle integrated elevated
> cat walkways along one wall, one or two cats resting naturally. Architectural,
> uncluttered, premium. 24mm, deep focus. Aspect ratio 16:9.

### Café / menu feature, 5:4 → `public/interior/cafe.jpg`
> A latte and a slice of Basque cheesecake on a matte ceramic plate on a pale
> table by a window, minimalist styling, soft daylight, shallow depth of field,
> a grey cat softly out of focus in the background. Aspect ratio 5:4.

### About / space, 16:9 → `public/interior/space.jpg`
> Detail of the café's design: stainless steel, glass and white surfaces with an
> integrated pale-wood cat shelf built into the wall, clean lines, bright
> daylight, no clutter, architectural editorial feel. Aspect ratio 16:9.

### News thumbnails, 1:1 → `public/news/<slug>.jpg`
> Square editorial crops matching each article (opening = storefront; croffle =
> plated croffle with coffee; cats = a cat by the window). Same global
> direction, aspect ratio 1:1.

---

## Wiring the real photos

**Cats — already wired.** Just drop the four files in `public/cats/` and they
appear automatically (silhouettes show until then):

| file | cat |
|---|---|
| `public/cats/chiro.jpg` | CHIRO / ちろ — black cat on the white table |
| `public/cats/nagi.jpg`  | NAGI / なぎ — tabby & white cat by the window |
| `public/cats/mugi.jpg`  | MUGI / むぎ — orange tabby walking on the steel table |
| `public/cats/tsuki.jpg` | TSUKI / つき — grey cat on the steel shelf |

The per-cat crop focus is set in `content/cats.ts` (`focus`); tweak if a face
sits off-centre on mobile. `components/media/CatPhoto.tsx` handles the load +
fallback. (Optional: swap the `<img>` for `next/image` for on-the-fly
optimization.)

**Interior / News (optional):** add files under `public/interior/` and
`public/news/`, render them in `components/media/Placeholder.tsx`, and set each
article's `thumbnailUrl` to `/news/<slug>.jpg`. `next.config.mjs` already allows
`*.supabase.co` for remote images.
