
import { useState } from "react";


export default function Portal(){
    return(
        <>
            <div class="max-w-[800px] w-[90%] h-[600px] mx-auto mt-[60px] bg-[var(--lloyds-grey)] 
            rounded-lg drop-shadow-[0_0_2px_var(--lloyds-dark-green)] flex flex-col">
                    <div class="w-full h-[60px] flex items-center justify-center font-bold text-lg border-b-[1px] border-[var(--lloyds-dark-green)]/40">
                        <p>Mortgage Calculator</p>
                    </div>

                    <div class="w-full h-[480px] flex flex-col bg-[var(--lloyds-grey-subtle)] border-b-[1px] border-[var(--lloyds-dark-green)]/40">

                    </div>
            </div>
        </>
    )
}
