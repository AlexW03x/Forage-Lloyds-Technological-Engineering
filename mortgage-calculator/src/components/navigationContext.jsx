import React from "react";
import { useState, useEffect } from "react";


export default function NavigationContext(){

    const [curSelection, setCurrentSelection] = useState("Personal"); //define colour UI palette update with current selection

    return(
        <>
            <nav class="w-[100%] min-h-[50px] bg-[var(--lloyds-black)] 
            flex flex-row 2xl:px-32 sm:px-6 px-0 items-center sm:gap-x-8 overflow-x-hidden 
            text-white font-semibold 2xl:text-xl sm:text-md text-sm text-center underline-offset-4">
                <button class="bg-[var(--lloyds-black)] min-h-full px-4 max-w-[25%] hover:underline decoration-1">Personal</button>
                <button class="bg-[var(--lloyds-black)] min-h-full px-4 max-w-[25%] hover:underline decoration-1">Business</button>
                <button class="bg-[var(--lloyds-black)] min-h-full px-4 max-w-[25%] hover:underline decoration-1">Private Banking</button>
                <button class="bg-[var(--lloyds-black)] min-h-full px-4 max-w-[25%] hover:underline decoration-1">International Banking</button>
            </nav>
        </>
    )
}
