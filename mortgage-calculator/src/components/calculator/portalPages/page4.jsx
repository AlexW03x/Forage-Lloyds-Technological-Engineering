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

    //for fixed rate calculations
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalRepayment, setTotalRepayment] = useState(0);

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

        const loanAmount = storedLoanAmount
        ? Number(storedLoanAmount)
        : Number(storedPropertyValue) - Number(storedDepositAmount);

        const propertyVal = Number(storedPropertyValue);

        const loan_to_value =
        propertyVal > 0 ? (loanAmount / propertyVal) * 100 : 0;

        setLTV(loan_to_value);

        // ✅ Fixed Rate calculation
        if (storedPathway.toLowerCase().includes("fixed")) {
            const r = Number(storedInterestRate) / 100 / 12; // monthly rate
            const n = Number(storedMortgageTerms) * 12; // months

            let monthly = 0;
            if (r > 0) {
                monthly = (r * loanAmount) / (1 - Math.pow(1 + r, -n));
            } else {
                monthly = loanAmount / n; // handle 0% interest edge case
            }

            const totalPaid = monthly * n;
            const interestPaid = totalPaid - loanAmount;

            setMonthlyPayment(monthly);
            setTotalRepayment(totalPaid);
            setTotalInterest(interestPaid);
        }
    } 
    catch {
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
            
            {/* ✅ Results for Fixed Rate */}
            {pathway.toLowerCase().includes("fixed") && (
                <div className="mt-6 p-4 border rounded-lg bg-[var(--lloyds-light-grey)]">
                    <p className="text-[var(--lloyds-black)] font-semibold">Loan Amount: £{Number(loanValue).toLocaleString()}</p>
                    <p className="text-[var(--lloyds-black)]">Monthly Payment: £{monthlyPayment.toFixed(2)}</p>
                    <p className="text-[var(--lloyds-black)]">Total Interest Paid: £{totalInterest.toFixed(2)}</p>
                    <p className="text-[var(--lloyds-black)]">Total Repayment: £{totalRepayment.toFixed(2)}</p>
                </div>
            )}
        </>
    )
}