import {useState } from "react";

export default function Element({ link, date, focus, i }) {

    function formataData(date) {
        return date.replaceAll('-', '/').substring(0, 10);
    }
    
        return (
            <div style={focus==i?{border:'4px solid #000'}:{border:'none'}} className='w-32 h-48 bg-slate-600 relative flex flex-col justify-end group cursor-pointer'  >
                <div className="w-[100%] h-[100%] group-hover:block">
                 
                    <div className="bg-slate-600 w-[100%] h-[100%]" onClick={()=> window.open(link, 'blank')}>
                    </div>
                </div>
                <p className="text-white bg-[#fa51a2] w-full text-center">{formataData(date)}</p>    
            </div>
        )
    

}