import type { Stage, Chapter, Question } from './adventure';
import allwords from '@/assets/allwords.jpg';
import dolphinbay from '@/assets/dolphinbay.jpg';
import cleansea from '@/assets/cleansea.jpg';
import reporter from '@/assets/reporter.jpg';
import dolphinJump from '@/assets/dolphin-jump.jpg';
import dolphinFamily from '@/assets/dolphin-family.jpg';
import dolphinSound from '@/assets/dolphin-sound.jpg';
import seaClean from '@/assets/sea-clean.jpg';
import seaPolluted from '@/assets/sea-polluted.jpg';

const choice = (prompt: string, answer: string, wrong: string[], explain?: string, kind?: Question['kind']): Question =>
  ({ prompt, answer: [answer], options: [answer, ...wrong], explain: explain ?? answer, hint: explain ?? answer, ...(kind ? { kind } : {}) });

/** Mission 5 — the all phonics family from Unit 4 Lesson Four. */
export const ALL_WORDS: [string, string, string[]][] = [
  ['ball', 'b', ['m', 'w', 't']],
  ['mall', 'm', ['b', 'w', 's']],
  ['wall', 'w', ['b', 'm', 't']],
  ['tall', 't', ['b', 's', 'w']],
  ['small', 'sm', ['b', 'm', 't']],
];

export const ALL_CHANT = "I'm in a mall. A mall, mall, mall. Some people are tall. Some are small, small, small. I'm going to buy a ball, ball, ball. I don't know which to buy. I like them all, all, all.";

const allSpelling: Question[] = ALL_WORDS.map(([word, start, traps]) => ({
  prompt: `${start}___ →`,
  base: `${start}___`,
  answer: [word],
  options: [],
  explain: `${start}___ → ${word}. The letters all say /ɔː/.`,
  hint: 'These words all end in -all and rhyme.',
  kind: 'spelling',
  traps,
}));

const allListen: Question[] = [
  { ...choice('Listen. Which -all word do you hear?', 'ball', ['mall', 'wall', 'tall'], 'You heard ball.'), kind: 'listen', pair: ['ball', 'mall'] },
  { ...choice('Listen. Which -all word do you hear?', 'tall', ['small', 'wall', 'ball'], 'You heard tall.'), kind: 'listen', pair: ['tall', 'small'] },
  { ...choice('Listen. Which -all word do you hear?', 'wall', ['mall', 'ball', 'tall'], 'You heard wall.'), kind: 'listen', pair: ['wall', 'mall'] },
];

const allVowel: Question[] = [
  { ...choice('Fix the word: b_ll', 'a', ['e', 'i', 'o'], 'b_ll → ball.'), base: 'b_ll', kind: 'vowel' },
  { ...choice('Fix the word: t_ll', 'a', ['e', 'i', 'o'], 't_ll → tall.'), base: 't_ll', kind: 'vowel' },
  { ...choice('Fix the word: sm_ll', 'a', ['e', 'i', 'o'], 'sm_ll → small.'), base: 'sm_ll', kind: 'vowel' },
  { ...choice('Fix the word: w_ll', 'a', ['e', 'i', 'o'], 'w_ll → wall.'), base: 'w_ll', kind: 'vowel', legend: true },
];

/** Mission 6 — the Dolphin Dreams brochure from Unit 4 Lesson Five. */
export const DOLPHIN_FACTS = {
  title: 'Dolphin Dreams',
  question: 'Are you looking for the perfect holiday?',
  intro: 'Dolphin Dreams is the perfect holiday! We take people in our boats and we visit dolphins in the sea. You can swim with beautiful dolphins!',
  facts: [
    "Dolphins aren't dangerous. They are very friendly. They love playing with people.",
    "Dolphins can't breathe under water, but they can stay under water for about 15 minutes.",
    'Dolphins live in families.',
    'Dolphins have names. Their names are special sounds. They use the sounds to call their friends and family.',
    "Dolphins can't live in polluted water, but a lot of the sea is polluted. We want to make the sea a clean and safe place for dolphins.",
  ],
};

