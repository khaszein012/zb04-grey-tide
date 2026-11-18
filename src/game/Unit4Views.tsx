import { useMemo,useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Question } from './adventure';
import { spotSides,spotCorrect,spotAnswer } from './unit4-rules';
import { DOLPHIN_FACTS } from './later-content';
import { speak,sfx } from './audio';

const control='game-btn btn-option h-auto min-h-16 whitespace-normal px-5 py-3 text-2xl';

/**
 * Mission 4 — read the sentence, then tap the picture it describes.
 * The two pictures swap sides on every attempt so there is no "always pick A".
 */
export function SpotTheDifference({q,disabled,onAnswer,onMistake}:{q:Question;disabled:boolean;onAnswer:(choices:string[])=>void;onMistake:()=>void}){
 const sides=useMemo(()=>spotSides(q),[q]);
 const [tapped,setTapped]=useState('');
 const [message,setMessage]=useState('');
 if(!q.photo||!q.afterPhoto)return null;
 const pick=(photo:string)=>{
  if(disabled)return;
  if(!spotCorrect(q,photo)){setMessage('Look again. The sentence tells you what is NOT happening.');onMistake();return;}
  sfx.correct();speak(spotAnswer(q));onAnswer([spotAnswer(q)]);
 };
 return <div className="space-y-5">
  <p className="text-2xl font-bold">Which picture matches the sentence?</p>
  <div className="grid gap-4 md:grid-cols-2">
   {sides.map(side=><Button key={side.label} variant="ghost" aria-pressed={tapped===side.photo} disabled={disabled} onClick={()=>{setTapped(side.photo);pick(side.photo);}} className={`game-btn h-auto flex-col gap-2 p-3 ${tapped===side.photo?'btn-correct':'btn-option'}`}>
    <img src={side.photo} alt={`Picture ${side.label}`} width={384} height={384} className="aspect-square w-full rounded-lg object-cover"/>
    <span className="font-display text-3xl font-bold">Picture {side.label}</span>
   </Button>)}
  </div>
  <Button variant="ghost" disabled={disabled||!tapped} className={`${control} btn-go`} onClick={()=>pick(tapped)}>This one ✓</Button>
  {message&&<p role="status" className="text-2xl font-bold">{message}</p>}
 </div>;
}

/** Mission 6 — the source brochure, so students can read it while answering. */
export function DolphinBrochure({onClose}:{onClose:()=>void}){
 const facts=DOLPHIN_FACTS;
 return <div className="fixed inset-0 z-40 overflow-y-auto bg-navy/95 p-4" role="dialog" aria-modal="true" aria-label="Dolphin Dreams brochure">
  <div className="mx-auto max-w-3xl space-y-5">
   <div className="sticky top-0 flex items-center justify-between bg-navy py-3 text-paper"><h2 className="font-display text-3xl">🐬 {facts.title}</h2><Button variant="ghost" className={control} onClick={onClose}>Close ✕</Button></div>
   <article className="rounded-lg border-4 border-gold bg-card p-6 text-2xl leading-relaxed">
    <p className="font-display text-3xl font-bold">{facts.title}</p>
    <p className="mt-1 text-xl font-bold text-muted-foreground">{facts.question}</p>
    <p className="mt-3">{facts.intro}</p>
    <p className="mt-4 font-display text-2xl font-bold">Do you know … ?</p>
    <ul className="mt-2 ml-6 list-disc">{facts.facts.map(f=><li key={f.slice(0,24)} className="mt-2">{f}</li>)}</ul>
    <Button variant="ghost" className={`${control} mt-4`} onClick={()=>speak(`${facts.title}. ${facts.intro}. ${facts.facts.join(' ')}`)}>🔊 Listen to the brochure</Button>
   </article>
  </div>
 </div>;
}