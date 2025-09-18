import { useState } from "react";


export default function NavigationContext(){

    const curSelection = useState("Personal"); //define colour UI palette update with current selection

    // No navigation functionality as this is for forage and its a clone of my wireframe for the lloyds bank template

    const handleBackground = (selection) =>{
        // Change background colour of button to indicate current selection

        if(curSelection === selection){
            return "bg-[var(--lloyds-green)] text-black";
        }

        return "bg-[var(--lloyds-black)] text-white";
    }   

    return(
        <>
            <nav className="w-[100%] min-h-[50px] bg-[var(--lloyds-black)] 
            flex flex-row 2xl:px-64 sm:px-8 px-0 items-center sm:gap-x-8 overflow-x-hidden 
             font-semibold 2xl:text-lg sm:text-md text-sm text-center underline-offset-4">
                <button className={`${handleBackground("Personal")} h-[50px] px-4 max-w-[25%] hover:underline decoration-1`}>Personal</button>
                <button className={`${handleBackground("Business")} min-h-full px-4 max-w-[25%] hover:underline decoration-1`}>Business</button>
                <button className={`${handleBackground("PrivateBanking")} min-h-full px-4 max-w-[25%] hover:underline decoration-1`}>Private Banking</button>
                <button className={`${handleBackground("InternationalBanking")} min-h-full px-4 max-w-[25%] hover:underline decoration-1`}>International Banking</button>
            </nav>
        </>
    )
}
