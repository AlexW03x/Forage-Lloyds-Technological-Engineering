import { useEffect, useState } from "react";
import Notice from "../notice";
import Helper from "../helper";
import Input from "../input";

//This page is utilised for selecting the type of mortgage they are going to calculate.

export default function Page2(
    {functionToUpdate = null}
){

    const [information, setInformation] = useState(""); //used to allow users to track their previous input values!
    useEffect(() => {
        try{
            let propertyValue = sessionStorage.getItem("propertyValue");
            let depositAmount = sessionStorage.getItem("depositAmount");
            let loanValue = sessionStorage.getItem("loanValue");
            let mortgageTerms = sessionStorage.getItem("mortgageTerms");
        }
        catch{

        }
    })

    return(
        <>
            <Notice logo="info" description="" childrenNodes={
                <p className="text-red-400">Hello</p>
            }></Notice>
        </>
    )
}