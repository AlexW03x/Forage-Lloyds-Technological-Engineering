
import { useState } from "react";

//@params icon = Image Url / Asset Import => Show as First Order Image Icon on Left of Button
//@params text = String: Button Text for User Understanding
//@params helper = Dict: {active = show on or off, title = label title string, tooltip = string of description, classExtension = classes}
//@params classExtension = String: add more classes as you need
export default function InterestButton(
    {icon, text, 
        helper={active: false, title: null, tooltip: null, classExtension: null},
        classExtension = null,
    }
){
    return(
        <>
        <button className={`w-[95%] rounded-lg min-h-[50px] h-auto ${classExtension} bg-[var(--lloyds-grey)] mx-auto mt-4 
        drop-shadow-[0_0_1px_var(--lloyds-black)] 
        hover:drop-shadow-[0_0_2px_var(--lloyds-dark-green)] focus:drop-shadow-[0_0_2px_var(--lloyds-green)]
         flex flex-row items-center justify-center cursor-pointer outline-none`}>

            {icon != null && 
                <img src={icon} alt="Button Icon" draggable="false" className="object-contain w-[30px] h-[30px]"></img>
            }
        
        </button>
        </>
    )
}