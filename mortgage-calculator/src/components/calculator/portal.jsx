
import { useEffect, useState } from "react";
import Helper from "./helper";
import Notice from "./notice";
import Input from "./input";
import { Lock } from "../../assets";
import Slider from "./slider";
import Page1 from "./page1";

export default function Portal(){

    const [curPage, setCurPage] = useState("Beginning"); //used to identify segment where the portal is at
    const [pagesUnlocked, setPagesUnlocked] = useState([
        "Beginning",
    ]); //used to allow users to progress further into the portal
    const texts = {
        "Calculator": {
            title: "Mortgage Calculator",
            description: "This is a basic mortgage calculator that allows you to input your mortgage details and see an estimate of your monthly payments. Please note that this is for informational purposes only and does not constitute financial advice."
        },
    }

    //function to update curPage and unlockedPages
    const updater = (newPage, pageUnlocked) => {
        setCurPage(newPage);
        setPagesUnlocked(pagesUnlocked.push(pageUnlocked));
        checkPages();
    }

    //function to automatically asynchronously unlock more pagination pages
    async function checkPages(){
        let lengthOfPagesUnlocked = pagesUnlocked.length;
        try{
            document.getElementById(`pagination_${lengthOfPagesUnlocked}`).disabled = false; //undisable the navigation per access of page
            console.log(lengthOfPagesUnlocked);
        }
        catch{

        }
    }

    return(
        <>
            <div className="max-w-[800px] w-[90%] min-h-[600px] mx-auto mt-[60px] bg-[var(--lloyds-grey)] 
            rounded-lg drop-shadow-[0_0_2px_var(--lloyds-dark-green)] flex flex-col">
                    <div className="w-full h-[60px] flex items-center justify-center font-bold text-lg border-b-[1px] border-[var(--lloyds-dark-green)]/40">
                        <p>Mortgage Calculator</p>
                        <Helper title={texts.Calculator.title} description={texts.Calculator.description} classExtensions={"text-[var(--lloyds-blue)]"}
                        customPos={"left-5 sm:left-auto sm:right-40 mt-2"}/>
                    </div>

                    <div className="w-full min-h-[480px] pb-[20px] flex flex-col bg-[var(--lloyds-grey-subtle)] border-b-[1px] border-[var(--lloyds-dark-green)]/40 py-4">
                        {/* Calculator content will go here */}

                        {curPage == "Beginning" && <Page1 functionToUpdate={updater}/>}
                        
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

                            <select id="pagination_dropdown" defaultValue="1" className="bg-transparent text-md ml-2 mr-2">
                                <option id="pagination_1" value="1">Page 1 / 3</option>
                                <option id="pagination_2" value="2" disabled={true}>Page 2 / 3</option>
                                <option id="pagination_3" value="3" disabled={true}>Page 3 / 3</option>
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
