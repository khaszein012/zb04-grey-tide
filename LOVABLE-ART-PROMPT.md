# Lovable art prompt — Episode 4, all 40 images

One prompt, one paste. It generates every asset the game imports, at the exact
dimensions it displays them, named so the files drop straight into `src/assets/`.

**How to use:** paste sections 1–3 as a single message. Generate in the order given — the
map and the three characters must come first, because every later image references them.
**The three Spot-the-Difference pairs in section 8 must be generated as pairs**, so the two
pictures look like the same scene with one thing changed.

---

## 1. What you are making

You are generating the complete illustration set for a children's storybook
English-learning game called **Detective Zabyr — Episode 4: The Grey Tide**.

The story: the detective takes a holiday at a little seaside town called **Sandpiper
Cove**. But **Captain Squall**, a grumpy storm-witch in a sou'wester hat, has switched on
her **Grizzle Machine**, which turns the sea grey, thick and gloopy so nobody can swim,
surf or snorkel. The dolphins have left because they cannot live in polluted water.
Zabyr works along the coast cleaning beach after beach, then climbs the lighthouse to
switch the machine off.

I need **40 images** in a single consistent style. They will be displayed at the sizes
listed, so please honour the aspect ratios exactly. **Do not draw any text in any image**
— this is the single most important rule. Not on signs, not on the brochure, not on the
phone, not in the sky. Wherever writing would naturally go, paint abstract squiggles or
leave it blank.

**Output naming:** save each file with the exact filename given, e.g. `chapter-0.jpg`.

---

## 2. The style — applies to every image, without exception

> Children's storybook illustration in soft gouache and watercolour painted on textured
> paper. Warm seaside palette: sandy cream, sea teal, sky blue, coral, mustard yellow,
> with deep navy for shadows and a flat grey for the polluted sea. Rounded friendly
> shapes, gentle soft outlines, no harsh black lines. Cosy, calm, welcoming mood — the
> feeling of a well-loved picture book. Even soft lighting, no dramatic or theatrical
> shadows. Flat-ish painted shading with visible paper grain and a hand-made feel.
> Slightly muted, never neon or glossy.
>
> **STRICT — no text anywhere.** Absolutely no lettering, words, captions, labels, numbers,
> signage, brochure headings, phone screens, or speech bubbles. Any surface that would
> normally carry writing must show abstract squiggles or blank space instead.

Keep this wording identical in every generation. Paraphrasing between images is what makes
a set look inconsistent.

---

## 3. The characters — keep these descriptions identical every time

**ZABYR** — the hero
> A 10-year-old boy detective. Warm brown skin, short curly dark hair, a tan trench coat
> over a mustard-orange shirt, brown trousers, brown boots. A small brass magnifying glass
> in his coat pocket. Friendly, curious expression. Calm and unbothered — he is never
> frightened. On the beach he carries the coat over one arm rather than wearing it.

**PIP** — the sidekick
> A small floating brass camera about the size of a sparrow. Two large round expressive
> eyes on the front, tiny thin arms, a soft warm glow around it. Adorable and friendly.
> Never mechanical, never scary. Floats at shoulder height beside Zabyr.

**CAPTAIN SQUALL** — the villain
> A stocky older woman like a retired sea captain, in a yellow sou'wester hat with a wide
> back, a heavy grey oilskin coat and big black boots. A storm cloud seems to follow her.
> She carries a small brass remote control for her machine. Grumpy and dramatic, with her
> arms crossed. **Comical, never frightening** — she reads as a tired old sailor who
> simply wants a nap.

---

## 4. The map — **generate this first**

**`sandpiper.jpg` — 1920×1080, landscape**

> Wide aerial view of a small seaside town called Sandpiper Cove, seen from above at a
> gentle angle, like a painted treasure map. Nine places connected by sandy paths and a
> road along the coast, arranged across the frame in this order:
>
> 1. A sheltered swimming cove with a jetty, lower-left
> 2. A stretch of sand with beach towels and umbrellas, left
> 3. A small grey machine shed on the rocks, upper-left
> 4. Two neighbouring beaches divided by a line of seaweed, centre
> 5. A long brick wall running down to the sea, lower-centre
> 6. A wide bay with dolphins jumping, upper-centre
> 7. A clean bright beach with a lifeguard hut, right
> 8. A sandy telephone box on the promenade, far right
> 9. A tall white lighthouse on rocks at the top-right corner
>
> Half the sea is grey and gloopy, half is bright blue. Warm afternoon light, gentle
> hills behind, a few small boats. No characters. No text on any sign.

**Placement matters more than beauty here.** The game overlays nine clickable buttons on
this map at fixed positions, so the nine places must sit roughly where described. I will
fine-tune the button positions to whatever you produce — but the left-to-right order must
match the list.

---

## 5. Eleven chapter illustrations

These appear beside the story text at **4:3**. Generate at **1536×1152** and keep
important detail out of the top and bottom 12% — that edge gets cropped on small screens.

