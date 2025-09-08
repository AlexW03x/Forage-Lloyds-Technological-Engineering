import { useState } from "react";

export default function Breadcrumbs(
    //turn into props later if needed
){

    // Insert props into const here if using it
    const [breadcrumbs, setBreadcrumbs] = useState([
        {name: "Home", link: "/"},
        {name: "Mortgages", link: "/mortgages"},
        {name: "Calculator & Tools", link: "/calculator"},
    ]); //array to store breadcrumb pages in order of flow, using a queue structure

    const [openDropdown, setOpenDropdown] = useState(false); //state to manage if the dropdown is open or closed

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    }

    // No breadcrumb functionality as this is for forage and its a clone of my wireframe for the lloyds bank template

    return(
        <>
            <div class="w-full min-h-[40px] bg-[var(--lloyds-black)] text-white font-semibold 2xl:px-64 sm:px-8 px-0 flex flex-row">
                <div class="w-full h-auto min-h-[40px] flex flex-row items-center">
                    <div class={`w-[90%] sm:w-full ${openDropdown ? "h-auto" : "h-[40px]"} flex flex-col sm:flex-row sm:justify-start`}>

                        {breadcrumbs.map((breadcrumb, index) => (
                            <div key={index} class={`h-[40px] py-2 flex flex-row items-center justify-start 
                            ${index === breadcrumbs.length - 1 ? "font-bold" : "font-normal"} 
                            ${openDropdown ? "block" : index === breadcrumbs.length - 1 ? "block" : "hidden"} 
                            sm:block`}>

                                <a href={breadcrumb.link} class="hover:underline px-2">{breadcrumb.name}
                                     <span class="font-bold ml-4 sm:opacity-100 opacity-0">{index !== breadcrumbs.length - 1 ? "/" : ""}</span>
                                </a>
                            </div>
                        ))}

                    </div>
                    <div onClick={toggleDropdown} class="w-[10%] sm:w-0 sm:hidden h-[40px] flex flex-col items-center justify-center">
                        <p class={`cursor-pointer ${openDropdown ? "rotate-[270deg]" : "rotate-90"} defaultTransition`}>➤</p>
                    </div>
                </div>
            </div>
        </>
    )
}