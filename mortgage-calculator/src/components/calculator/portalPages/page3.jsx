import { useEffect, useState } from "react";
import Notice from "../notice";
import Input from "../input";
import CircularProgress from "../circularProgress";
import Helper from "../helper";

export default function Page3(
    {functionToUpdate=null}
){

    const [information, setInformation] = useState(""); //tell users about their current page
    const [prevInput, setPrevInput] = useState(""); //holds historic session cached information of user input
    const [pathway, setPathway] = useState(""); //holds pathway information for the user tracking
    const [error, setError] = useState(""); //for if there is anything that isn't filled.
    const [loanToValue, setLTV] = useState(0.00); //for showing the loan to value percentage
    
    //for input tracking
    const [interestRate, setInterestRate] = useState(0.00); //float

    useEffect(() => { //fetch historic session cache for user tracking
        try{
            let propertyValue = sessionStorage.getItem("propertyValue");
            let depositAmount = sessionStorage.getItem("depositAmount");
            let loanValue = "";
            if(sessionStorage.getItem("loanAmount")){
                loanValue = sessionStorage.getItem("loanAmount"); //auto calculate if doesn't exist
            }
            else{
                loanValue = propertyValue - depositAmount;
            }
            let mortgageTerms = sessionStorage.getItem("mortgageTerms");
            let path = sessionStorage.getItem("pathway");
            setPathway(String(path)); 
            let loan_to_value = (parseFloat(loanValue) / parseFloat(propertyValue)) * 100;
            setLTV(loan_to_value);
            setInformation(`Please select the mortgage type you would like to calculate!`);
            setPrevInput(
                `Property Value: £${propertyValue} 🔹 Depositing: £${depositAmount} 🔹 Loaning: £${loanValue} 🔹 
                Terms: ${mortgageTerms} Years 🔹 Type: ${pathway}`
            );


        }
        catch{
            
        }
    }, []);

    return(
        <>
            <Notice logo="success" description="Please fill in the remaining inputs to calculate your mortgage" childrenNodes={
                <p className="text-[var(--lloyds-blue)] text-sm">
                    <span className="text-[var(--lloyds-black)]">Your current inputs:</span>
                    <br/>{prevInput}
                </p>
            }></Notice>

            {error != "" && <p className="mt-4 mb-2 text-center font-semibold mx-2 text-[var(--lloyds-red)]">{error}</p>}
            {pathway.toLowerCase().includes("fixed") && 
            <div>
                <Input type="text" label="Interest Rate (%): "
                classExtensions={"mt-8 flex justify-center sm:-ml-1"}
                placeholder="Any % from 0.00-20.00" 
                helper={
                    {   
                        active: true, 
                        title: "Interest Rate (%)", 
                        tooltip: "Any value from 0-20 with a maximum of 2 decimal points, for example: 4.95% interest. This will determine your fixed mortgage repayments."
                    }
                }/>
            </div>
            }

            <div className="flex flex-row mt-6 justify-center items-center sm:gap-4 gap-2">
                <p className="font-semibold text-[var(--lloyds-black)] mx-2 sm:w-[150px] w-[250px] sm:text-right">Loan To Value:</p>
                <div className="sm:max-w-[300px] w-[100%]">
                    <CircularProgress 
                    percentage={loanToValue.toFixed(2)} size={100} strokeWidth={6}
                    classExtensions={"text-[var(--lloyds-dark-green)]"}
                    textExtensions={"text-md font-semibold"}
                />
                </div>

                <Helper
                    title="Loan To Value"
                    description="Loan-to-Value (LTV) shows how much you borrow compared to how much a property is worth. It’s written as a percentage. Lower LTV means you’re borrowing less of the property’s value, which usually makes lenders see you as safer."
                    classExtensions={"lg:-translate-x-2 sm:-translate-x-4 -translate-x-2 text-[var(--lloyds-blue)]"}
                    customPos={"w-[300px] absolute right-0 mt-1 sm:-right-12"}
                />
            </div>
        </>
    )
}