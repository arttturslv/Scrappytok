import { Link } from "react-router-dom";
import sol from '../assets/sol.svg'
import git from '../assets/git.svg'
import lua from '../assets/lua.svg'

export default function Header() {
    return (
        <div className="w-[100%] max-w-[1440px] fixed top-0 flex items-center py-4 px-12">
            <Link className="flex-1" to={'/'}><h2 className="font-black text-5xl text-center max-sm:text-3xl">SCRAPPYTOK</h2></Link>
            <div className="flex  items-center justify-around">
                <a href="#"><img src={lua} className="max-sm:w-8" alt="Icone da lua desenhado"/></a>
                <a target="_blank" href="https://github.com/arttturslv"><img className="max-sm:w-8" src={git} alt="Icone da Github desenhado" /></a>
            </div>
        </div>
    )
}