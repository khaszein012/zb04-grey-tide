import type { Stage, Chapter, Question } from './adventure';
import cove from '@/assets/cove.jpg';
import watchers from '@/assets/watchers.jpg';
import machine from '@/assets/machine.jpg';
import yesno from '@/assets/yesno.jpg';
import swim from '@/assets/sport-swim.jpg';
import sail from '@/assets/sport-sail.jpg';
import dive from '@/assets/sport-dive.jpg';
import surf from '@/assets/sport-surf.jpg';
import kayak from '@/assets/sport-kayak.jpg';
import windsurf from '@/assets/sport-windsurf.jpg';
import snorkel from '@/assets/sport-snorkel.jpg';
import waterski from '@/assets/sport-waterski.jpg';
import spotIceCream from '@/assets/spot-ice-cream.jpg';
import spotSandwich from '@/assets/spot-sandwich.jpg';
import spotHat from '@/assets/spot-hat.jpg';
import spotSunglasses from '@/assets/spot-sunglasses.jpg';
import spotBird from '@/assets/spot-bird.jpg';
import spotFish from '@/assets/spot-fish.jpg';

const choice = (prompt: string, answer: string, wrong: string[], explain: string, kind?: Question['kind']): Question =>
  ({ prompt, answer: [answer], options: [answer, ...wrong], explain, hint: explain, ...(kind ? { kind } : {}) });

/** Mission 1 — the eight water sports from Unit 4 Lesson One. */
export const WATER_SPORTS: [string, string, string, string][] = [
  ['swim', 'You move your arms and legs and go through the water.', 'swimming', swim],
  ['sail', 'You are in a boat with a big sail and the wind pushes you.', 'sailing', sail],
  ['dive', 'You jump into the water head first and go down deep.', 'diving', dive],
  ['surf', 'You stand on a board and ride a wave.', 'surfing', surf],
  ['kayak', 'You sit in a small boat and move it with a paddle.', 'kayaking', kayak],
  ['windsurf', 'You hold a sail and stand on a board.', 'windsurfing', windsurf],
  ['snorkel', 'You swim on top of the water with a tube in your mouth to see the fish.', 'snorkelling', snorkel],
  ['waterski', 'A boat pulls you and you stand on one long board.', 'waterskiing', waterski],
];

const sportQuestions: Question[] = WATER_SPORTS.map(([, clue, answer, photo]) => ({
  ...choice(clue, `He's ${answer}.`, WATER_SPORTS.map(s => `He's ${s[2]}.`).filter(a => a !== `He's ${answer}.`).slice(0, 3), `That is ${answer}.`),
  kind: 'snapshot',
  photo,
  sayAfter: `He's ${answer}!`,
  hint: 'Which water sport is that?',
}));

const storyQuestions: Question[] = [
  choice('Amy phones her mum. What is Max doing?', "He's reading his book.", ["He's swimming.", "He's surfing.", "He's sleeping."], 'Amy says Max is reading his book.'),
  choice('What is Holly doing?', "She's playing with her ball.", ["She's swimming.", "She's sailing.", "She's diving."], 'Holly is playing with her ball.'),
  choice("Amy's mum asks about Leo. What is Leo really doing?", "He's surfing.", ["He's snorkelling.", "He's swimming.", "He's kayaking."], "Leo isn't snorkelling. He's surfing."),
  choice('What happens to Leo at the end of the story?', "He isn't surfing now. He's swimming!", ["He isn't swimming now. He's surfing!", "He isn't reading now. He's sailing!", "He isn't kayaking now. He's diving!"], "Leo falls, so he isn't surfing now. He's swimming!"),
];

