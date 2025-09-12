
import { useState } from "react";
import Helper from "./helper";

//@params icon = Image Url / Asset Import => Show as First Order Image Icon on Left of Button
//@params text = String: Button Text for User Understanding
//@params helper = Dict: {active = show on or off, title = label title string, tooltip = string of description, classExtension = classes}
//@params classExtension = String: add more classes as you need
//@params customPos = String: css for custom positioning on screen
export default function InterestButton(
    {icon, text="", 
        helper={active: false, title: null, tooltip: null, classExtension: null, customPos: null},
        classExtension = null,
        onClickFunc=null
    }
){

    const executeOnClick = () => {
        try{
            if(text.toLowerCase().includes("fixed")){
                sessionStorage.setItem("pathway", "Fixed Interest Rate"); //pathway for chosen calculator method
            }
            else if(text.toLowerCase().includes("adjustable")){
                sessionStorage.setItem("pathway", "Adjustable Interest Rate");
            }
            else if(text.toLowerCase().includes("interest only")){
                sessionStorage.setItem("pathway", "Interest Only");
            }

            onClickFunc();
        }
        catch(Error){
            console.error(Error);
        }
    }

    return(
        <>
        <button className={`w-[95%] rounded-lg min-h-[50px] h-auto ${classExtension} bg-[var(--lloyds-grey)] mx-auto mt-4 
         border-[1px] hover:border-[var(--lloyds-dark-green)] focus:border-[var(--lloyds-dark-green)]
         flex flex-row items-center cursor-default outline-none pr-2 sm:pr-0 `}>

            <div onClick={executeOnClick} className="flex flex-row items-center cursor-pointer min-w-max w-[90%] min-h-[50px] h-auto sm:mr-4 ">
                {icon != null && 
                    <img src={icon} alt="Button Icon" draggable="false" className="object-contain w-[30px] h-[30px] mx-4"></img>
                }

                <span className="font-semibold">{text}</span>
            </div>

            {helper.active == true && 
                <Helper title={helper.title} description={helper.tooltip} 
                    classExtensions={helper.classExtension} customPos={helper.customPos}></Helper>
            }
        </button>
        </>
    )
}