import { describe,it,expect } from 'vitest';
import { BOSS_ID,EPILOGUE_ID,MISSION_COUNT,CHAPTERS,bossStage,isCorrect,questionOptions } from '@/game/adventure';
import { BOSS_ALARM_SECONDS,BOSS_BUILDER_SECONDS,BOSS_SPEECH_SECONDS,BUILDER_PAIRS,BOSS_PHASE_NAMES } from '@/game/finale-content';
import { hasDetectiveCheck,questionTiles,buildQuestion,bossHealth } from '@/game/finale-rules';
import { CHAPTER_IMAGES } from '@/game/chapter-images';

describe('Episode 4 final battle',()=>{
 it('names three phases that lead to a clean sea',()=>{
  expect(BOSS_PHASE_NAMES).toEqual(['The Grizzle Storm','Ask the Sea','The Clean Sea Speech']);
 });

 it('uses ten quick-fire questions with two of each prescribed topic',()=>{
  const s=bossStage(0);
  expect(s.questions).toHaveLength(10);
  expect(s.questions.map(q=>q.kind??'short-form')).toEqual(['alarm','alarm','listen','listen','forum','forum','snapshot','snapshot','agreement','agreement']);
 });

 it('uses a ten-second first-phase timer',()=>{
  expect(BOSS_ALARM_SECONDS).toBe(10);
  expect(bossStage(0).timerSecs).toBe(10);
 });

 it('gives the question-builder phase at least 30 seconds so every tile can be clicked',()=>{
  expect(BOSS_BUILDER_SECONDS).toBeGreaterThanOrEqual(30);
  expect(bossStage(1).timerSecs).toBe(30);
 });

 it('accepts only So is he for the positive statement and Neither is she for the negative',()=>{
  const qs=bossStage(0).questions.slice(-2);
  expect(qs.map(q=>q.answer[0])).toEqual(['So is he.','Neither is she.']);
  for(const q of qs){
   expect(isCorrect(q,q.answer)).toBe(true);
   for(const wrong of q.options.filter(o=>!q.answer.includes(o)))expect(isCorrect(q,[wrong])).toBe(false);
   expect(questionOptions(q,'Legend')).toHaveLength(3);
  }
 });

 it('has six question-builder answers that survive tile round-tripping',()=>{
  expect(BUILDER_PAIRS.map(p=>p.question)).toEqual(['What are you doing?','What is he doing?','What is she doing?','Are they snorkelling?','Is she sailing?','What are they doing?']);
  expect(bossStage(1).questions).toHaveLength(6);
  for(const q of bossStage(1).questions){
   const correct=questionTiles(q.answer[0]??'');
   expect(buildQuestion(correct)).toBe(q.answer[0]);
   expect(q.traps).toHaveLength(1);
   expect(questionTiles(q.answer[0]??'',q.traps).length).toBe(correct.length+1);
   expect(isCorrect(q,[buildQuestion([q.traps?.[0]??'',...correct.slice(1)])])).toBe(false);
  }
 });

 it('ends with a teacher-judged speech offering 45 or 60 seconds',()=>{
  expect(BOSS_SPEECH_SECONDS).toEqual([45,60]);
  expect(bossStage(2).questions).toHaveLength(1);
  expect(bossStage(2).questions[0]?.kind).toBe('boss-speech');
  expect(bossStage(2).questions[0]?.speaking).toBe(true);
 });

 it('drains three health sections as phases progress',()=>{
  expect(bossHealth(0,0,10)).toEqual([1,1,1]);
  expect(bossHealth(0,5,10)).toEqual([.5,1,1]);
  expect(bossHealth(1,3,6)).toEqual([0,.5,1]);
  expect(bossHealth(2,1,1)).toEqual([0,0,0]);
 });

 it('sits the boss chapter right after the last mission and the epilogue after it',()=>{
  const chapter=CHAPTERS[BOSS_ID];const epilogue=CHAPTERS[EPILOGUE_ID];
  if(!chapter||!epilogue)throw Error('Missing finale');
  expect(chapter.id).toBe(MISSION_COUNT+1);
  expect(epilogue.id).toBe(MISSION_COUNT+2);
  expect(chapter.check?.answer).toEqual(['She hates noise and fun.']);
  expect(chapter.check?.options).toHaveLength(4);
  expect(hasDetectiveCheck(chapter,true)).toBe(true);
  expect(hasDetectiveCheck(chapter,false)).toBe(false);
  expect(epilogue.check).toBeNull();
  expect(hasDetectiveCheck(epilogue,true)).toBe(false);
 });

 it('has a distinct illustration for every chapter, including the two finale ones',()=>{
  expect(CHAPTER_IMAGES).toHaveLength(MISSION_COUNT+3);
  expect(new Set(CHAPTERS.map(c=>c.image)).size).toBe(CHAPTERS.length);
 });
});