import type { Chapter, Question, Stage } from './adventure';
import { BOSS_ID, EPILOGUE_ID } from './episode-shape';
import { suppliedStages } from './supplied-content';
import { laterStages } from './later-content';
import { CHAPTER_IMAGES } from './chapter-images';

export const BOSS_PHASE_NAMES = ['The Grizzle Storm', 'Ask the Sea', 'The Clean Sea Speech'];

export const BOSS_INTRO = [
  'Captain Squall: Eight grey beaches and nobody is swimming. How lovely and quiet.',
  'Pip: Look, Zabyr! The machine is making the whole sea grey!',
  'Zabyr: Then let\u2019s say what everyone IS doing. Loudly.',
];

export const BOSS_DEFEAT = [
  'Captain Squall: You said what you were doing. Every single one of you. Loudly.',
  'Captain Squall: I only wanted a quiet sea. I did not know it would be this grey.',
  'Captain Squall: …Can I learn to windsurf?',
];

export const FESTIVAL_LINES = ['Pip: The sea is blue and the dolphins are back!', 'Townspeople: Thank you, Detective Zabyr!', 'Captain Squall: A noisy beach is a happy beach.'];

/** Question-builder pairs: answer in, question out. Each has one grammar trap tile. */
export const BUILDER_PAIRS = [
  { answer: "I'm swimming.", question: 'What are you doing?', trap: 'is' },
  { answer: "He's surfing.", question: 'What is he doing?', trap: 'are' },
  { answer: "She's windsurfing.", question: 'What is she doing?', trap: 'am' },
  { answer: "Yes, they are.", question: 'Are they snorkelling?', trap: 'Is' },
  { answer: "No, she isn't.", question: 'Is she sailing?', trap: 'Are' },
  { answer: "They're kayaking.", question: 'What are they doing?', trap: 'is' },
];

const agreement = (prompt: string, answer: string, wrong: string[]): Question => ({
  prompt, answer: [answer], options: [answer, ...wrong], explain: answer,
  hint: 'Match the person and the positive or negative reply.', kind: 'agreement',
});

export const BOSS_ALARM_SECONDS = 10;
export const BOSS_BUILDER_SECONDS = 30;
export const BOSS_SPEECH_SECONDS = [45, 60] as const;

export function suppliedBossStage(phase: number): Stage {
  const questions: Question[] = phase === 0
    ? [
      ...(suppliedStages.find(s => s.id === 1)?.questions.slice(0, 2) ?? []).map(q => ({ ...q, kind: 'alarm' as const })),
      ...(laterStages.find(s => s.id === 5)?.questions.filter(q => q.kind === 'listen').slice(0, 2) ?? []),
      ...(laterStages.find(s => s.id === 6)?.questions.slice(0, 2) ?? []),
      ...(laterStages.find(s => s.id === 7)?.questions.slice(0, 2) ?? []),
      agreement("I'm swimming.", 'So is he.', ['So is she.', 'So do I.']),
      agreement("He isn't surfing.", "Neither is she.", ['So is he.', 'Neither do I.']),
    ]
    : phase === 1
      ? BUILDER_PAIRS.map(pair => ({
        prompt: pair.answer, answer: [pair.question], options: [], explain: pair.question,
        hint: 'Start with What, Are or Is. Check the person, then add the question mark.',
        kind: 'builder' as const, traps: [pair.trap],
      }))
      : [{
        prompt: 'Captain Squall thinks a quiet grey sea is best. Change her mind!',
        answer: [], options: [], explain: 'The Grizzle Machine stops and the sea turns blue.',
        hint: 'Say what three people are doing + one thing you are not doing; use two adjectives for a clean sea; ask Captain Squall a question.',
        kind: 'boss-speech' as const, speaking: true,
      }];

  return {
    id: BOSS_ID, phase, place: 'The Lighthouse', mission: BOSS_PHASE_NAMES[phase] ?? BOSS_PHASE_NAMES[0] ?? 'Final battle',
    desc: 'Turn off the Grizzle Machine!', x: 88, y: 12,
    image: CHAPTER_IMAGES[BOSS_ID] ?? '', emoji: '⚙️', questions,
    cutscene: BOSS_INTRO,
    taunt: phase === 2 ? 'Captain Squall: A noisy beach is a happy beach.' : 'Captain Squall: Stop talking! You are making my sea noisy!',
    ...(phase === 0 ? { timerSecs: BOSS_ALARM_SECONDS } : phase === 1 ? { timerSecs: BOSS_BUILDER_SECONDS } : {}),
    ...(phase === 2 ? { after: BOSS_DEFEAT } : {}),
  };
}

export const finaleChapters: Chapter[] = [
  {
    id: BOSS_ID, title: 'The Lighthouse', image: CHAPTER_IMAGES[BOSS_ID] ?? '',
    text: `At the end of the beach there is a tall white lighthouse, and the Grizzle Machine is sitting on top of it, humming.
Captain Squall is standing beside it in her sou'wester hat. "Eight grey beaches," she says. "No splashing. No laughing. No noise."
"But look at the sea," says Pip. "The dolphins can't live in grey water."
Captain Squall looks out. The bay is empty.
Zabyr takes a deep breath. "Max is reading his book. Holly is playing with her ball. Leo is surfing. We are having fun at the beach!"
The machine rattles. This is the final battle.`,
    glossary: {
      lighthouse: { meaning: 'A tall tower with a light to help boats.', emoji: '🗼' },
      rattles: { meaning: 'Shakes and makes a shaking sound.', emoji: '🌀' },
      bay: { meaning: 'A wide curve of sea along the coast.', emoji: '🌊' },
    },
    check: {
      prompt: 'Why does Captain Squall want a quiet sea?', answer: ['She hates noise and fun.'],
      options: ['She hates noise and fun.', 'She cannot swim.', 'She is afraid of dolphins.', 'She wants to sleep all day.'],
      explain: 'Captain Squall says no splashing, no laughing, no noise. She hates noise and fun.', hint: 'She says it three times.',
    },
  },
  {
    id: EPILOGUE_ID, title: 'The Blue Sea', image: CHAPTER_IMAGES[EPILOGUE_ID] ?? '',
    text: `The Grizzle Machine stops with a small pop, and the sea turns blue all the way to the horizon.
The dolphins come back first, jumping in the bay. Then the windsurfers, then the kayaks, then everyone else.
Amy phones her mum one more time. "We're having fun at the beach! Max is reading, Holly is playing with her ball, and Leo is surfing. He isn't snorkelling — he's surfing!"
And Captain Squall? She is in the water with a windsurf board, falling off it, laughing.
Zabyr takes a photo. Eight clean beaches, and one very happy sea.`,
    glossary: {
      horizon: { meaning: 'The line far away where the sea seems to meet the sky.', emoji: '🌅' },
      windsurfer: { meaning: 'A person who windsurfs.', emoji: '🏄' },
    },
    check: null,
  },
];
