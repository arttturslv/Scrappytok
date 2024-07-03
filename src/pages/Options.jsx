import { useState } from "react"
import Header from "../components/Header";
export default function Options() {
    const [option, setOption] = useState(null);
    
    return (
        <div className="flex mx-32 gap-8 md:flex-row items-center flex-wrap">
                <div className="hover:bg-slate-200">
                    <img src="https://static.thenounproject.com/png/5770928-200.png" alt="" />
                    <h1 className="text-center font-bold">Favorite Effects</h1>
                </div>
                <div>
                    <img src="https://static.thenounproject.com/png/919726-200.png" alt="" />
                    <h1 className="text-center font-bold">Favorite Sounds</h1>
                </div>
                <div>
                    <img src="https://static.thenounproject.com/png/3870055-200.png" alt="" />
                    <h1 className="text-center font-bold">Favorite Videos</h1>
                </div>
                <div>
                    <img src="https://static.thenounproject.com/png/5759794-200.png" alt="" />
                    <h1 className="text-center font-bold">Following List</h1>
                </div>
                <div>
                    <img src="https://static.thenounproject.com/png/5692768-200.png" alt="" />
                    <h1 className="text-center font-bold">Follower List</h1>
                </div>
                <div>
                    <img src="https://static.thenounproject.com/png/5770928-200.png" alt="" />
                    <h1 className="text-center font-bold">Liked List</h1>
                </div>
        </div>
    )
}