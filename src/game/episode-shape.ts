/**
 * The shape of this episode, declared once so the engine and the content agree.
 *
 * Chapter 0 is the intro, chapters 1..MISSION_COUNT are the missions, then the boss
 * chapter and the epilogue. adventure.ts checks the stage data against MISSION_COUNT,
 * so adding a mission here and forgetting a stage fails loudly instead of silently
 * pointing the boss at the wrong chapter.
 */
export const MISSION_COUNT = 8;
export const BOSS_ID = MISSION_COUNT + 1;
export const EPILOGUE_ID = MISSION_COUNT + 2;