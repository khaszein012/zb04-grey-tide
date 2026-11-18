import { useEffect,useState } from 'react';
import { Button } from '@/components/ui/button';
import { REPLY_SECONDS, TWISTER_RATES, replyPoints } from './activity-rules';
import { ALL_CHANT } from './later-content';
import { speak } from './audio';
import { TimerRing } from './ui';

const control='game-btn btn-option h-auto min-h-16 whitespace-normal px-5 py-3 text-2xl';

/** Missions 5 and 8 — read aloud at three speeds, judged by the teacher. */
export function TeacherSpeaking({kind,disabled,paused,onAward}:{kind:'reply'|'twister';disabled:boolean;paused:boolean;onAward:(points:number)=>void}){
 const [pro,setPro]=useState(false);const [left,setLeft]=useState(REPLY_SECONDS);const [running,setRunning]=useState(false);const [read,setRead]=useState(0);
 useEffect(()=>{if(!running||paused||disabled||left===0)return;const id=setInterval(()=>setLeft(x=>Math.max(0,x-1)),1000);return()=>clearInterval(id);},[running,paused,disabled,left]);
 const text=kind==='twister'?ALL_CHANT:'';
 if(kind==='twister')return <div className="space-y-4">
  <p className="text-3xl font-bold leading-relaxed">{text}</p>
  <div className="flex flex-wrap gap-3">{TWISTER_RATES.map((rate,i)=><Button key={rate} variant="ghost" className={`${control} ${read===i+1?'btn-gold':''}`} onClick={()=>{setRead(i+1);speak(text,rate);}}>🔊 {i+1} {['Steady','Faster','Fastest'][i]}</Button>)}</div>
  <div className="flex flex-wrap gap-3">
   <Button variant="ghost" disabled={disabled} className={`${control} btn-go`} onClick={()=>onAward(1)}>Nailed it! ⭐</Button>
   <Button variant="ghost" disabled={disabled} className={control} onClick={()=>{setRead(0);speak('Try again. You can do it!');}}>Try again</Button>
  </div>
 </div>;
 return <div className="space-y-4">
  <div className="flex flex-wrap items-center gap-4">
   <TimerRing left={left} total={REPLY_SECONDS}/>
   <Button variant="ghost" disabled={disabled} className={control} onClick={()=>{setLeft(REPLY_SECONDS);setRunning(true);}}>🎙️ {running?'Restart':'Start'} speaking</Button>
   <Button variant="ghost" disabled={disabled} className={control} aria-pressed={pro} onClick={()=>setPro(x=>!x)}>{pro?'Show helper':'Hide helper'}</Button>
   {pro&&<span className="font-display text-2xl font-bold text-success-dark">PRO MODE · ×2</span>}
  </div>
  {left===0&&<p role="status" className="text-2xl">Time\u2019s up — over to your teacher! ⭐</p>}
  <div className="flex flex-wrap gap-3">{(['⭐ Three sentences','⭐⭐ + because','⭐⭐⭐ PRO MODE'] as const).map((label,i)=><Button variant="ghost" key={label} disabled={disabled||(i===2&&!pro)} className={`${control} btn-go`} onClick={()=>onAward(replyPoints((i+1) as 1|2|3,pro))}>{label}</Button>)}</div>
 </div>;
}
