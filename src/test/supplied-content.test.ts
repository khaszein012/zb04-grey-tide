import { describe,it,expect } from 'vitest';
import { STAGES,CHAPTERS,orderedQuestions,questionOptions,isCorrect,shuffled,type Question } from '@/game/adventure';
import { WATER_SPORTS,ING_WORDS,SPOT_PAIRS,suppliedStages } from '@/game/supplied-content';

const stage=(id:number)=>{const s=STAGES.find(s=>s.id===id);if(!s)throw Error(`Missing stage ${id}`);return s;};

describe('Episode 4 missions 1–4',()=>{
 it('has exactly eight water sports with their -ing forms and photos',()=>{
  expect(WATER_SPORTS.map(s=>s[2])).toEqual(['swimming','sailing','diving','surfing','kayaking','windsurfing','snorkelling','waterskiing']);
  const sports=stage(1).questions.filter(q=>q.kind==='snapshot');
  expect(sports).toHaveLength(8);
  for(const q of sports){expect(q.photo).toBeTruthy();expect(q.sayAfter).toMatch(/^He's /);}
 });

 it('keeps the story questions about Max, Holly and Leo',()=>{
  const answers=stage(1).questions.map(q=>q.answer[0]);
  expect(answers).toContain("He's reading his book.");
  expect(answers).toContain("She's playing with her ball.");
  expect(answers).toContain("He isn't surfing now. He's swimming!");
 });

 it('revises four sports and the story in mission two',()=>{
  const s=stage(2);
  expect(s.questions).toHaveLength(10);
  // The first four are the same snapshot cards the student met in mission one.
  expect(s.questions.slice(0,4).every(q=>q.kind==='snapshot')).toBe(true);
 });

 it('has twelve -ing words covering all three spelling rules',()=>{
  expect(ING_WORDS).toHaveLength(12);
  const forms=ING_WORDS.map(w=>w[1]);
  expect(forms).toContain('sailing');expect(forms).toContain('diving');expect(forms).toContain('swimming');
  expect(forms).toContain('cooking');expect(forms).toContain('writing');expect(forms).toContain('running');
  const spelled=stage(3).questions.filter(q=>q.kind==='spelling');
  expect(spelled).toHaveLength(12);
  for(const q of spelled){expect(q.base).toBeTruthy();expect(q.traps?.length).toBeGreaterThanOrEqual(2);expect(isCorrect(q,q.answer)).toBe(true);}
 });

 it('weaves the three rules in after every fourth word',()=>{
  const order=orderedQuestions(stage(3),'Detective',()=>0.5);
  const rules=order.filter(q=>q.kind==='rule').map(q=>q.answer[0]);
  expect(rules).toEqual(['Just add -ing','Drop the e','Double the last letter']);
  const positions=order.map((q,i)=>q.kind==='rule'?i:-1).filter(i=>i>=0);
  expect(positions).toEqual([4,9,14]);
 });

 it('keeps the Legend TWO question out of Detective',()=>{
  const legend=stage(3).questions.filter(q=>q.legend);
  expect(legend).toHaveLength(1);
  expect(legend[0]?.answer).toHaveLength(2);
  expect(orderedQuestions(stage(3),'Detective').filter(q=>q.answer.length===2)).toHaveLength(0);
  expect(orderedQuestions(stage(3),'Legend').filter(q=>q.answer.length===2)).toHaveLength(1);
 });

 it('shows two pictures for every spot question, and either can be the right one',()=>{
  expect(SPOT_PAIRS).toHaveLength(4);
  for(const q of stage(4).questions.filter(q=>q.kind==='spot')){
   expect(q.photo).toBeTruthy();expect(q.afterPhoto).toBeTruthy();
   expect(q.photo).not.toBe(q.afterPhoto);
   expect(q.answer).toHaveLength(1);
   // The sentence always names the thing that is NOT happening, so it teaches isn't/aren't.
   expect(q.prompt).toMatch(/isn't|aren't/);
  }
 });

 it('never repeats an option inside one question',()=>{
  for(const s of suppliedStages)for(const q of s.questions)expect(new Set(q.options).size).toBe(q.options.length);
 });

 it('accepts the right answer and rejects every wrong one',()=>{
  for(const s of suppliedStages)for(const q of s.questions){
   if(!q.options.length)continue;
   expect(isCorrect(q,q.answer)).toBe(true);
   for(const wrong of q.options.filter(o=>!q.answer.includes(o)))expect(isCorrect(q,[wrong])).toBe(false);
  }
 });

 it('gives every question an explanation and a hint',()=>{
  for(const s of suppliedStages)for(const q of s.questions){expect(q.explain.length).toBeGreaterThan(0);expect(q.hint.length).toBeGreaterThan(0);}
 });

 it('keeps supplied chapter checks and glossaries for chapters 0–4',()=>{
  expect(CHAPTERS[0]?.check?.answer).toEqual(['Turned it grey and gloopy']);
  expect(CHAPTERS[1]?.check?.answer).toEqual(['To tell her mum what they are doing']);
  expect(CHAPTERS[2]?.check?.answer).toEqual(["He's swimming"]);
  expect(CHAPTERS[3]?.check?.answer).toEqual(['Word endings']);
  expect(CHAPTERS[4]?.check?.answer).toEqual(['A sandwich']);
  expect(CHAPTERS[0]?.glossary).toHaveProperty('gloopy');
  expect(CHAPTERS[1]?.glossary).toHaveProperty('water sports');
  expect(CHAPTERS[3]?.glossary).toHaveProperty('double');
 });

 it('shuffles without dropping or duplicating questions',()=>{
  const s=stage(1);
  const once=orderedQuestions(s,'Detective',()=>0.9);
  expect(once).toHaveLength(s.questions.length);
  expect(new Set(once.map(q=>q.prompt)).size).toBe(s.questions.length);
 });

 it('offers three options in Explorer and never more than four in Detective',()=>{
  const multi=(q:Question)=>!q.speaking&&q.options.length>0&&q.answer.length===1&&q.kind!=='vowel';
  for(const s of suppliedStages)for(const q of s.questions.filter(multi)){
   expect(questionOptions(q,'Explorer').length).toBeLessThanOrEqual(3);
   expect(questionOptions(q,'Detective').length).toBeLessThanOrEqual(4);
  }
 });
});

describe('shuffled',()=>{
 it('returns a permutation of the input',()=>{
  expect(shuffled([1,2,3,4],()=>0).slice().sort()).toEqual([1,2,3,4]);
  expect(shuffled([])).toEqual([]);
 });
});