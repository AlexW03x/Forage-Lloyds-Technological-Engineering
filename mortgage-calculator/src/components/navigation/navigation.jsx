import { useState } from "react"
import { Hamburger, Logo, Lock, Search, Audio } from "../../assets";

export default function Navigation(){
    return(
        <>
            <nav className="w-full sm:h-[100px] h-[80px] bg-[var(--lloyds-green)]
            flex flex-row 2xl:px-64 sm:px-8 px-4 items-center gap-x-4">

                <div className="flex flex-row items-center gap-x-2 lg:w-auto w-[40%] sm:w-[50%]">
                    <img src={Logo} className="h-[60px] object-contain"/>
                    <p className="text-2xl font-bold sm:block hidden">LLOYDS</p>
                </div>

                <button className="w-auto lg:min-w-[120px] h-full hover:bg-[var(--lloyds-white)] defaultTransition text-[var(--lloyds-black)] 
                font-semibold flex sm:flex-row flex-col items-center justify-center gap-x-4 px-4 lg:mr-[10%] 2xl:mr-[35%] lg:ml-[10%]">
                    <img className="h-[20px] w-[20px]" src={Hamburger} draggable="false"/>
                    Menu
                </button>

                <div className="w-auto h-full flex flex-col sm:flex-row items-center justify-center gap-x-2 text-[var(--lloyds-black)]">
                    <p className="font-semibold order-2 lg:order-1 px-2">Search</p>
                    <input type="text" placeholder="Open a Bank Account" className="lg:block hidden rounded-md px-2 lg:pl-16 
                    2xl:min-w-[410px] lg:min-w-[350px] py-3 font-semibold drop-shadow-[0_0_2px_black] focus:outline-none order-2"></input>

                    <img src={Search} alt="Search Icon" className="h-[20px] w-[20px] cursor-pointer 
                    hover:opacity-80 order-1 lg:order-3 2xl:-ml-[410px] lg:-ml-[350px] z-[1]" draggable="false"/>

                    <img src={Audio} alt="Audio Icon" className="h-[20px] w-[20px] cursor-pointer 
                    hover:opacity-80 lg:block hidden lg:order-4 z-[1] lg:-ml-[5px]" draggable="false"></img>
                </div>


                <button className="w-auto min-w-[90px] sm:min-w-[120px] h-full hover:bg-[var(--lloyds-white)] defaultTransition text-[var(--lloyds-black)] 
                font-semibold flex sm:flex-row flex-col items-center justify-center gap-x-4 px-4 2xl:ml-[380px] lg:ml-[320px]">
                    <img className="h-[20px] w-[20px]" src={Lock} draggable="false"/>
                    Log on
                </button>
            </nav>
        </>
    )
}