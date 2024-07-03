import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Element from "../components/Element";

export default function View() {
    const [file, setFile] = useState('');
    const [focus, setFocus] = useState(null);
    const [filterNet, setFilterNet] = useState('normal');

    const {id} = useParams();

    useEffect(()=> {
        const temp = (JSON.parse(window.localStorage.getItem("file"))).Activity[id];
        console.log(temp)
        setFile(Object.values(temp).find(value => Array.isArray(value)));
    }, [id])

    useEffect(()=> {
        console.log(file);
    }, [file])

    function onFocus() {
        setFocus(i);
    }

    return (
        <div className="flex mx-32 gap-8 md:flex-row items-center justify-center flex-wrap">
            <Header/>

            <div className="w-full h-12 flex justify-evenly">
                <h1 className="font-bold text-xl bg-blue-400 h-fit px-8 py-2 cursor-pointer" onClick={() => setFilterNet('normal')}>👀 All</h1>
                <h1 className="font-bold text-xl bg-yellow-400 h-fit px-8 py-2  cursor-pointer" onClick={() => setFilterNet('fav')}>⭐ Saved</h1>
                <h1 className="font-bold text-xl bg-red-400 h-fit px-8 py-2  cursor-pointer" onClick={() => setFilterNet('del')}>🗑 Deleted</h1>
                <h1 className="font-bold text-xl bg-green-600 h-fit px-4 py-2  cursor-pointer">💾</h1>
            </div>

        <div className="flex flex-wrap transition-all duration-500 w-fit justify-center">
            {
                file.length>0 && file.map((item, i) => (
                    <div className="m-0 p-0" key={i} onClick={()=> setFocus(i)}>
                        <Element i={i} filterNet={filterNet} focus={focus} link={item.Link} date={item.Date}></Element>
                    </div>
                ))
            }
        </div>
     
        </div>
    )
}