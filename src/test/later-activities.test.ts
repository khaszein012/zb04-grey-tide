import { describe,it,expect } from 'vitest';
import { STAGES,CHAPTERS,orderedQuestions,questionOptions,isCorrect } from '@/game/adventure';
import { ALL_WORDS,ALL_CHANT,DOLPHIN_FACTS,VERDICTS,SEA_ADJECTIVES } from '@/game/later-content';
import { spotCorrect,spotSides,spotAnswer } from '@/game/unit4-rules';
import { TWISTER_RATES,replyPoints,REPLY_SECONDS } from '@/game/activity-rules';

const stage=(id:number)=>{const s=STAGES.find(s=>s.id===id);if(!s)throw Error(`Missing stage ${id}`);return s;};

describe('Mission 5 — the -all family',()=>{
 it('has five -all words that all rhyme',()=>{
  expect(ALL_WORDS.map(w=>w[0])).toEqual(['ball','mall','wall','tall','small']);
  const spelled=stage(5).questions.filter(q=>q.kind==='spelling');
  expect(spelled).toHaveLength(5);
  for(const q of spelled)expect(q.answer[0]).toMatch(/all$/);
 });

 it('listens with two-word pairs and three questions',()=>{
  const listens=stage(5).questions.filter(q=>q.kind==='listen');
  expect(listens).toHaveLength(3);
  for(const q of listens)expect(q.pair).toHaveLength(2);
 });

 it('repairs four -all words with four vowels available',()=>{
  const vowels=stage(5).questions.filter(q=>q.kind==='vowel');
  expect(vowels.map(q=>[q.base,q.answer[0]])).toEqual([['b_ll','a'],['t_ll','a'],['sm_ll','a'],['w_ll','a']]);
  for(const q of vowels)expect(questionOptions(q,'Explorer')).toHaveLength(4);
 });

 it('keeps one vowel repair for Legend only',()=>{
  const legend=stage(5).questions.filter(q=>q.kind==='vowel'&&q.legend);
  expect(legend).toHaveLength(1);
  expect(orderedQuestions(stage(5),'Detective').filter(q=>q.kind==='vowel')).toHaveLength(3);
  expect(orderedQuestions(stage(5),'Legend').filter(q=>q.kind==='vowel')).toHaveLength(4);
 });

 it('ends with the -all chant as a spoken task',()=>{
  expect(ALL_CHANT).toMatch(/mall/);
  const order=orderedQuestions(stage(5),'Detective');
  expect(order.at(-1)?.speaking).toBe(true);
 });
});

describe('Mission 6 — the Dolphin Dreams brochure',()=>{
 it('keeps the textbook facts exactly',()=>{
  expect(DOLPHIN_FACTS.title).toBe('Dolphin Dreams');
  expect(DOLPHIN_FACTS.intro).toContain('swim with beautiful dolphins');
  expect(DOLPHIN_FACTS.facts.some(f=>f.includes('15 minutes'))).toBe(true);
  expect(DOLPHIN_FACTS.facts.some(f=>f.includes('live in families'))).toBe(true);
 });

 it('has twelve verdicts followed by four Who questions',()=>{
  expect(stage(6).questions.filter(q=>q.kind==='forum')).toHaveLength(12);
  expect(stage(6).questions.filter(q=>q.kind==='who')).toHaveLength(4);
 });

 it('marks a statement FALSE only when the brochure contradicts it',()=>{
  const verdicts=stage(6).questions.filter(q=>q.kind==='forum').map(q=>q.answer[0]);
  expect(verdicts).toEqual(['TRUE ✅','TRUE ✅','TRUE ✅','TRUE ✅','TRUE ✅','TRUE ✅','FALSE ❌','TRUE ✅','TRUE ✅','NOT IN THE TEXT ❓','FALSE ❌','NOT IN THE TEXT ❓']);
 });

 it('supplies the corrected sentence for every FALSE verdict',()=>{
  const falses=stage(6).questions.filter(q=>q.kind==='forum'&&q.answer[0]==='FALSE ❌');
  expect(falses.map(q=>q.correction?.answer[0])).toEqual(["Dolphins can't live in polluted water.",'Dolphins are not fish.']);
  for(const q of falses){if(!q.correction)throw Error('Missing correction');expect(q.correction.options).toHaveLength(4);expect(isCorrect(q.correction,q.correction.answer)).toBe(true);}
 });

 it('uses three verdicts only',()=>{
  expect(VERDICTS).toEqual(['TRUE ✅','FALSE ❌','NOT IN THE TEXT ❓']);
  for(const q of stage(6).questions.filter(q=>q.kind==='forum'))expect(questionOptions(q,'Explorer')).toHaveLength(3);
 });
});

