import { useState } from "react"


//@params label: String => Title for input field
//@params values: Object Dict => minimum & maximum range for slider in value
//@params onChange: Void() => Update function to store value
//@params classExtensions: String => Add classnames to input
export default function Slider({label="", values={min: 0, default: 25, max:100}, onChange=null, classExtensions=null}){

    const [curValue, setCurValue] = useState(values.default); //set to minimum

    return(
        <>
            <div className={`w-[95%] mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 text-[var(--lloyds-black)] sm:items-center ${classExtensions}`}>
                <p className="font-semibold text-md sm:w-[150px] sm:text-right">{label}</p>
                <input type="range" min={values.min} max={values.max} step={1}
                className="rounded-md h-[40px] sm:max-w-[300px] w-[100%]  outline-none drop-shadow-[0_0_1px_black] focus:drop-shadow-[0_0_2px_green]
                hue-rotate-[150deg] saturate-200">
                </input>

                <div className="sm:max-w-[300px] sm:w-[100%] w-[95%] absolute h-[20px] sm:ml-[165px] sm:mt-10 mt-16">
                    <p className="float-start">{values.min}</p>
                    <p className="float-end">{values.max}</p>
                </div>
            </div>            
        </>
    )
}