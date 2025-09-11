import { useEffect, useState } from "react";
import Notice from "../notice";
import Helper from "../helper";
import Input from "../input";
import InterestButton from "../interestButton";

//This page is utilised for selecting the type of mortgage they are going to calculate.

export default function Page2(
    {functionToUpdate = null}
){

    const [information, setInformation] = useState(""); //used to allow users to track their previous input values!
    const [prevInput, setPrevInput] = useState(""); //for previous historic input

    useEffect(() => {
        try{
            let propertyValue = sessionStorage.getItem("propertyValue");
            let depositAmount = sessionStorage.getItem("depositAmount");
            let loanValue = null;
            if(sessionStorage.getItem("loanValue")){
                loanValue = sessionStorage.getItem("loanValue");
            }
            else{
                loanValue = propertyValue - depositAmount;
            }
            let mortgageTerms = sessionStorage.getItem("mortgageTerms");

            setInformation(`Please select the mortgage type you would like to calculate!`);
            setPrevInput(
                `Property Value: £${propertyValue} 🔹 Deposit Amount: £${depositAmount} 🔹 Loan Value: £${loanValue} 🔹 Terms: ${mortgageTerms} Years`
            )
        }
        catch{

        }
    })

    return(
        <>
            <Notice logo="success" description={information} childrenNodes={
                <p className="text-[var(--lloyds-blue)] text-sm">
                    <span className="text-[var(--lloyds-black)]">Your current inputs:</span>
                    <br/>{prevInput}
                </p>
            }></Notice>

            <InterestButton></InterestButton>
        </>
    )
}