describe('Mission 7 — adjectives for places',()=>{
 it('covers all six adjectives from the textbook page',()=>{
  expect(SEA_ADJECTIVES.map(a=>a[2])).toEqual(['clean','polluted','safe','dangerous','beautiful','ugly']);
  const described=stage(7).questions.filter(q=>q.kind==='snapshot');
  expect(described).toHaveLength(6);
  for(const q of described){expect(q.photo).toBeTruthy();expect(q.sayAfter).toMatch(/^It is /);}
 });

 it('ties the adjectives back to what the dolphins need',()=>{
  const answers=stage(7).questions.map(q=>q.answer[0]);
  expect(answers).toContain('clean and safe');
  expect(answers).toContain('clean');
 });

 it('leaves the spoken task last',()=>{
  expect(orderedQuestions(stage(7),'Detective').at(-1)?.speaking).toBe(true);
 });
});

describe('Mission 8 — telling Mum',()=>{
 it('practises the -ing forms from the writing page',()=>{
  const answers=stage(8).questions.map(q=>q.answer[0]);
  for(const form of ['watching','taking','cooking','writing','listening','reading'])expect(answers).toContain(form);
 });

 it('revises the Unit 4 story characters',()=>{
  const answers=stage(8).questions.map(q=>q.answer[0]);
  expect(answers).toContain('swimming');
  expect(answers).toContain('reading');
  expect(answers).toContain('playing');
 });

 it('has nine written questions and one spoken task',()=>{
  expect(stage(8).questions.filter(q=>!q.speaking)).toHaveLength(9);
  expect(stage(8).questions.filter(q=>q.speaking)).toHaveLength(1);
  expect(orderedQuestions(stage(8),'Detective').at(-1)?.speaking).toBe(true);
 });

 it('uses a 45-second speaking ring and three speeds',()=>{
  expect(REPLY_SECONDS).toBe(45);
  expect(TWISTER_RATES).toEqual([.85,1,1.15]);
  expect([replyPoints(1,false),replyPoints(2,false),replyPoints(3,false)]).toEqual([1,2,3]);
  expect([replyPoints(1,true),replyPoints(2,true),replyPoints(3,true)]).toEqual([2,4,6]);
 });
});

describe('Spot the Difference rules',()=>{
 it('judges the picture that was tapped, not its position',()=>{
  const spot=stage(4).questions.find(q=>q.kind==='spot');
  if(!spot)throw Error('Missing spot question');
  expect(spotCorrect(spot,spot.photo??'')).toBe(true);
  expect(spotCorrect(spot,spot.afterPhoto??'')).toBe(false);
 });

 it('swaps the two sides on every attempt',()=>{
  const spot=stage(4).questions.find(q=>q.kind==='spot');
  if(!spot)throw Error('Missing spot question');
  const seen=new Set<string>();
  for(const seed of [0.1,0.5,0.9])for(const s of spotSides(spot,()=>seed))seen.add(`${s.label}:${s.photo}`);
  expect(seen.size).toBeGreaterThan(2);
  for(const seed of [0.1,0.5,0.9]){
   const sides=spotSides(spot,()=>seed);
   expect(sides.map(s=>s.label)).toEqual(['A','B']);
   expect(new Set(sides.map(s=>s.photo))).toEqual(new Set([spot.photo,spot.afterPhoto]));
  }
 });

 it('uses the matching description as the feedback answer',()=>{
  const spot=stage(4).questions.find(q=>q.kind==='spot');
  if(!spot)throw Error('Missing spot question');
  expect(spotAnswer(spot)).toBe(spot.answer[0]);
 });
});

describe('Missions 5–8 chapters',()=>{
 it('uses the supplied checks and glossary',()=>{
  expect(CHAPTERS[5]?.check?.answer).toEqual(['Words ending in -all']);
  expect(CHAPTERS[6]?.check?.answer).toEqual(['Because the water is polluted']);
  expect(CHAPTERS[7]?.check?.answer).toEqual(['Polluted, dangerous and ugly']);
  expect(CHAPTERS[8]?.check?.answer).toEqual(['Her words have no -ing']);
  expect(CHAPTERS[5]?.glossary).toHaveProperty('rhyme');
  expect(CHAPTERS[6]?.glossary).toHaveProperty('brochure');
  expect(CHAPTERS[7]?.glossary).toHaveProperty('rubbish');
 });

 it('has four distinct options containing the answer for every chapter check',()=>{
  for(const c of CHAPTERS){if(!c.check)continue;expect(c.check.options).toHaveLength(4);expect(new Set(c.check.options).size).toBe(4);expect(c.check.options).toContain(c.check.answer[0]);}
 });
});