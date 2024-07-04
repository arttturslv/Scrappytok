import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="w-[100%] flex py-4 px-12">
            <Link to={'/'}><h2 className="font-black text-4xl bg-inherit ">SCRAPPYTOK</h2></Link>
        </div>
    )
}