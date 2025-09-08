import { useState } from "react"
import { Hamburger, Logo } from "../assets";

export default function Navigation(){
    return(
        <>
            <nav class="w-full sm:h-[100px] h-[80px] bg-[var(--lloyds-green)]
            flex flex-row 2xl:px-32 sm:px-6 px-4 items-center gap-x-4">
                <div class="flex flex-row items-center gap-x-2 lg:w-auto w-[45%]">
                    <img src={Logo} class="h-[60px] object-contain"/>
                    <p class="text-2xl font-bold sm:block hidden">LLOYDS</p>
                </div>

                <button class="w-auto h-full hover:bg-[var(--lloyds-white)] defaultTransition text-[var(--lloyds-black)] 
                font-semibold flex sm:flex-row flex-col items-center justify-center gap-x-4 px-4">
                    <img class="h-[20px] w-[20px]" src={Hamburger} draggable="false"/>
                    Menu
                </button>

                
            </nav>
        </>
    )
}