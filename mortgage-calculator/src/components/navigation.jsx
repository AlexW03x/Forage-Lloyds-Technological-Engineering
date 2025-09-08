import { useState } from "react"
import { Logo } from "../assets";

export default function Navigation(){
    return(
        <>
            <nav class="w-full min-h-[100px] bg-[var(--lloyds-green)]
            flex flex-row 2xl:px-32 sm:px-6 px-4 items-center gap-x-4">
                <div class="flex flex-row items-center gap-x-2 ">
                    <img src={Logo} class="h-[60px] object-contain"/>
                    <p class="text-2xl font-bold sm:block hidden">LLOYDS</p>
                </div>


            </nav>
        </>
    )
}