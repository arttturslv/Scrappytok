import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Element from "../components/Element";

export default function View() {
    const [file, setFile] = useState('');
    const [focus, setFocus] = useState(null);

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
        <div className="flex mx-32 gap-8 md:flex-row items-center flex-wrap">
            <Header/>

            {
                file.length>0 && file.map((item, i) => (
                    <div key={i} onClick={()=> setFocus(i)}>
                        <Element i={i} focus={focus} link={item.Link} date={item.Date}></Element>
                    </div>
                ))
            }
        </div>
    )
}