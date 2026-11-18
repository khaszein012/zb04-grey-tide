# Detective Zabyr — Episode 4: The Grey Tide

A storybook English adventure for young EFL learners, built on the engine from
[Episode 3](https://github.com/khaszein012/zb03-thegreat-give-back).

**Language content:** Unit 4 — *We're having fun at the beach!* (book pages 32–37).
Water-sport vocabulary, the present continuous with `isn't / aren't`, `-ing` spelling
rules, the `-all` word family, adjectives to describe places, and the *Dolphin Dreams*
reading about pollution.

## Story

Detective Zabyr takes a holiday at Sandpiper Cove and finds the sea turned grey, thick
and gloopy. **Captain Squall** hates noise and fun, and her **Grizzle Machine** is making
the sea unusable — the dolphins have left because they cannot live in polluted water.
Zabyr works along the coast cleaning beach after beach, then climbs the lighthouse to
switch the machine off.

## Curriculum map

This episode has **eight missions** rather than six.

| Mission | Place | Unit 4 content | Activity |
|---|---|---|---|
| 1 | Splash Cove | swim, sail, dive, surf, kayak, windsurf, snorkel, waterski | Snapshot cards |
| 2 | Beach Watchers | He's / She's / They're + the unit story | Choice + revision |
| 3 | The -ing Machine | -ing spelling: just add, drop e, double the letter | Spelling beam |
| 4 | Yes and No | isn't / aren't / 's / 're + Lesson Three contrast | **Spot the Difference** (new) |
| 5 | All Words Wall | -all family: ball, mall, wall, tall, small | Spelling + listen |
| 6 | Dolphin Bay | Dolphin Dreams brochure reading | Verdicts + Who |
| 7 | Clean Sea Club | polluted, clean, dangerous, safe, beautiful, ugly | Snapshot cards |
| 8 | Beach Day Reporter | -ing verb forms + telling Mum | Choice + speaking |
| Boss | The Lighthouse | mixed review, present-continuous questions | 3 phases |

Eleven chapters run alongside: an intro, one per mission, the boss chapter, and an
epilogue with no Detective Check.

## Architecture

The engine is **data-driven about episode shape**. `src/game/episode-shape.ts` declares
the mission count once; the boss id, epilogue id, chapter count, unlock rules and map
progress all derive from it. `adventure.ts` asserts the supplied stage data matches, so
adding a mission without a stage fails loudly.

- **`src/game/adventure.ts`** — types, registries, difficulty rules, option selection,
  per-mission question ordering.
- **`src/game/*-content.ts`** — all curriculum as plain data.
- **`src/game/unit4-rules.ts`** — pure rules for the new activity.
- **`src/test/`** — 98 tests pinning answer keys, ordering, storage and the episode shape.

## Development

```bash
bun install
bun run dev      # http://localhost:8080
bunx vitest run  # 98 tests
bunx tsc --noEmit
bun run build
```

## Art

`src/assets/` holds flat colour placeholders at the exact dimensions the layout uses.
Replace them in place; filenames come from `chapter-images.ts` and the content files.
`LOVABLE-ART-PROMPT.md` is the ready-to-paste prompt for all 39 images.

| Asset | Size | Count |
|---|---|---|
| `sandpiper.jpg` (map) | 1920×1080 | 1 |
| `chapter-0…10.jpg` | 1536×1152 (4:3) | 11 |
| Mission backdrops | 1536×1024 | 8 |
| Sport, spot and sea cards | 768×768 | 19 |

Regenerate placeholders with `python tools/make-placeholders.py` (needs Pillow).

## Saving

Progress is stored under `localStorage["episode-4-v1"]`, separate from Episode 3's
`episode-3-v1`. A player who finished Episode 3 is welcomed back and starts with Pip's
Hint unlocked, but does not inherit Episode 3 stars or unlocks.

## Teacher mode

Settings → PIN `2026` → difficulty, timer length, unlock-all, cutscene and check toggles,
teaser text, and jump-to-mission shortcuts.
