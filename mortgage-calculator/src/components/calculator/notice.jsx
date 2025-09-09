import { useEffect, useState } from "react";
import { CheckMark, CrossMark, Info, Exclamation} from "../../assets";

export default function Notice({logo, description}){

    const [noticeLogo, setNoticeLogo] = useState(logo);
    const [noticeLogoAlt, setNoticeLogoAlt] = useState("Notice Logo");

    useEffect(() => { //on load identify the logo setting if so update logo to correct version
        if(logo === "info"){
            setNoticeLogo(Info);
            setNoticeLogoAlt("Information Logo");
        } 
        else if(logo === "success"){
            setNoticeLogo(CheckMark);
            setNoticeLogoAlt("Success Logo");
        } 
        else if(logo === "warning"){
            setNoticeLogo(Exclamation);
            setNoticeLogoAlt("Warning Logo");
        } 
        else if(logo === "error"){
            setNoticeLogo(CrossMark);
            setNoticeLogoAlt("Error Logo");
        }

        //console.log("Notice Loaded"); //debug
    }, [logo]);


    return(
        <>
            <div className={`w-[95%] min-h-[50px] bg-[var(--lloyds-grey)] py-[10px] rounded-md mx-auto border-[1px]
                ${logo === "info" ? "border-[var(--lloyds-blue)]" : logo === "success" ? "border-[var(--lloyds-green)]" :
                logo === "warning" ? "border-[var(--lloyds-yellow)]" : logo === "error" ? "border-[var(--lloyds-red)]" : 
                "border-[var(--lloyds-dark-green)]"} flex flex-row`}>

                <div className="w-[50px] h-[50px] flex items-center justify-center">
                    <img src={noticeLogo} alt={noticeLogoAlt} className={`w-[20px] h-[20px]`} draggable="false"/>
                </div>

                <div className="w-full min-h-[50px] h-auto px-2 flex flex-col items-center justify-center">

                </div>

            </div>
        </>
    )
}