/** Mission 3 — the -ing spelling rules from Lesson Two and Lesson Six. */
export const ING_WORDS: [string, string, string[]][] = [
  ['sail', 'sailing', ['l', 'n', 'i']],
  ['swim', 'swimming', ['m', 'e', 'g']],
  ['dive', 'diving', ['e', 'v', 'g']],
  ['surf', 'surfing', ['f', 'e', 'g']],
  ['kayak', 'kayaking', ['e', 'k', 'g']],
  ['snorkel', 'snorkelling', ['l', 'e', 'g']],
  ['cook', 'cooking', ['e', 'k', 'g']],
  ['take', 'taking', ['e', 'k', 'g']],
  ['write', 'writing', ['e', 't', 'g']],
  ['listen', 'listening', ['e', 'n', 'g']],
  ['read', 'reading', ['e', 'n', 'g']],
  ['run', 'running', ['e', 'n', 'g']],
];

const spellingQuestions: Question[] = ING_WORDS.map(([base, form, traps]) => ({
  prompt: `${base} →`,
  base,
  answer: [form],
  options: [],
  explain: `${base} → ${form}.`,
  hint: base.endsWith('e') ? 'Drop the e before adding -ing.' : ['swim', 'run', 'snorkel'].includes(base) ? 'Double the last letter before adding -ing.' : 'Just add -ing.',
  kind: 'spelling',
  traps,
}));

const ingRules: Question[] = [
  choice('sail → sailing: choose the rule.', 'Just add -ing', ['Drop the e', 'Double the last letter'], 'sail → sailing: just add -ing.', 'rule'),
  choice('dive → diving: choose the rule.', 'Drop the e', ['Just add -ing', 'Double the last letter'], 'dive → diving: drop the e, then add -ing.', 'rule'),
  choice('swim → swimming: choose the rule.', 'Double the last letter', ['Just add -ing', 'Drop the e'], 'swim → swimming: double the m, then add -ing.', 'rule'),
];

/** Mission 4 — Spot the Difference, from Lesson Three speaking. */
export const SPOT_PAIRS: [string, string, string, string, string][] = [
  ["He isn't eating an ice cream. He's eating a sandwich.", 'A sandwich', 'An ice cream', spotSandwich, spotIceCream],
  ["She isn't wearing a hat. She's wearing sunglasses.", 'Sunglasses', 'A hat', spotSunglasses, spotHat],
  ["He isn't waterskiing. He's surfing.", 'Surfing', 'Waterskiing', surf, waterski],
  ["She isn't looking at a bird. She's looking at a fish.", 'A fish', 'A bird', spotFish, spotBird],
];

const spotQuestions: Question[] = SPOT_PAIRS.map(([sentence, right, wrong, rightPhoto, wrongPhoto]) => ({
  prompt: sentence,
  answer: [right],
  options: [],
  explain: `${sentence} That is the first picture.`,
  hint: 'Look at both pictures. Which one matches the sentence?',
  kind: 'spot',
  photo: rightPhoto,
  afterPhoto: wrongPhoto,
}));

/** Mission 4 — affirmative and negative present continuous. */
const yesNoQuestions: Question[] = [
  choice("He ___ sleeping. He ___ eating.", "isn't … 's", ["'s … isn't", "aren't … 're", "'s … 's"], "He isn't sleeping. He's eating."),
  choice('They ___ taking photos. They ___ drawing pictures.', "aren't … 're", ["'re … aren't", "isn't … 's", "aren't … aren't"], "They aren't taking photos. They're drawing pictures."),
  choice('She ___ playing with a ball. She ___ reading a book.', "isn't … 's", ["'s … isn't", "aren't … 're", "isn't … aren't"], "She isn't playing with a ball. She's reading a book."),
  choice("We ___ swimming. We ___ windsurfing.", "aren't … 're", ["'re … aren't", "isn't … 's", "'re … 're"], "We aren't swimming. We're windsurfing."),
  choice("I ___ swimming in the sea.", "'m", ["'s", "'re", "isn't"], "I'm swimming in the sea."),
  choice('They ___ waterskiing in the sea.', "aren't", ["isn't", "'re", "'s"], "They aren't waterskiing. They're sailing."),
];

