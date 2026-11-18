import { describe,expect,it } from 'vitest';
import { BOSS_ID,EPILOGUE_ID,MISSION_COUNT,CHAPTERS,STAGES,STAGE_IDS,DIFFICULTY_RULES,TIMER_LENGTHS,bossStage,isCorrect,questionsFor,questionOptions,ACTIVITY_KINDS } from '@/game/adventure';
import { DEFAULT,stageUnlocked,unlockedPowerIds,awardReading,awardCheck,readProgress,returningFromEpisode2,STORAGE_KEY } from '@/game/store';
import { hintCost,helperCost,speedBonus } from '@/game/mechanics';

describe('Engine shape is derived from the mission count',()=>{
 it('has eight missions, a boss at nine and an epilogue at ten',()=>{
  expect(MISSION_COUNT).toBe(8);
  expect(STAGES).toHaveLength(8);
  expect(STAGE_IDS).toEqual([1,2,3,4,5,6,7,8]);
  expect(BOSS_ID).toBe(9);
  expect(EPILOGUE_ID).toBe(10);
  expect(CHAPTERS.map(c=>c.id)).toEqual([0,1,2,3,4,5,6,7,8,9,10]);
 });

 it('unlocks the boss only after every mission has a star',()=>{
  const allButOne=Object.fromEntries(STAGE_IDS.slice(0,-1).map(id=>[id,1]));
  expect(stageUnlocked({...DEFAULT,levelStars:allButOne},BOSS_ID)).toBe(false);
  const all=Object.fromEntries(STAGE_IDS.map(id=>[id,1]));
  expect(stageUnlocked({...DEFAULT,levelStars:all},BOSS_ID)).toBe(true);
 });

 it('counts completed missions across all eight',()=>{
  const half=Object.fromEntries(STAGE_IDS.slice(0,4).map(id=>[id,1]));
  expect(completedStagesCount({...DEFAULT,levelStars:half})).toBe(4);
  expect(completedStagesCount(DEFAULT)).toBe(0);
 });

 it('teacher unlock all makes every mission and the boss available',()=>{
  for(let id=1;id<=BOSS_ID;id++)expect(stageUnlocked({...DEFAULT,allUnlocked:true},id)).toBe(true);
 });

 it('never lets a Legend-only question reach Explorer or Detective',()=>{
  for(const stage of STAGES)for(const q of stage.questions){
   if(!q.legend)continue;
   expect(questionsFor(stage,'Detective')).not.toContain(q);
   expect(questionsFor(stage,'Explorer')).not.toContain(q);
   expect(questionsFor(stage,'Legend')).toContain(q);
  }
 });

 it('only lets explicit Legend questions carry two answers',()=>{
  for(const stage of STAGES)for(const q of stage.questions){
   if(q.answer.length!==2)continue;
   expect(q.legend).toBe(true);
  }
 });

 it('never accepts fewer or more choices than the question needs',()=>{
  for(const stage of STAGES)for(const q of stage.questions){
   if(!q.options.length)continue;
   expect(isCorrect(q,q.answer)).toBe(true);
   expect(isCorrect(q,[])).toBe(false);
   if(q.answer.length===1)expect(isCorrect(q,[...q.answer,q.answer[0]??''])).toBe(false);
  }
 });

 it('gives the boss three phases with questions',()=>{
  expect([0,1,2].map(p=>bossStage(p).questions.length)).toEqual([10,6,1]);
  expect(bossStage(0).id).toBe(BOSS_ID);
 });

 it('has a distinct illustration for every chapter',()=>{
  expect(CHAPTERS).toHaveLength(MISSION_COUNT+3);
  expect(new Set(CHAPTERS.map(c=>c.image)).size).toBe(CHAPTERS.length);
 });

 it('every mission has questions and a place on the map',()=>{
  for(const s of STAGES){expect(s.questions.length).toBeGreaterThan(0);expect(s.place.length).toBeGreaterThan(0);expect(s.x).toBeGreaterThan(0);expect(s.y).toBeGreaterThan(0);}
 });

 it('keeps activity kinds out of the option-button path',()=>{
  for(const kind of ACTIVITY_KINDS){
   const sample=STAGES.flatMap(s=>s.questions).find(q=>q.kind===kind);
   if(!sample)continue;
   expect(questionOptions(sample,'Explorer')).toHaveLength(0);
  }
 });

 it('still offers options for kinds the student answers by tapping',()=>{
  for(const kind of ['meaning','agreement','forum','who']){
   const sample=STAGES.flatMap(s=>s.questions).find(q=>q.kind===kind);
   if(!sample)continue;
   expect(questionOptions(sample,'Explorer').length).toBeGreaterThan(0);
  }
 });
});

function completedStagesCount(p:Parameters<typeof stageUnlocked>[0]) {
  return STAGE_IDS.filter((id) => (p.levelStars[id] ?? 0) > 0).length;
}

