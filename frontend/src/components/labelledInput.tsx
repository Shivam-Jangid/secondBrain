import type { RefObject } from "react";

interface labelledInputProps{
    title:string;
    inputPlaceholder?:string;
    type:string;
    reference:RefObject<HTMLInputElement | null>;
}

export default function LabelledInput({title, inputPlaceholder,type, reference}:labelledInputProps) {
  return (
    <>      
        <span className="text-slate-100/80 font-light tracking-wide mb-1.5">{title}</span>
        <input ref = {reference} className="border mb-3 font-light border-slate-100/40 rounded-md text-white/90 focus:shadow-[0_0_3px_1px_white] transition-all duration-400 focus:outline-none pl-2 py-1.5 linear" placeholder={inputPlaceholder} type={type}/>
    </>
  )
}