export const VERDICTS = ['TRUE ✅', 'FALSE ❌', 'NOT IN THE TEXT ❓'];
const fact = (prompt: string, verdict: number, correction?: Question): Question => {
  const base = choice(prompt, VERDICTS[verdict] ?? '', VERDICTS.filter((_, i) => i !== verdict), undefined, 'forum');
  return correction ? { ...base, correction } : base;
};

const WHO_NAMES = ['the dolphins', 'Pip', 'Zabyr', 'Captain Squall'];

/** Mission 7 — adjectives to describe places, from Unit 4 Lesson Five. */
export const SEA_ADJECTIVES: [string, string, string, string][] = [
  ['clean', 'The water is clear and you can see the fish.', 'clean', seaClean],
  ['polluted', 'The water is dirty and full of rubbish.', 'polluted', seaPolluted],
  ['safe', 'It is calm and nothing can hurt you here.', 'safe', seaClean],
  ['dangerous', 'The waves are big and the rocks are sharp.', 'dangerous', seaPolluted],
  ['beautiful', 'The beach is lovely with golden sand and blue sea.', 'beautiful', dolphinJump],
  ['ugly', 'The beach is grey with old cans and plastic bags.', 'ugly', seaPolluted],
];

const adjectiveQuestions: Question[] = SEA_ADJECTIVES.map(([word, clue, answer, photo]) => ({
  ...choice(clue, answer, SEA_ADJECTIVES.map(a => a[2]).filter(a => a !== answer).slice(0, 3), `That sea or beach is ${answer}.`),
  kind: 'snapshot',
  photo,
  sayAfter: `It is ${answer}!`,
  hint: 'Which word describes this place?',
}));

