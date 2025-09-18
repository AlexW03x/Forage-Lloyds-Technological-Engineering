import { useEffect, useState } from "react";
import Notice from "../notice";
import CircularProgress from "../circularProgress";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Helper from "../helper";


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

    //for showing the chart
    const [chartData, setChartData] = useState([]);

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

            // ✅ Build amortization chart data (year by year)
            let balance = loanAmount;
            let data = [];

            for (let year = 1; year <= Number(storedMortgageTerms); year++) {
                let interestYear = 0;
                let principalYear = 0;

                for (let month = 1; month <= 12; month++) {
                    const interestMonth = balance * r;
                    const principalMonth = monthly - interestMonth;
                    balance -= principalMonth;

                    interestYear += interestMonth;
                    principalYear += principalMonth;
                }

                data.push({
                    year,
                    interest: Math.round(interestYear),
                    principal: Math.round(principalYear),
                    balance: Math.max(Math.round(balance), 0),
                });
            }

            setChartData(data);
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

            {pathway.toLowerCase().includes("fixed") &&
            <div className="w-[98%] mx-auto flex flex-col sm:flex-row gap-6 mt-8">
                <div className="w-[98%] sm:w-[40%] flex flex-col mx-auto justify-center sm:order-1 order-2">
                    <p className="text-lg font-semibold text-[var(--lloyds-dark-green)] mx-2 mb-4 flex flex-row items-center justify-center">
                        Your Agreement:
                        <Helper title="Agreement" 
                            description="Monthly Payment is the monthly cost including loan repayment and interest. Interest paid is the total extra money you'll pay from interest built up over the years. Total repayment is the total you'll pay back (loan + interest accumulated)." 
                            classExtensions={"text-[var(--lloyds-black)]"}
                            customPos={"left-4"}
                        />
                    </p>
                    <div className="flex flex-row font-semibold">
                        <p className="w-[200px] text-center">Your Loaning:</p>
                        <p className="ml-2">£{Number(loanValue).toFixed(2).toLocaleString()}</p>
                    </div>

                    <div className="flex flex-row font-semibold">
                        <p className="w-[200px] text-center">Interest At:</p>
                        <p className="ml-2"> {interestRate}%</p>
                    </div>

                    <div className="flex flex-row font-semibold">
                        <p className="w-[200px] text-center">Duration:</p>
                        <p className="ml-2"> {mortgageTerms} Years</p>
                    </div>

                    <div className="w-[90%] h-[1px] bg-black/20 mx-auto mt-2 mb-2"></div>

                    <div className="flex flex-row font-semibold">
                        <p className="w-[200px] text-center">Monthly Payment:</p>
                        <p className="ml-2">£{Number(monthlyPayment.toFixed(2)).toLocaleString()}</p>
                    </div>

                    <div className="flex flex-row font-semibold">
                        <p className="w-[200px] text-center">Total Interest Paid:</p>
                        <p className="ml-2">£{Number(totalInterest.toFixed(2)).toLocaleString()}</p>
                    </div>

                    <div className="flex flex-row font-semibold">
                        <p className="w-[200px] text-center">Total Repayment:</p>
                        <p className="ml-2">£{Number(totalRepayment.toFixed(2)).toLocaleString()}</p>
                    </div>

                    <button className="w-[150px] h-[40px] rounded-md text-[var(--lloyds-white)]
                    font-semibold bg-[var(--lloyds-dark-green)] mt-10 hover:opacity-70 focus:opacity-70
                    drop-shadow-[0_0_1px_black] mx-auto">View Other Deals</button>
                </div>

                <div className="w-[100%] sm:w-[60%] flex flex-col justify-center items-center sm:order-2">
                    <h3 className="font-semibold mb-2">Payment Breakdown Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
                            <Legend
                                verticalAlign="bottom"
                                align="center"
                                wrapperStyle={{
                                    paddingTop: 10,
                                    display: "flex",
                                    flexWrap: "wrap",   // allows wrapping on smaller screens
                                    justifyContent: "center",
                                    fontSize: "0.8rem", // smaller font for mobile
                                }}
                                />
                            <Line type="monotone" dataKey="interest" stroke="#e63946" name="Interest Paid" />
                            <Line type="monotone" dataKey="principal" stroke="#2a9d8f" name="Principal Paid" />
                            <Line type="monotone" dataKey="balance" stroke="#264653" name="Remaining Balance" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>}
        </>
    )
}