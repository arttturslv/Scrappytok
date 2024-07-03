import { useState } from "react";

export default function Element({ link, date, focus, i, filterNet }) {
    const [filter, setFilter] = useState('normal');

    function formataData(date) {
        return date.replaceAll('-', '/').substring(0, 10);
    }

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
            className='w-32 h-48 bg-slate-50 m-[4px] transition-all duration-100 cursor-pointer flex'  >

            <div className="bg-inherit flex flex-col w-full">
                <div className="bg-inherit flex-grow-0 flex">
                    <p className="bg-red-400" onClick={() => setFilter('del')}>🗑</p>
                    <p className="w-full text-center bg-yellow-200" onClick={() => setFilter('fav')}>⭐</p>
                </div>
                <div className="bg-slate-600 flex-grow" onClick={() => window.open(link, 'blank')}></div>
                <div className="bg-inherit  flex-grow-0"><p className="text-white bg-[#fa51a2] w-full text-center h-fit">{formataData(date)}</p></div>
            </div>

        </div>
    )

}