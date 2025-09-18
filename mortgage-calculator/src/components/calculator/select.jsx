import Helper from "./helper";

export default function Select(
    {label,
        onChange=null, classExtensions=null,
        value=null,
        helper = {active: false, title: null, tooltip: null},
    error = null, options}
){

    const updateValues = (input) => {
        try{
            onChange(input); //pass values onto different component variables
        }
        catch{

        }
    }


    return(
        <>
            <div className={`w-[95%] mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4 text-[var(--lloyds-black)] sm:items-center ${classExtensions}`}>
                <p className={`font-semibold text-md sm:w-[150px] sm:text-right ${error===true&&"text-[var(--lloyds-red)]"}`}>{label}</p>
                <select value={value} onChange={(e) => {updateValues(e.target.value)}}
                className={`rounded-md h-[40px] sm:max-w-[300px] w-[100%] px-2 outline-none 
                ${error === true ? "drop-shadow-[0_0_1px_red]" : "drop-shadow-[0_0_1px_black]"} focus:drop-shadow-[0_0_2px_green]`}>
                    {options}
                </select>
                

                {helper.active === true && <Helper title={helper.title} description={helper.tooltip} 
                classExtensions={`absolute -mt-12 right-2 sm:mt-0 lg:right-36 sm:right-24 text-[var(--lloyds-blue)]`}
                customPos={"-ml-56 min-w-[250px] mt-2"}/>}
            </div>
        </>
    )

}