export const laterStages: Stage[] = [
  {
    id: 5, place: 'All Words Wall', mission: 'The -all Family', desc: 'Ball, mall, wall, tall, small. They all rhyme!',
    x: 50, y: 72, image: allwords, emoji: '🧱',
    cutscene: ['Pip: The Grizzle Machine took the -all endings!', 'Pip: Build the words. They all rhyme with ball.'],
    after: ['The wall of grey bricks turns into a bright beach wall.'],
    taunt: 'Captain Squall: Rhymes are noisy. I hate noise.',
    questions: [...allSpelling, ...allListen, ...allVowel,
      { prompt: 'Read the -all chant three times, getting faster each time.', options: [], answer: [], explain: ALL_CHANT, hint: ALL_CHANT, kind: 'twister', speaking: true },
    ],
  },
  {
    id: 6, place: 'Dolphin Bay', mission: 'Dolphin Dreams', desc: 'Read the brochure. TRUE, FALSE or NOT IN THE TEXT?',
    x: 72, y: 30, image: dolphinbay, emoji: '🐬',
    cutscene: ['Pip: The dolphins left because the sea is grey!', 'Pip: Read the Dolphin Dreams brochure. TRUE, FALSE or NOT IN THE TEXT?'],
    after: ['A dolphin leaps out of the clearing water.'],
    taunt: 'Captain Squall: Dolphins are far too cheerful.',
    questions: [
      fact("Dolphins aren't dangerous.", 0),
      fact('Dolphins love playing with people.', 0),
      fact("Dolphins can't breathe under water.", 0),
      fact('Dolphins can stay under water for about 15 minutes.', 0),
      fact('Dolphins live in families.', 0),
      fact('Dolphins have names.', 0),
      fact('Dolphins can live in polluted water.', 1, choice('Choose the corrected sentence.', "Dolphins can't live in polluted water.", ["Dolphins can't living in polluted water.", "Dolphins doesn't live in polluted water.", 'Dolphins can lives in polluted water.'])),
      fact('A lot of the sea is polluted.', 0),
      fact('Dolphins use sounds to call their friends.', 0),
      fact('Dolphin Dreams holidays are free.', 2),
      fact('Dolphins are fish.', 1, choice('Choose the corrected sentence.', 'Dolphins are not fish.', ['Dolphins is not fish.', 'Dolphins are no fish.', 'Dolphins am not fish.'])),
      fact('Dolphin Dreams has 300 boats.', 2),
      ...[['Who love playing with people?', 'the dolphins'], ['Who wants a clean and safe sea?', 'the dolphins'], ['Who has a machine?', 'Captain Squall'], ['Who has a magnifying glass?', 'Zabyr']]
        .map(([prompt, answer]) => choice(prompt ?? '', answer ?? '', WHO_NAMES.filter(x => x !== answer), undefined, 'who')),
    ],
  },
  {
    id: 7, place: 'Clean Sea Club', mission: 'Describing Places', desc: 'Clean or polluted? Safe or dangerous? Say which.',
    x: 78, y: 62, image: cleansea, emoji: '🫧',
    cutscene: ['Pip: Look at the sea. Which words describe it?', 'Pip: Clean, polluted, safe, dangerous, beautiful, ugly.'],
    after: ['Six grey patches turn into six bright blue ones.'],
    taunt: 'Captain Squall: Grey is a beautiful colour. My favourite.',
    questions: [...adjectiveQuestions,
      choice('The dolphins want a ___ sea.', 'clean and safe', ['dirty and polluted', 'grey and gloopy', 'cold and ugly'], 'The dolphins want a clean and safe sea.'),
      choice('A lot of the sea is polluted. It is not ___.', 'clean', ['beautiful', 'safe', 'big'], 'Polluted water is not clean.'),
      { prompt: 'Describe your favourite beach: is it clean, safe, beautiful? Say why.', options: [], answer: [], explain: 'My favourite beach is clean and safe. It is beautiful because the sea is blue and the sand is golden.', hint: 'Use two adjectives and because.', emoji: '🎙️', speaking: true, helper: 'My favourite beach is ___ and ___. It is ___ because ___.' },
    ],
  },
  {
    id: 8, place: 'Beach Day Reporter', mission: 'Tell Mum Everything', desc: 'Amy phones Mum. Tell her what everyone is doing!',
    x: 88, y: 34, image: reporter, emoji: '📞',
    cutscene: ['Pip: Amy is on the phone to Mum again!', 'Pip: Tell her what everyone is doing at the beach.'],
    after: ['Mum can finally hear the whole beach day.'],
    taunt: 'Captain Squall: Stop telling your mum things!',
    questions: [
      choice('I like ___ dolphins. (watch)', 'watching', ['watch', 'watches', 'am watch'], 'I like watching dolphins.'),
      choice('Do you like ___ photos? (take)', 'taking', ['take', 'takes', 'taked'], 'Do you like taking photos?'),
      choice('I like ___. (cook)', 'cooking', ['cook', 'cooks', 'cookinged'], 'I like cooking.'),
      choice('Does Joanna like ___ emails? (write)', 'writing', ['write', 'writes', 'writting'], 'Does Joanna like writing emails?'),
      choice("My friend doesn't like ___ to music. (listen)", 'listening', ['listen', 'listens', 'listenning'], "My friend doesn't like listening to music."),
      choice('Do you like ___? (read)', 'reading', ['read', 'reads', 'redding'], 'Do you like reading?'),
      choice('Leo is ___ now. He fell off his board.', 'swimming', ['surfing', 'sailing', 'snorkelling'], 'Leo is swimming now, because he fell off his board.'),
      choice('Max is ___ his book on the beach.', 'reading', ['writing', 'cooking', 'taking'], 'Max is reading his book.'),
      choice('Holly is ___ with her ball.', 'playing', ['sailing', 'diving', 'surfing'], 'Holly is playing with her ball.'),
      { prompt: 'Phone a friend: say what three people are doing at the beach and one thing they are not doing.', options: [], answer: [], explain: 'Max is reading his book. Holly is playing with her ball. Leo is surfing. He is not snorkelling.', hint: 'Three things they ARE doing + one thing they are NOT doing.', emoji: '🎙️', speaking: true, helper: '___ is ___. ___ is ___. ___ is ___. He/She is not ___.' },
    ],
  },
];