export const suppliedStages: Stage[] = [
  {
    id: 1, place: 'Splash Cove', mission: 'Water Sports', desc: 'Name each water sport and the grey water starts to clear.',
    x: 15, y: 70, image: cove, emoji: '🏄',
    cutscene: ['Pip: The whole sea has gone grey and gloopy!', 'Pip: Name the water sports and the water starts to clear.'],
    after: ['Amy: Look! The water is clearing!'],
    taunt: 'Captain Squall: No splashing! No laughing! No fun!',
    questions: [...sportQuestions, ...storyQuestions],
  },
  {
    id: 2, place: 'Beach Watchers', mission: 'Who Is Doing What', desc: 'Say what everyone is doing right now.',
    x: 32, y: 50, image: watchers, emoji: '🔍',
    cutscene: ['Pip: Everyone is busy, but nobody can say what they are doing!', 'Pip: Use He\u2019s, She\u2019s and They\u2019re.'],
    after: ['Holly: Now I can tell Mum all about it!'],
    taunt: 'Captain Squall: Words are wet and useless. Like my sea!',
    questions: [
      ...sportQuestions.slice(0, 4),
      ...storyQuestions.slice(0, 2),
      choice('What are you doing at the beach?', "I'm snorkelling.", ['I snorkelling.', 'I am snorkel.', 'I snorkel.'], "I'm snorkelling."),
      choice('Amy ___ ___ her mum at the beach.', 'is phoning', ['are phoning', 'am phoning', 'is phone'], 'Amy is phoning her mum.'),
      choice('Leo ___ ___ on his hands!', 'is standing', ['are standing', 'am standing', 'is stand'], 'Leo is standing on his hands!'),
      choice('Max and Holly ___ ___ in the sea.', 'are swimming', ['is swimming', 'am swimming', 'are swim'], 'Max and Holly are swimming.'),
    ],
  },
  {
    id: 3, place: 'The -ing Machine', mission: 'Spelling Changes', desc: 'Build each -ing word. Watch the tricky letters!',
    x: 50, y: 32, image: machine, emoji: '⚙️',
    timerSecs: 45,
    cutscene: ['Pip: The Grizzle Machine ate all the -ing endings!', 'Pip: Build the words. Some spellings change!'],
    after: ['The machine coughs and drops a pile of -ing endings.'],
    taunt: 'Captain Squall: -ing? I never finish anything either.',
    questions: [...spellingQuestions, ...ingRules,
      { ...choice('Which TWO words double their last letter?', 'swimming', ['sailing', 'running'], 'Swim → swimming and run → running double the last letter.'), answer: ['swimming', 'running'], legend: true },
    ],
  },
  {
    id: 4, place: 'Yes and No', mission: 'Spot the Difference', desc: 'Read the sentence and pick the picture that matches.',
    x: 68, y: 52, image: yesno, emoji: '🔍',
    cutscene: ['Pip: Two beaches look the same but they are different!', 'Pip: Read the sentence and pick the right picture.'],
    after: ['Pip: Now everyone can say what is NOT happening!'],
    taunt: 'Captain Squall: Everything looks grey to me.',
    questions: [...spotQuestions, ...yesNoQuestions],
  },
];

const chapter = (id: number, title: string, text: string, glossary: Chapter['glossary'], prompt: string, answer: string, wrong: string[]): Chapter =>
  ({ id, title, text, image: '', glossary, check: { prompt, answer: [answer], options: [answer, ...wrong], explain: answer, hint: answer } });

