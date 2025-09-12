import { useEffect, useState } from "react";
import Notice from "../notice";

export default function Page3(
    {functionToUpdate=null}
){

    const [information, setInformation] = useState(""); //tell users about their current page
    const [prevInput, setPrevInput] = useState(""); //holds historic session cached information of user input

    useEffect(() => { //fetch historic session cache for user tracking
        try{
            let propertyValue = sessionStorage.getItem("propertyValue");
            let depositAmount = sessionStorage.getItem("depositAmount");
            let loanValue = "";
            if(sessionStorage.getItem("loanValue")){
                loanValue = sessionStorage.getItem("loanValue"); //auto calculate if doesn't exist
            }
            else{
                loanValue = propertyValue - depositAmount;
            }
            let mortgageTerms = sessionStorage.getItem("mortgageTerms");
            let pathway = sessionStorage.getItem("pathway");

            setInformation(`Please select the mortgage type you would like to calculate!`);
            setPrevInput(
                `Property Value: £${propertyValue} 🔹 Depositing: £${depositAmount} 🔹 Loaning: £${loanValue} 🔹 
                Terms: ${mortgageTerms} Years 🔹 Type: ${pathway}`
            )
        }
        catch{
            
        }
    }, []);


    return(
        <>
            <Notice logo="success" description="Test" childrenNodes={
                <p className="text-[var(--lloyds-blue)] text-sm">
                    <span className="text-[var(--lloyds-black)]">Your current inputs:</span>
                    <br/>{prevInput}
                </p>
            }></Notice>
        </>
    )
}