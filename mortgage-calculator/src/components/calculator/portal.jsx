
import { useState } from "react";
import Helper from "./helper";
import Notice from "./notice";
import Input from "./input";
import { Lock } from "../../assets";

export default function Portal(){

    const [curPage, setCurPage] = useState("Beginning"); //used to identify segment where the portal is at

    // onload function
    window.onload = async function(){
        console.log("Portal Loaded");
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
                        classExtensions={"mt-10 flex justify-center sm:-ml-1"}></Input>

                        <Input type="text" label="Your Deposit (£):" placeholder="Enter Deposit Amount (£)"
                        classExtensions={"mt-6 flex justify-center sm:-ml-1"}></Input>
                        
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
