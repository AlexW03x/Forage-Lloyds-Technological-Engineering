
import { useEffect, useState } from "react";
import Helper from "./helper";
import Notice from "./notice";
import Input from "./input";
import { Lock } from "../../assets";
import Slider from "./slider";

export default function Portal(){

    const [curPage, setCurPage] = useState("Beginning"); //used to identify segment where the portal is at

    //useStates for our input values
    const [propertyValue, setPropertyValue] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [mortgageTerms, setMortgageTerms] = useState(0);

    // onload function
    window.onload = async function(){
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
        setMortgageTerms(newVal);
        sessionStorage.setItem("mortgageTerms", newVal);
    }

    return(
        <>
            <div className="max-w-[800px] w-[90%] h-[600px] mx-auto mt-[60px] bg-[var(--lloyds-grey)] 
            rounded-lg drop-shadow-[0_0_2px_var(--lloyds-dark-green)] flex flex-col">
                    <div className="w-full h-[60px] flex items-center justify-center font-bold text-lg border-b-[1px] border-[var(--lloyds-dark-green)]/40">
                        <p>Mortgage Calculator</p>
                        <Helper title={texts.Calculator.title} description={texts.Calculator.description} classExtensions={"text-[var(--lloyds-blue)]"}/>
                    </div>

                    <div className="w-full h-[480px] flex flex-col bg-[var(--lloyds-grey-subtle)] border-b-[1px] border-[var(--lloyds-dark-green)]/40 py-4">
                        {/* Calculator content will go here */}
                        <Notice logo={texts.Calculator_Notice.logo} description={texts.Calculator_Notice.description}/>

                        <Input type="text" label="Property Value (£):" placeholder="Enter Property Value (£)" 
                        classExtensions={"mt-8 sm:mt-16 flex justify-center sm:-ml-1"} onChange={updatePropertyValue} value={propertyValue}></Input>

                        <Input type="text" label="Your Deposit (£):" placeholder="Enter Deposit Amount (£)"
                        classExtensions={"mt-6 flex justify-center sm:-ml-1"} onChange={updateDepositValue} value={depositAmount}></Input>

                        <Slider label="Mortgage Terms:" 
                        values={{min: 1, max: 40, default: 25}} value={mortgageTerms}
                        classExtensions={"mt-6 flex sm:justify-center sm:-ml-1"} onChange={updateMortgageTerms}></Slider>
                        
                    </div>

                    <div className="w-full h-[60px] flex flex-row items-center justify-center font-semibold">
                        <p className="absolute text-[var(--lloyds-black)] bottom-1 left-1 text-[0.6rem] flex flex-row">Safe & Secure 
                            <img src={Lock} alt="Lock Icon" className="object-contain w-[12px] h-[12px] ml-1"></img>
                        </p>

                        <div className="" id="pagination">
                            <button onClick={() => {}} className="w-[30px] h-[30px] rounded-md bg-[var(--lloyds-light-grey)]
                                  hover:bg-black/20 defaultTransition rotate-180">
                                    ➤
                            </button>

                            <select id="pagination_dropdown" value="1" className="bg-transparent text-md ml-2 mr-2">
                                <option value="1">Page 1 / 2</option>
                                <option value="2">Page 2 / 2</option>
                            </select>

                            <button onClick={() => {}} className="w-[30px] h-[30px] rounded-md bg-[var(--lloyds-light-grey)]
                                 hover:bg-black/20 defaultTransition">
                                    ➤
                            </button>
                        </div>

                    </div>
            </div>
        </>
    )
}
