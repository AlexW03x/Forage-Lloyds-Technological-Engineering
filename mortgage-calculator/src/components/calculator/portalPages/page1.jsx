import { useEffect, useState } from "react";
import Notice from "../notice";
import Input from "../input";
import Slider from "../slider";

export default function Page1({functionToUpdate}){

    //useStates for our input values
    const [propertyValue, setPropertyValue] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [mortgageTerms, setMortgageTerms] = useState(25); //default years
    const [loanValue, setLoanValue] = useState("");
    const [canEditLoan, setCanEditLoan] = useState(false); //for hidden input

    //error message for not filling all info
    const [error, setError] = useState("");
    const [errorArea, setErrorArea] = useState(""); //property value, deposit amount, etc makes input red for incomplete!

    // onload function
    useEffect(() => {
        console.log("Portal Loaded");

        //fetch user history if exists
        try{
            if(sessionStorage.getItem("propertyValue")){
                setPropertyValue(sessionStorage.getItem("propertyValue"));
            }

            if(sessionStorage.getItem("depositAmount")){
                setDepositAmount(sessionStorage.getItem("depositAmount"));
            }

            if(sessionStorage.getItem("mortgageTerms")){
                setMortgageTerms(sessionStorage.getItem("mortgageTerms"));
            }

            if(sessionStorage.getItem("loanAmount")){
                let loan = sessionStorage.getItem("loanAmount");
                setLoanValue(Number(loan));
            }
        }
        catch(error){
            console.error(error || "Failed to fetch history or non exists!");
        }
    },[]);


    //for updating loan value based on parameters
    useEffect(() => {
        if(canEditLoan == true){
            //ignore
        }
        else{
            //auto update label for loan value
            if(sessionStorage.getItem("loanAmount") == ""){
                setLoanValue(propertyValue - depositAmount);
                if(loanValue < 0){
                    setError("Error insufficient borrowing!"); //notice of insufficiency
                }
            }
        }
    }, [propertyValue, depositAmount]);

    //Storing our inputs for calculation
    const updatePropertyValue = (newVal) => {
        setPropertyValue(newVal);
        sessionStorage.setItem("propertyValue", newVal);
    }

    const updateDepositValue = (newVal) => {
        setDepositAmount(newVal);
        sessionStorage.setItem("depositAmount", newVal);
    }

    const updateMortgageTerms = (newVal) => {
        setMortgageTerms(Number(newVal));
        sessionStorage.setItem("mortgageTerms", newVal);
        
    }

    const updateLoanAmount = (newVal) => {
        setLoanValue(Number(newVal));
        sessionStorage.setItem("loanAmount", newVal);
    }

    const updatePage = () => { //send props function new values
        try{
            if(propertyValue == "" || propertyValue == null){
                setError("Error: Enter Property Value!");
                setErrorArea("propertyValue");
                return;
            }

            if(depositAmount == "" || depositAmount == null){
                setError("Error: Enter Deposit Amount!");
                setErrorArea("depositAmount");
                return;
            }
            
            if(loanValue == "" || loanValue == null){
                setError("Error: Provide Loan Value!");
                setErrorArea("loanValue");
                return;
            }

            if(Number(propertyValue) < Number(depositAmount)){
                setError("Deposit is larger than property value!");
                setErrorArea("depositAmount");
                return;
            }

            

            setError("");
            setErrorArea(""); //clear errors
            //to ensure that if terms arent changed store anyways into sessionStorage
            sessionStorage.setItem("mortgageTerms", mortgageTerms);
            functionToUpdate("MortgageTypes", "MortgageTypes");
        }
        catch{

        }
    }

    // helper text
    const texts = {
        "Calculator": {
            title: "Mortgage Calculator",
            description: "This is a basic mortgage calculator that allows you to input your mortgage details and see an estimate of your monthly payments. Please note that this is for informational purposes only and does not constitute financial advice."
        },
        "Calculator_Notice": {
            logo: "success",
            description: "Lets get started, please enter your details into the boxes below!"
        }
    }

    return(
        <>
            <Notice logo={texts.Calculator_Notice.logo} description={texts.Calculator_Notice.description}/>

            {error != "" && <p className="font-semibold text-[var(--lloyds-red)] text-center mx-2 mt-4 -mb-3">{error}</p>}

            <Input type="text" label="Property Value (£):" placeholder="Enter Property Value (£)" 
            classExtensions={"mt-8 flex justify-center sm:-ml-1"} onChange={updatePropertyValue} value={propertyValue}
            error={errorArea=="propertyValue"?true:false}></Input>

            <Input type="text" label="Your Deposit (£):" placeholder="Enter Deposit Amount (£)"
            classExtensions={"mt-6 flex justify-center sm:-ml-1"} onChange={updateDepositValue} value={depositAmount}
            error={errorArea=="depositAmount"?true:false}></Input>

            <Input type="text" label={`Loan Amount${loanValue > 0 && canEditLoan == false ? `: £${loanValue}` : " (£):"}`} placeholder="Enter Loaning Amount (£)"
            classExtensions={"mt-6 flex justify-center sm:-ml-1"}
            onChange={updateLoanAmount} value={loanValue > 0 ? loanValue : null} 
            isHidden={!canEditLoan} updateHidden={setCanEditLoan}
            helper={{active: true, title: "Loaning from us", 
            tooltip: "The amount of money you would ideally like to borrow from Lloyds Bank. Automatically calculated by default!"}}
            error={errorArea=="loanValue"?true:false}></Input>

            <Slider label="Mortgage Terms:" 
            values={{min: 1, max: 40, default: 25}} value={mortgageTerms}
            classExtensions={"mt-6 flex sm:justify-center sm:-ml-1"} onChange={updateMortgageTerms}></Slider>


            <button onClick={updatePage} className="w-[200px] h-[40px] rounded-md text-[var(--lloyds-white)]
                font-semibold bg-[var(--lloyds-dark-green)] mt-10 hover:opacity-70 focus:opacity-70
                drop-shadow-[0_0_1px_black] mx-auto sm:translate-x-28">Next Page</button>
        </>
    )
}