const chapter = (id: number, title: string, text: string, glossary: Chapter['glossary'], prompt: string, answer: string, wrong: string[]): Chapter =>
  ({ id, title, text, image: '', glossary, check: { prompt, answer: [answer], options: [answer, ...wrong], explain: answer, hint: answer } });

export const laterChapters: Chapter[] = [
  chapter(5, 'The Wall of Grey Bricks', `On the way to Dolphin Bay there is a long grey wall. It runs right across the beach.
"It's made of word endings," says Pip. "Ball, mall, wall, tall, small — Captain Squall took them all."
Zabyr touches the wall. It is cold and hard.
"They all rhyme," says Pip. "They all end in -all. Put the letters back and the wall comes down."
Zabyr starts with ball, because he has one in his bag.`,
    { rhyme: { meaning: 'Words that end with the same sound.', emoji: '🎵' }, brick: { meaning: 'A small block used to build walls.', emoji: '🧱' } },
    'What are the words on the wall?', 'Words ending in -all', ['Words ending in -ing', 'Words ending in -e', 'Dolphin names']),

  chapter(6, 'The Bay With No Dolphins', `Dolphin Bay is quiet. The water is grey and there are no dolphins anywhere.
Pip finds an old brochure blowing along the sand. "Dolphin Dreams," he reads. "Are you looking for the perfect holiday?"
The brochure says dolphins are friendly and love playing with people. It says they can stay under water for about fifteen minutes. It says they live in families and call each other with special sounds.
But it also says dolphins can't live in polluted water.
"That's why they left," says Zabyr. "We have to clean the sea."`,
    { brochure: { meaning: 'A small book that gives information about something.', emoji: '📖' }, friendly: { meaning: 'Kind and happy to be with you.', emoji: '🐬' } },
    'Why did the dolphins leave Dolphin Bay?', 'Because the water is polluted', ['Because they are on holiday', 'Because it is too hot', 'Because Captain Squall called them']),

  chapter(7, 'Six Words for Water', `The next beach is strange: half of it is bright and blue, and half is grey and full of rubbish.
"Two beaches, side by side," says Pip. "One is clean. One is polluted."
Zabyr walks along the line between them. On the clean side the water is safe and beautiful. On the grey side it is dangerous and ugly.
"Six words," says Pip. "Clean, polluted, safe, dangerous, beautiful, ugly."
"Pick the right one for each place," says Zabyr, "and the whole beach goes back to normal."`,
    { rubbish: { meaning: 'Things that people have thrown away.', emoji: '🗑️' }, normal: { meaning: 'The way things usually are.', emoji: '✅' } },
    'What is the grey side of the beach like?', 'Polluted, dangerous and ugly', ['Clean, safe and beautiful', 'Warm and sunny', 'Full of dolphins']),

  chapter(8, 'The Phone Call', `The last beach has a big phone box standing in the sand, and it is ringing.
"It's Amy," says Pip. "She's telling her mum about the whole beach day."
But every time Amy speaks, the words come out wrong. "Max is read his book," she says. "Holly is play with her ball."
"The Grizzle Machine ate the -ing endings," says Zabyr. "Help her put them back."
Amy takes a deep breath and starts again, slowly and carefully.`,
    { 'phone box': { meaning: 'A small box with a telephone inside.', emoji: '☎️' }, ring: { meaning: 'To make a sound like a telephone.', emoji: '🔔' } },
    'What is wrong with what Amy says?', 'Her words have no -ing', ['Her words have no -all', 'Her words have no e', 'Her words are too long']),
].map(ch => ({ ...ch, image: '' }));
