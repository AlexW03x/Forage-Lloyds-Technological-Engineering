import { useEffect, useState } from "react";
import Notice from "../notice";

export default function Page3(
    {functionToUpdate=null}
){

    const [description, setDescription] = useState(""); //holds historic session cached information of user input

    useEffect(() => { //fetch historic session cache for user tracking
        try{
            let propertyValue = sessionStorage.getItem("propertyValue");
            let depositAmount = sessionStorage.getItem("depositAmount");
            let loanValue = sessionStorage.getItem("loanValue");
            let mortgageTerms = sessionStorage.getItem("mortgageTerms");
            let pathway = sessionStorage.getItem("pathway");
        }
        catch{

        }
    }, []);


    return(
        <>
            <Notice logo="success" description="Test" childrenNodes={<></>}></Notice>
        </>
    )
}