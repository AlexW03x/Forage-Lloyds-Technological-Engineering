
import { useState } from "react";


export default function InterestButton(
    {icon, text, 
        helper={active: false, title: null, tooltip: null, classExtension: null},
        classExtension = null,
    }
){
    return(
        <>
        <button className={`w-[95%] rounded-lg min-h-[50px] h-auto ${classExtension} bg-white mx-auto mt-4 
        drop-shadow-[0_0_1px_var(--lloyds-black)] 
        hover:drop-shadow-[0_0_2px_var(--lloyds-green)] focus:drop-shadow-[0_0_2px_var(--lloyds-green)]
         flex flex-row cursor-pointer outline-none`}>

        </button>
        </>
    )
}