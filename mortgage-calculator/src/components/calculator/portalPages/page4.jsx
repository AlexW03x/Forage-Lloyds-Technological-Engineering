import { useEffect, useState } from "react";

export default function Page4(){
    //variables for fetching every single user input if available
    //standard
    const [propertyValue, setPropertyValue] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [loanValue, setLoanValue] = useState("");
    const [mortgageTerms, setMortgageTerms] = useState("");
    
    //pathway
    const [pathway, setPathway] = useState("");
    
    //pathway variables
    const [interestRate, setInterestRate] = useState("");
    const [adjustmentFrequency, setAdjustmentFrequency] = useState("");
    const [interestPeriod, setInterestPeriod] = useState("");

    useEffect(() => { //onload of component fetch the values of user history immediately
        try{
            if(sessionStorage.getItem("propertyValue")){
                setPropertyValue(sessionStorage.getItem("propertyValue"));
            }

            if(sessionStorage.getItem("depositAmount")){
                setDepositAmount(sessionStorage.getItem("depositAmount"));
            }

            if(sessionStorage.getItem("loanAmount")){
                setLoanValue(sessionStorage.getItem("loanAmount"));
            }
            else{
                setLoanValue((Number(propertyValue) - Number(depositAmount)));
                if(loanValue <= 0){
                    setLoanValue(Number(0));
                }
            }

            if(sessionStorage.getItem("mortgageTerms")){
                setMortgageTerms(sessionStorage.getItem("mortgageTerms"));
            }

            if(sessionStorage.getItem("pathway")){
                setPathway(sessionStorage.getItem("pathway"));
            }

            if(sessionStorage.getItem("InterestRate")){
                setInterestRate(sessionStorage.getItem("InterestRate"));
            }

            if(sessionStorage.getItem("InterestPeriod")){
                setInterestPeriod(sessionStorage.getItem("InterestPeriod"));
            }

            if(sessionStorage.getItem("AdjustmentFrequency")){
                setAdjustmentFrequency(sessionStorage.getItem("AdjustmentFrequency"));
            }
        }
        catch{
            console.error("Failed to fetch history!");
        }
    }, []);


    return(
        <>
            {pathway.toLowerCase().includes("fixed") && 
                <div className="bg-black h-[60px] w-full mt-4">
                    a
                </div>
            }
        </>
    )
}