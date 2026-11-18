# Episode 4 — The Grey Tide

Source material: **Unit 4 · We're having fun at the beach!**, book pages 32–37.

## Done
- [x] Fork from Episode 3's canonical repo (`zb03-thegreat-give-back`).
- [x] Engine is now data-driven about episode shape: `episode-shape.ts` declares the
      mission count, and boss id, epilogue id, chapter count, unlock rules and map
      progress all derive from it. `adventure.ts` asserts the stage data matches.
- [x] **Eight missions** (up from six), as requested — two extra stages before the boss.
- [x] New activity: **Spot the Difference**, for Lesson Three's
      "He isn't eating an ice cream. He's eating a sandwich."
- [x] 113 questions across eight missions and three boss phases.
- [x] Eleven chapters: intro, one per mission, boss chapter, epilogue.
- [x] Separate storage key `episode-4-v1`; finished Episode 3 players get Pip's Hint only.
- [x] 98 tests, clean typecheck, successful build, browser playthrough.

## Next
- [ ] Replace placeholder art with generated illustrations (see `LOVABLE-ART-PROMPT.md`).
- [ ] Hand-tune map coordinates (`styles.css` `area-1…8`, `node-1…9`) against the real map.
- [ ] Play through all eight missions and three boss phases in the browser.
- [ ] Missions 2 and 7 currently reuse the mission 1 snapshot cards for revision; consider
      swapping in fresh questions if the revision feels repetitive.
