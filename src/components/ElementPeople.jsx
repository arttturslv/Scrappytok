import { useEffect, useState } from "react";

export default function Element({ link, username, focus, i, filterNet }) {
    const [filter, setFilter] = useState('normal');

    async function getPageInfo() {
        try {
            const response = await fetch(link);
            if(response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
            } else {
                console.log("waht")
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPageInfo();
    }, []);

    return (
        <div

            style={
                filter === filterNet
                    ?
                    focus == i
                        ?
                        { border: '4px solid #000' }
                        :
                        {}
                    :
                    { width: '0px', margin: '0px' }
            }
            className='w-64 h-12 m-[4px] transition-all duration-100 cursor-pointer flex'  >
            <div className="flex w-full bg-slate-600">
                <div className="w-12 h-full bg-slate-700 "> </div>
                <div className="flex-grow flex bg-inherit  items-center" onClick={() => window.open(link, 'blank')}>
                    <h3 className="bg-inherit text-white font-semibold">@{username.substring(0,16) }</h3>
                    </div>
                <div className="bg-inherit">
                    <p className="w-12 h-full bg-yellow-200 justify-center items-center flex" onClick={() => setFilter('fav')}>⭐</p>
                </div>
             
            </div>

        </div>
    )

}