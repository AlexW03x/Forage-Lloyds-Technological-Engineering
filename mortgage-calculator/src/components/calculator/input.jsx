import { useState } from "react";

export default function Input({type, label, placeholder, onChange=null}){

    const updateValues = (input) => {
        onChange(input); //pass values onto different component variables
    }

    return(
        <>
            <div className="w-[95%] mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 text-[var(--lloyds-black)] sm:items-center mt-4">
                <p className="font-semibold text-md sm:w-[150px] sm:text-right">{label}</p>
                <input type={type} placeholder={placeholder} 
                className="rounded-md h-[40px] sm:max-w-[300px] w-[100%] px-2 outline-none drop-shadow-[0_0_1px_black]">
                </input>
            </div>
        </>
    )

}