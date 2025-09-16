import { useEffect, useState } from "react";
import Notice from "../notice";
import Input from "../input";
import CircularProgress from "../circularProgress";
import Helper from "../helper";
import Slider from "../slider";

export default function Page3(
    {functionToUpdate=null}
){

    const [information, setInformation] = useState(""); //tell users about their current page
    const [pathway, setPathway] = useState(""); //holds pathway information for the user tracking
    const [error, setError] = useState(""); //for if there is anything that isn't filled.
    const [loanToValue, setLTV] = useState(0.00); //for showing the loan to value percentage
    const [mortgageTerms, setMortgageTerms] = useState("");
    const [propertyValue, setPropertyValue] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    
    //for input tracking
    const [interestRate, setInterestRate] = useState(5.00); //float
    const [interestPeriod, setInterestPeriod] = useState(5);

    useEffect(() => { //fetch historic session cache for user tracking
        try{
            let property_Value = sessionStorage.getItem("propertyValue");
            setPropertyValue(property_Value);
            let deposit_Amount = sessionStorage.getItem("depositAmount");
            setDepositAmount(deposit_Amount);
            let loanValue = "";
            if(sessionStorage.getItem("loanAmount")){
                loanValue = sessionStorage.getItem("loanAmount"); //auto calculate if doesn't exist
                setLoanAmount(loanValue);
            }
            else{
                loanValue = propertyValue - depositAmount;
            }
            let mortgage_Terms = sessionStorage.getItem("mortgageTerms");
            setMortgageTerms(mortgage_Terms);

            setPathway(sessionStorage.getItem("pathway"));
            let loan_to_value = (parseFloat(loanValue) / parseFloat(property_Value)) * 100;
            setLTV(loan_to_value);
            setInformation(`Please fill in the remaining inputs to calculate your mortgage`);

        }
        catch{
            
        }
    }, []);


    //for fixed interest and interest only
    const updateInterest = (e) => {
        setInterestRate(Number(e));
    }

    //for interest only functions
    const updatePeriod = (e) => {
        setInterestPeriod(Number(e));
    }

    return(
        <>
            <Notice logo="success" description={information} childrenNodes={
                <p className="text-[var(--lloyds-blue)] text-sm">
                    <span className="text-[var(--lloyds-black)]">Your current inputs:</span>
                    <br/>Property Value: £{propertyValue} 🔹 Depositing: £{depositAmount} 🔹 Loaning: £{loanAmount} 🔹 
                Terms: {mortgageTerms} Years 🔹 Type: {pathway}
                </p>
            }></Notice>

            {error != "" && <p className="mt-4 mb-2 text-center font-semibold mx-2 text-[var(--lloyds-red)]">{error}</p>}
            {(pathway.toLowerCase().includes("fixed") || pathway.toLowerCase().includes("only")) && 
            <div className="z-[6]">
                <Input type="text" label="Interest Rate (%): "
                classExtensions={"mt-8 flex justify-center sm:-ml-1"}
                placeholder="Any % from 0.00-20.00" 
                helper={
                    {   
                        active: true, 
                        title: "Interest Rate (%)", 
                        tooltip: "Any value from 0-20 with a maximum of 2 decimal points, for example: 4.95% interest. This will determine your fixed mortgage repayments."
                    }
                } value={interestRate} onChange={updateInterest}/>
            </div>
            }

            {pathway.toLowerCase().includes("only") &&
            <div>
                <Slider 
                    label="Interest Period:" 
                    values={{min: 1, max: mortgageTerms, default: mortgageTerms}}
                    classExtensions={"mt-4 flex justify-center sm:-ml-1"}
                    value={interestPeriod} onChange={updatePeriod}
                ></Slider>
            </div>
            }

            <div className="flex flex-row mt-6 justify-center items-center sm:gap-4 gap-2 z-[5]">
                <p className="font-semibold text-[var(--lloyds-black)] mx-2 sm:w-[150px] w-[250px] sm:text-right">Loan To Value:</p>
                <div className="sm:max-w-[300px] w-[100%] flex sm:justify-end justify-center">
                    <CircularProgress 
                    percentage={loanToValue.toFixed(2)} size={80} strokeWidth={6}
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

            <button onClick={() => {}} className="w-[200px] h-[40px] rounded-md text-[var(--lloyds-white)]
                font-semibold bg-[var(--lloyds-dark-green)] mt-10 hover:opacity-70 focus:opacity-70
                drop-shadow-[0_0_1px_black] mx-auto sm:translate-x-28">Next Page</button>
        </>
    )
}