describe('Difficulty and scoring rules',()=>{
 it('Pip’s Hint costs two points in Detective and Legend, zero in Explorer',()=>{
  expect(hintCost('Detective')).toBe(2);expect(hintCost('Legend')).toBe(2);expect(hintCost('Explorer')).toBe(0);
 });

 it('revealing a Detective helper costs one point',()=>{
  expect(helperCost('Detective')).toBe(1);expect(helperCost('Explorer')).toBe(0);
 });

 it('speed bonus applies only to fast timed answers in mission one',()=>{
  expect(speedBonus(1,true,10,15)).toBe(2);expect(speedBonus(1,true,2,15)).toBe(0);
  expect(speedBonus(2,true,15,15)).toBe(0);expect(speedBonus(1,false,15,15)).toBe(0);
 });

 it('defaults to Detective with a 15 second timer',()=>{
  expect(DEFAULT.difficulty).toBe('Detective');expect(DEFAULT.timerSecs).toBe(15);
 });

 it('uses Explorer three options, 25 seconds and helpers',()=>{
  expect(DIFFICULTY_RULES.Explorer).toEqual({options:3,timer:25,helpers:true});
 });

 it('uses Detective four options, 15 seconds and hidden helpers',()=>{
  expect(DIFFICULTY_RULES.Detective).toEqual({options:4,timer:15,helpers:false});
 });

 it('uses Legend four options, 10 seconds and no helpers',()=>{
  expect(DIFFICULTY_RULES.Legend).toEqual({options:4,timer:10,helpers:false});
 });

 it('accepts only teacher timer lengths 10, 15, 20 and 25',()=>{
  expect(TIMER_LENGTHS).toEqual([10,15,20,25]);
  for(const timerSecs of TIMER_LENGTHS)expect(readProgress({getItem:key=>key===STORAGE_KEY?JSON.stringify({timerSecs}):null}).timerSecs).toBe(timerSecs);
  expect(readProgress({getItem:()=>JSON.stringify({timerSecs:30})}).timerSecs).toBe(15);
 });

 it('reading gives exactly two points once without changing hearts or stars',()=>{
  const p=awardReading(DEFAULT,0);
  expect(p.points).toBe(2);expect(awardReading(p,0).points).toBe(2);
  expect(p.hearts).toBe(3);expect(p.stars).toBe(0);expect(DEFAULT.readingMode).toBe('self');
 });

 it('Detective Check gives exactly one point once without changing hearts or stars',()=>{
  const p=awardCheck(DEFAULT,0);
  expect(p.points).toBe(1);expect(awardCheck(p,0).points).toBe(1);
  expect(p.hearts).toBe(3);expect(p.stars).toBe(0);
 });

 it('chapter 0 asks what Captain Squall did, and every story check has four distinct options',()=>{
  expect(CHAPTERS[0]?.check?.answer).toEqual(['Turned it grey and gloopy']);
  for(const c of CHAPTERS){if(!c.check)continue;expect(c.check.options).toHaveLength(4);expect(new Set(c.check.options).size).toBe(4);}
 });
});

describe('Storage keys',()=>{
 it('stores Episode 4 separately from Episode 3',()=>{
  expect(STORAGE_KEY).toBe('episode-4-v1');
 });

 it('never lets a fresh Episode 4 import Episode 3 stars or unlocks',()=>{
  const episodeThree=JSON.stringify({stars:24,points:500,levelStars:{1:3,2:3,3:3,4:3,5:3,6:3,7:3,8:3},bossWon:true});
  const fresh=readProgress({getItem:key=>key==='episode-3-v1'?episodeThree:null});
  expect(fresh.stars).toBe(0);
  expect(fresh.points).toBe(0);
  expect(fresh.levelStars).toEqual({});
  expect(stageUnlocked(fresh,2)).toBe(false);
 });

 it('welcomes back a detective who finished Episode 3',()=>{
  expect(returningFromEpisode2({getItem:key=>key==='episode-3-v1'?JSON.stringify({bossWon:true}):null})).toBe(true);
  expect(returningFromEpisode2({getItem:key=>key==='episode-3-v1'?JSON.stringify({bossWon:false}):null})).toBe(false);
  expect(returningFromEpisode2({getItem:()=>null})).toBe(false);
  expect(returningFromEpisode2({getItem:()=>'not json'})).toBe(false);
 });

 it('gives a returning Episode 3 player Pip’s Hint without importing progress',()=>{
  const p=readProgress({getItem:key=>key==='episode-3-v1'?JSON.stringify({bossWon:true,points:999}):null});
  expect(p.returningBonus).toBe(true);
  expect(p.points).toBe(0);
  expect([...unlockedPowerIds(p)]).toEqual(['lens']);
 });

 it('clamps corrupted saved values instead of crashing',()=>{
  const p=readProgress({getItem:()=>JSON.stringify({points:-50,stars:'lots',hearts:99,difficulty:'Impossible',timerSecs:999,levelStars:{'3':9,'9':2,x:1},chaptersUnlocked:[0,99,-4]})});
  expect(p.points).toBe(0);expect(p.stars).toBe(0);expect(p.hearts).toBe(99);
  expect(p.difficulty).toBe('Detective');expect(p.timerSecs).toBe(15);
  expect(p.levelStars).toEqual({3:3,9:2});
  expect(p.chaptersUnlocked).toEqual([0]);
 });
});