| File | Scene |
|---|---|
| `chapter-0.jpg` | Zabyr steps off a little ferry onto a beach town where every umbrella is shut and the sea is grey. Pip floats beside him looking worried. |
| `chapter-1.jpg` | A silent cove. Amy stands at the water's edge holding a phone, Max sits behind her reading, Holly sits with a ball, Leo carries a surfboard. Zabyr and Pip look along the line of them. |
| `chapter-2.jpg` | Leo surfing on a small wave while Max and Holly watch from the sand; Amy holds her phone up. Mid-frame, Leo wobbles as if about to fall. |
| `chapter-3.jpg` | A small grey machine squatting on rocks above a beach, with blank signs leaning against it. Zabyr reads the signs, Pip points. |
| `chapter-4.jpg` | Two almost identical pictures of a boy on a beach towel pinned side by side to a board: in one he holds a sandwich, in the other an ice cream. Zabyr studies them closely. |
| `chapter-5.jpg` | A long grey brick wall running down the beach into the sea, blocking the way. Zabyr touches one brick. |
| `chapter-6.jpg` | An empty grey bay with an old brochure lying on the sand. Zabyr picks it up; Pip hovers over his shoulder. No dolphins. |
| `chapter-7.jpg` | One beach split down the middle: the left half bright and clean with clear water, the right half grey with cans and plastic bags. Zabyr stands on the dividing line. |
| `chapter-8.jpg` | A sandy telephone box standing in the sand, its door open, Amy inside talking. Zabyr and Pip listen beside it. |
| `chapter-9.jpg` | A tall white lighthouse on rocks with the grey machine humming on top of it. Captain Squall stands beside it with her arms crossed; Zabyr faces her from the path below. Sunset. |
| `chapter-10.jpg` | A bright blue sea with dolphins jumping, windsurfers and kayaks on the water, and Captain Squall in the shallows falling off a windsurf board and laughing. Zabyr and Pip in the foreground. Happy ending. |

---

## 6. Eight mission backdrops

These fill a wide card beside each question. Generate at **1536×1024**.

| File | Scene |
|---|---|
| `cove.jpg` | A sheltered swimming cove with a wooden jetty, clear turquoise water and moored boats. No characters. |
| `watchers.jpg` | A sandy beach with towels, umbrellas and footprints; the sea calm. No characters. |
| `machine.jpg` | A small grey machine shed on rocks overlooking a grey sea, cables running down to the water. No characters. |
| `yesno.jpg` | Two neighbouring beaches separated by a neat line of seaweed. No characters. |
| `allwords.jpg` | A long brick wall across a beach with the tide lapping at it. No characters. |
| `dolphinbay.jpg` | A wide open bay with a dorsal fin breaking the surface far out. No characters. |
| `cleansea.jpg` | A bright clean beach with a lifeguard hut, flag and clear water. No characters. |
| `reporter.jpg` | A sandy promenade with a striped telephone box and bunting. No characters. |

---

## 7. Eight water-sport cards — 768×768 each

Single scene, centred, on a plain cream background, filling most of the frame. Friendly
and slightly rounded. **These are reused in mission 2, so keep the eight visually distinct
from one another.**

| File | Scene |
|---|---|
| `sport-swim.jpg` | A child swimming front crawl, head to one side, splash around them. |
| `sport-sail.jpg` | A small sailing boat with two children aboard, the sail full of wind. |
| `sport-dive.jpg` | A child diving into the water, arms extended ahead, splash at the surface. |
| `sport-surf.jpg` | A child standing on a surfboard riding a small wave. |
| `sport-kayak.jpg` | A child in a yellow kayak holding a double paddle. |
| `sport-windsurf.jpg` | A child standing on a board holding a sail above their head. |
| `sport-snorkel.jpg` | A child floating face-down with a snorkel and mask, fish below. |
| `sport-waterski.jpg` | A child standing on one long ski, holding a rope that runs off-frame. |

---

## 8. Six Spot-the-Difference pictures — 768×768 each

**These are the highest-risk images in the set.** They are shown as three pairs, and the
child has to tell them apart, so each pair must look like **the same scene with exactly
one thing changed** — same background, same lighting, same character, same framing.

Generate each pair in a single prompt. The third pair reuses `sport-surf.jpg` and
`sport-waterski.jpg` from section 7, so no new files are needed for it.

| Pair | One picture | The other picture |
|---|---|---|
| pair 1 | `spot-sandwich.jpg` — a boy sitting on a beach towel holding a sandwich | `spot-ice-cream.jpg` — the same boy, same towel, same pose, holding an ice cream instead |
| pair 2 | `spot-hat.jpg` — a girl standing on the sand wearing a wide sun hat | `spot-sunglasses.jpg` — the same girl, same spot, same pose, wearing sunglasses and no hat |
| pair 3 | `spot-bird.jpg` — a child looking up at a seagull on a post | `spot-fish.jpg` — the same child, same post, looking down at a fish in a rock pool instead |

---

## 9. Five dolphin and sea-state cards — 768×768 each

Simple and clear, on a plain cream background. **No labels.**

| File | Scene |
|---|---|
| `dolphin-jump.jpg` | A single dolphin leaping out of clear blue water. |
| `dolphin-family.jpg` | Three dolphins swimming together in clear water. |
| `dolphin-sound.jpg` | A dolphin with small curved sound lines in front of its head. |
| `sea-clean.jpg` | Clear blue sea over visible sand and a few fish. |
| `sea-polluted.jpg` | Grey thick water with a few plastic bags and cans floating. |

---

## Final checklist before you generate

- **40 images**, exact filenames, exact aspect ratios.
- **Zero text in every single image** — including the brochure, the phone box and the signs.
- Style block copied verbatim every time — no paraphrasing.
- Zabyr, Pip and Captain Squall described identically in every image they appear in.
- The three Spot-the-Difference pairs match within each pair, one change only.
- The grey polluted sea is a **flat, dull grey** — clearly different from the bright blue
  clean sea, so children can tell them apart at a glance.
- Captain Squall is grumpy and comical, never frightening.
- Chapter images keep their important content away from the top and bottom 12%.

**Dimension summary**

| Size | Count | Assets |
|---|---|---|
| 1920×1080 | 1 | map |
| 1536×1152 (4:3) | 11 | chapters 0–10 |
| 1536×1024 | 8 | mission backdrops |
| 768×768 | 19 | 8 sports, 6 spot pictures, 5 sea cards |
| **Total** | **40** | sport-surf and sport-waterski double as spot pictures |