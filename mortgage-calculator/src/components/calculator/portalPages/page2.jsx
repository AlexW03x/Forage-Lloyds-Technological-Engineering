import { useEffect, useState } from "react";
import Notice from "../notice";
import Helper from "../helper";
import Input from "../input";
import InterestButton from "../interestButton";

import { FixedRate, AdjustableRate, InterestOnly } from "../../../assets";

//This page is utilised for selecting the type of mortgage they are going to calculate.

export default function Page2(
    {functionToUpdate = null}
){

    const [information, setInformation] = useState(""); //used to allow users to track their previous input values!
    const [prevInput, setPrevInput] = useState(""); //for previous historic input
    const [pathway, setPathway] = useState(""); //for incase its already been chosen and people want to go back and see.

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

            if(sessionStorage.getItem("pathway")){ //if exists then proceed as follows
                setPathway(sessionStorage.getItem("pathway"));
            }


            setInformation(`Please select the mortgage type you would like to calculate!`);
            setPrevInput(
                `Property Value: £${propertyValue} 🔹 Depositing: £${depositAmount} 🔹 Loaning: £${loanValue} 🔹 Terms: ${mortgageTerms} Years`
            )
        }
        catch{

        }
    }, []);

    //update next step for the user
    const doNextUpdate = () => {
        try{
            console.log("Clicked with value: " + sessionStorage.getItem("pathway"));
            functionToUpdate("AdvancedSettings", "AdvancedSettings"); //proceed to next page with chosen option and unlocks the pagination next dropdown.
        }
        catch{

        }
    }

    return(
        <>
            <Notice logo="success" description={information} childrenNodes={
                <p className="text-[var(--lloyds-blue)] text-sm">
                    <span className="text-[var(--lloyds-black)]">Your current inputs:</span>
                    <br/>{prevInput}
                </p>
            }></Notice>

            <p className="mx-4 text-center font-semibold mt-5">Select Mortgage Type</p>

            <InterestButton icon={FixedRate} text="Fixed Interest Rate" 
            helper={{active: true, title:"Fixed Interest Rate", 
                tooltip: "A fixed-rate mortgage means your interest rate and monthly payments stay the same for the whole term of the loan. This gives you certainty and makes it easier to budget, since your payments won’t go up even if market rates rise.", 
                classExtension: "text-[var(--lloyds-blue)]",
                customPos: "left-5 sm:left-auto mt-1 sm:right-2"
            }} onClickFunc={() => doNextUpdate("FixedRate")}
            classExtension={`${pathway == "Fixed Interest Rate" ? "border-[var(--lloyds-dark-green)]" : "border-black/20"}`}></InterestButton>

            <InterestButton icon={AdjustableRate} text="Adjustable Interest Rate" 
            helper={{active: true, title:"Adjustable Rate", 
                tooltip: "An adjustable-rate mortgage starts with a fixed interest rate for a set period, then the rate can go up or down based on market conditions. This usually means lower payments at first, but your monthly costs may change over time.", 
                classExtension: "text-[var(--lloyds-blue)]",
                customPos: "left-5 sm:left-auto mt-1 sm:right-2"
            }} onClickFunc={() => doNextUpdate("AdjustableRate")}
            classExtension={`${pathway == "Adjustable Interest Rate" ? "border-[var(--lloyds-dark-green)]" : "border-black/20"}`}></InterestButton>

            <InterestButton icon={InterestOnly} text="Interest Only"
            helper={{active: true, title:"Interest Only", 
                tooltip: "With an interest-only mortgage, you only pay the interest for a set period, so your monthly payments are lower at first. After that, you’ll start paying both interest and the loan amount, which means your payments will go up.", 
                classExtension: "text-[var(--lloyds-blue)]",
                customPos: "left-5 sm:left-auto mt-1 sm:right-2"
            }} onClickFunc={() => doNextUpdate("InterestOnly")}
            classExtension={`${pathway == "Interest Only" ? "border-[var(--lloyds-dark-green)]" : "border-black/20"}`}></InterestButton>
        </>
    )
}