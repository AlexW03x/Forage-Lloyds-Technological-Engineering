import { useState } from "react"

export default function Helper({title, description}){

    const [showHelp, setShowHelp] = useState(false);

    const toggleHelp = (bool) => {
        setShowHelp(bool);
    }

    return(
        <>
            <p
             className="ml-2 text-3xl font-[400] text-[var(--lloyds-blue)]"><span onClick={() => {toggleHelp(!showHelp)}} className="cursor-pointer">ⓘ</span>

                <span
                className={`${showHelp ? "block" : "hidden"} w-[90%] left-5 sm:w-[300px] sm:left-auto sm:right-40 mt-2  
                z-[2] p-2 text-sm rounded-md drop-shadow-[0_0_3px_var(--lloyds-black)]
                min-h-auto bg-[var(--lloyds-black)] absolute text-white`}>

                    <strong>
                        {title}
                        <span className="float-end cursor-pointer hover:opacity-70 text-xl -mt-1" onClick={() => {toggleHelp(false)}}>✗</span>
                    </strong>
                    <br/><br/>
                    {description}
                </span>
            </p>
        </>
    )
}