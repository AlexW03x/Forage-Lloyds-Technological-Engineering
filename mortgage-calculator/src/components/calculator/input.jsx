import { useState } from "react";
import Helper from "./helper";

//@params type == input field type so text, password, email, etc
//@params label == String: title for input field
//@params placeholder == String: placeholder text for label
//@params onChange == Void: function to update e.target.value
//@params classExtensions == String: add more classNames to div container
export default function Input(
    {type, label, placeholder, onChange=null, classExtensions=null, value=null, isHidden=false, updateHidden=null}
){

    const [hidden, setHidden] = useState(isHidden); //toggleable hidden with defaulting from props

    const updateValues = (input) => {
        onChange(input); //pass values onto different component variables
    }

    const show = () => {
        //remove the isHidden part
        setHidden(false);
        try{
            updateHidden(true); //for the can edit variable so we can update label
        }
        catch{
            
        }
    }

    return(
        <>
            <div className={`w-[95%] mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 text-[var(--lloyds-black)] sm:items-center ${classExtensions}`}>
                <p className="font-semibold text-md sm:w-[150px] sm:text-right">{label}</p>
                {hidden == false && 
                    <input type={type} value={value} placeholder={placeholder} onChange={(e) => {updateValues(e.target.value)}}
                    className="rounded-md h-[40px] sm:max-w-[300px] w-[100%] px-2 outline-none drop-shadow-[0_0_1px_black] focus:drop-shadow-[0_0_2px_green]">
                    </input>
                }
                {hidden == true && 
                    <p className="text-md text-[var(--lloyds-blue)] font-semibold cursor-pointer 
                        underline-offset-2 underline-[1px] decoration-[var(--lloyds-blue)] hover:opacity-80"
                        onClick={show}>Edit?</p>}
            </div>
        </>
    )

}