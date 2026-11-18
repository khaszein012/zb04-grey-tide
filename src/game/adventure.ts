import map from '@/assets/sandpiper.jpg';
import { suppliedStages, suppliedChapters } from './supplied-content';
import { laterStages, laterChapters } from './later-content';
import { suppliedBossStage, BOSS_PHASE_NAMES, finaleChapters } from './finale-content';
import { CHAPTER_IMAGES } from './chapter-images';
import { BOSS_ID,EPILOGUE_ID,MISSION_COUNT } from './episode-shape';

export type Difficulty = 'Explorer' | 'Detective' | 'Legend';
export const DIFFICULTIES: Difficulty[] = ['Explorer', 'Detective', 'Legend'];
export const DIFFICULTY_RULES = { Explorer: { options: 3, timer: 25, helpers: true }, Detective: { options: 4, timer: 15, helpers: false }, Legend: { options: 4, timer: 10, helpers: false } } as const;
export const TIMER_LENGTHS = [10, 15, 20, 25] as const;

export type AskTask = { questionOptions: string[]; replyOptions: string[] };
export type PunctuateTask = { words: string[]; caps: number[]; end: '.' | '?' | '!' };

export type Question = {
  prompt: string; options: string[]; answer: string[]; explain: string; hint: string;
  emoji?: string; speech?: string; speaking?: boolean; helper?: string; legend?: boolean;
  kind?: 'snapshot' | 'spot' | 'ask' | 'punctuate' | 'spelling' | 'rule' | 'forum' | 'who' | 'transform' | 'listen' | 'vowel' | 'meaning' | 'alarm' | 'agreement' | 'builder' | 'boss-speech' | 'twister' | 'reply';
  photo?: string; base?: string; traps?: string[]; sayAfter?: string; correction?: Question; pair?: string[]; afterPhoto?: string;
  ask?: AskTask; punctuate?: PunctuateTask;
};

const q = (prompt: string, answer: string, wrong: string[], explain: string, hint: string, emoji?: string): Question => ({ prompt, options: [answer, ...wrong], answer: [answer], explain, hint, ...(emoji ? { emoji } : {}) });

export type Stage = { id: number; place: string; mission: string; desc: string; x: number; y: number; image: string; emoji: string; questions: Question[]; cutscene: string[]; taunt: string; after?: string[]; phase?: number; timerSecs?: number };

/** Stages are concatenated in id order; a later batch can replace one by reusing its id. */
export const STAGES: Stage[] = [...suppliedStages, ...laterStages].sort((a, b) => a.id - b.id);
/**
 * Chapter numbering is derived, so an episode with more missions needs no engine edit:
 * chapter 0 is the intro, 1..N the missions, N+1 the boss chapter and N+2 the epilogue.
 */
export const STAGE_IDS = STAGES.map(s => s.id);
export { BOSS_ID, EPILOGUE_ID, MISSION_COUNT };
if (STAGES.length !== MISSION_COUNT) throw new Error(`This episode declares ${MISSION_COUNT} missions but supplies ${STAGES.length} stages.`);
export const BOSS_PHASES = BOSS_PHASE_NAMES;
export const bossStage = suppliedBossStage;
export const MAP_IMAGE = map;

export type Chapter = { id: number; title: string; text: string; image: string; glossary: Record<string, { meaning: string; emoji: string }>; check: Question | null };
export const CHAPTERS: Chapter[] = [...suppliedChapters, ...laterChapters, ...finaleChapters]
  .map(chapter => ({ ...chapter, image: CHAPTER_IMAGES[chapter.id] ?? chapter.image }))
  .sort((a, b) => a.id - b.id);

export const INTRO_LINES = ["Previously… Detective Zabyr gave every gadget back in Gadgeton!", "Pip: Zabyr! We are on holiday at Sandpiper Cove — but the sea has turned GREY!", "Captain Squall: No splashing! No laughing! No fun! My Grizzle Machine sees to that.", 'Pip: And the dolphins have gone. Nobody can say what they are doing!'];

/**
 * Activities where the student assembles letters or words and a countdown still makes
 * sense as a challenge, but not at the difficulty timer's speed.
 */
export const BUILD_SECONDS = 45;
export const BUILD_KINDS = ['spelling', 'builder'];
/** Kinds that run no countdown at all: the thinking is the task, not the speed. */
export const UNTIMED_KINDS = ['punctuate', 'ask', 'spot', 'transform', 'twister', 'reply', 'boss-speech'];

/** Kinds that render their own activity UI, so PlayStage never draws option buttons for them. */
export const ACTIVITY_KINDS = ['spot', 'ask', 'punctuate', 'spelling', 'transform', 'twister', 'reply', 'builder', 'boss-speech'];
/** Kinds that keep their whole option list at every difficulty. */
const FIXED_OPTION_KINDS = ['rule', 'forum', 'who', 'listen', 'vowel', 'meaning', 'agreement'];

export const questionOptions = (q: Question, difficulty: Difficulty): string[] => {
  if (ACTIVITY_KINDS.includes(q.kind ?? '')) return [];
  if (FIXED_OPTION_KINDS.includes(q.kind ?? '')) return [...q.options];
  const count = q.answer.length > 1 ? 4 : DIFFICULTY_RULES[difficulty].options;
  const options = [...q.answer, ...q.options.filter((o) => !q.answer.includes(o))].slice(0, count);
  return options.map((v, i) => ({ v, key: (i * 7 + q.prompt.length) % 11 })).sort((a, b) => a.key - b.key).map((x) => x.v);
};

export const questionsFor = (stage: Stage, difficulty: Difficulty) => stage.questions.filter((q) => !q.legend || difficulty === 'Legend');
export const isCorrect = (q: Question, choices: string[]) => choices.length === q.answer.length && q.answer.every((a) => choices.includes(a));

export function shuffled<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); const a = result[i]; const b = result[j]; if (a !== undefined && b !== undefined) { result[i] = b; result[j] = a; } }
  return result;
}

/**
 * Each mission keeps its own teaching order: the new activity leads, practice follows,
 * and anything spoken goes last so a teacher can pick it up at the end.
 */
export function orderedQuestions(stage: Stage, difficulty: Difficulty, random: () => number = Math.random): Question[] {
  const qs = questionsFor(stage, difficulty);
  const group = (...kinds: string[]) => kinds.flatMap((kind) => shuffled(qs.filter((q) => q.kind === kind), random));
  const rest = (skip: string[]) => shuffled(qs.filter((q) => !skip.includes(q.kind ?? '')), random);
  const speakingLast = (items: Question[]) => [...items.filter((q) => !q.speaking), ...items.filter((q) => q.speaking)];
  switch (stage.id) {
    // Spelling: four words, then the rule they share, and so on.
    case 3: {
      const words = shuffled(qs.filter(q => q.kind === 'spelling'), random);
      const rules = qs.filter(q => q.kind === 'rule');
      const woven: Question[] = [];
      words.forEach((word, i) => { woven.push(word); const rule = rules[Math.floor(i / 4)]; if ((i + 1) % 4 === 0 && rule) woven.push(rule); });
      return [...woven, ...qs.filter(q => q.legend && q.kind !== 'spelling' && q.kind !== 'rule')];
    }
    case 4: return speakingLast([...group('spot'), ...rest(['spot'])]);
    case 5: return [...group('spelling', 'listen', 'vowel'), ...rest(['spelling', 'listen', 'vowel'])];
    case 6: return [...group('forum'), ...group('who'), ...rest(['forum', 'who'])];
    case 8: return speakingLast(shuffled(qs, random));
    default: return speakingLast(shuffled(qs, random));
  }
}