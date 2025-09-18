import { useEffect, useState } from "react";
import Notice from "../notice";
import CircularProgress from "../circularProgress";

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
    const [loanToValue, setLTV] = useState(0.00); //for showing the loan to value percentage

    useEffect(() => {
    try {
        const storedPropertyValue = sessionStorage.getItem("propertyValue") || "";
        const storedDepositAmount = sessionStorage.getItem("depositAmount") || "";
        const storedLoanAmount = sessionStorage.getItem("loanAmount") || "";
        const storedMortgageTerms = sessionStorage.getItem("mortgageTerms") || "";
        const storedPathway = sessionStorage.getItem("pathway") || "";
        const storedInterestRate = sessionStorage.getItem("InterestRate") || "";
        const storedInterestPeriod = sessionStorage.getItem("InterestPeriod") || "";
        const storedAdjustmentFrequency = sessionStorage.getItem("AdjustmentFrequency") || "";

        setPropertyValue(storedPropertyValue);
        setDepositAmount(storedDepositAmount);
        setLoanValue(storedLoanAmount || (Number(storedPropertyValue) - Number(storedDepositAmount)));
        setMortgageTerms(storedMortgageTerms);
        setPathway(storedPathway);
        setInterestRate(storedInterestRate);
        setInterestPeriod(storedInterestPeriod);
        setAdjustmentFrequency(storedAdjustmentFrequency);

        // ✅ use local values for calculation
        const loanAmount = storedLoanAmount
        ? Number(storedLoanAmount)
        : Number(storedPropertyValue) - Number(storedDepositAmount);

        const propertyVal = Number(storedPropertyValue);

        const loan_to_value =
        propertyVal > 0 ? (loanAmount / propertyVal) * 100 : 0;

        setLTV(loan_to_value);
    } catch {
        console.error("Failed to fetch history!");
    }
    }, []);



    return(
        <>
            <Notice logo="info" description="Your mortgage calculations" childrenNodes={<>
                    <span className="text-[var(--lloyds-dark-grey)] text-sm font-[400]">{pathway}</span>
                    <CircularProgress 
                    percentage={loanToValue.toFixed(2)} size={60} strokeWidth={4} marginTop={"absolute right-5 sm:right-7"}
                    classExtensions={`${loanToValue < 60 ? "text-[var(--lloyds-dark-green)]" :
                        loanToValue < 80 ? "text-[var(--lloyds-orange)]" : "text-[var(--lloyds-red)]"}`}
                    textExtensions={"text-sm font-semibold"}
                    />
                    <span className="text-[var(--lloyds-black)] text-sm font-semibold absolute right-[6rem] hidden sm:block">Loan To Value: </span>
                </>}
            />
            

        </>
    )
}