export const suppliedChapters: Chapter[] = [
  chapter(0, 'The Beach With No Colour', `Detective Zabyr has solved three mysteries. This week he is on holiday at last, in a little beach town called Sandpiper Cove.
But when he gets there, the sea is not blue. It is grey, thick and quiet. Nobody is swimming. Nobody is surfing. The beach umbrellas are shut.
"It's Captain Squall," says Pip. "She has a machine that turns the sea grey. She hates noise and fun."
Out on the water, the dolphins have gone away.
"Then we start at Splash Cove," says Zabyr.`,
    { gloopy: { meaning: 'Thick and sticky, like glue.', emoji: '🫧' }, cove: { meaning: 'A small bay with a beach.', emoji: '🏖️' }, umbrella: { meaning: 'You hold it over your head when it rains.', emoji: '☂️' } },
    'What has Captain Squall done to the sea?', 'Turned it grey and gloopy', ['Made it warm and clean', 'Filled it with fish', 'Made it deep and blue']),

  chapter(1, 'Eight Sports, One Grey Sea', `Splash Cove is the busiest beach in Sandpiper Cove, but today it is silent.
Amy is standing at the edge of the water with her phone. "I want to tell Mum what we are doing," she says, "but I don't know the words."
Pip points along the beach. "There's Max with his book, Holly with her ball, and Leo going out on his board."
Zabyr takes out his notebook. Eight water sports, eight grey patches of sea. Name them all and the water starts to clear.`,
    { clear: { meaning: 'Easy to see through.', emoji: '💧' }, 'water sports': { meaning: 'Sports you do in the sea or a lake.', emoji: '🏄' }, patch: { meaning: 'A small area that is different from the area around it.', emoji: '🩹' } },
    'Why does Amy want the words?', 'To tell her mum what they are doing', ['To write a school project', 'To name the dolphins', 'To read a book']),

  chapter(2, 'The Beach Watchers', `At the next beach, Amy is still on her phone.
"Max is reading his book," she says. "Holly is playing with her ball. And Leo — Leo is surfing!"
"He isn't snorkelling," says Max. "He's surfing. He's very good."
Then Leo tries to stand on his hands on the board, and everyone shouts.
"Leo is falling!" says Holly. "He isn't surfing now. He's swimming!"
Pip laughs. "That's the pattern. He's surfing. He isn't snorkelling."`,
    { pattern: { meaning: 'The way something usually happens.', emoji: '🧩' }, shout: { meaning: 'To say something very loudly.', emoji: '📣' } },
    'What is Leo doing at the end?', "He's swimming", ["He's surfing", "He's snorkelling", "He's sailing"]),

  chapter(3, 'The Machine That Ate -ing', `On the rocks above the beach there is a small grey machine, ticking quietly.
"The Grizzle Machine," whispers Pip. "It eats word endings. Look — every sign on the beach has lost its -ing."
Zabyr looks. The ice cream sign says EAT. The surfing sign says SURF. Nothing is happening any more.
"Some spellings change," says Pip. "Sail just adds -ing. Dive drops its e. Swim doubles its last letter."
Zabyr picks up his pen. Twelve words, three rules.`,
    { ending: { meaning: 'The last letters of a word.', emoji: '🔤' }, double: { meaning: 'To write a letter twice.', emoji: '✍️' }, sign: { meaning: 'A board with words or pictures on it.', emoji: '🪧' } },
    'What does the Grizzle Machine eat?', 'Word endings', ['Ice cream', 'Beach umbrellas', 'Photographs']),

  chapter(4, 'Two Beaches, One Sentence', `The next beach has a strange magic on it: two pictures of the same boy, side by side.
"Look carefully," says Pip. "In one picture he's eating a sandwich. In the other he's eating an ice cream."
Zabyr reads the sentence under the pictures. "The boy isn't eating an ice cream. He's eating a sandwich."
"So we pick the picture that matches," says Pip. "Get it right and the grey washes away."
Zabyr looks very carefully. Both pictures look the same at first.`,
    { match: { meaning: 'To be the same as something else.', emoji: '🧩' }, carefully: { meaning: 'Looking closely and taking your time.', emoji: '👀' } },
    'What is the boy eating in the right picture?', 'A sandwich', ['An ice cream', 'A ball', 'A book']),
].map(ch => ({ ...ch, image: '' }));
