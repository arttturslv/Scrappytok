import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import ArrowIcon from '../assets/arrow-icon.svg'

export default function Options() {
    const navigate = useNavigate()

    return (
        <div className="h-screen w-full max-w-[1440px] m-auto flex flex-col ">
            <Header />
            <div className="mx-20 flex flex-col justify-around items-center gap-8 max-sm:mx-4 ">
                <Link to={'..'}
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }} 
                className="flex gap-4 w-full mt-20 hover:pl-1 transition-all">
                    <img className="w-8 rotate-90" src={ArrowIcon} alt="Icone de uma seta" />
                    <h1 className="text-5xl  max-sm:text-3xl">Choose your route</h1>
                </Link>

                <div className="flex flex-wrap w-full justify-around">
                    <Link to={'/options/videos/Favorite Effects'} className="group">
                        <img className="w-42 group-hover:scale-[0.95] transition-all max-md:w-36 max-sm:w-28"  src="https://static.thenounproject.com/png/5770928-200.png" alt="" />
                        <p className="text-center text-lg">Effects</p>
                    </Link>
                    <Link to={'/options/videos/Favorite Sounds'} className="group">
                        <img className="w-42 group-hover:scale-[0.95] transition-all max-md:w-36 max-sm:w-28" src="https://static.thenounproject.com/png/919726-200.png" alt="" />
                        <p className="text-center text-lg">Sounds</p>
                    </Link>
                    <Link to={'/options/videos/Favorite Videos'} className="group">
                        <img className="w-42 group-hover:scale-[0.95] transition-all max-md:w-36 max-sm:w-28" src="https://static.thenounproject.com/png/3870055-200.png" alt="" />
                        <p className="text-center text-lg">Videos</p>
                    </Link>
                    <Link to={'/options/videos/Following List'} className="group">
                        <img className="w-42 group-hover:scale-[0.95] transition-all max-md:w-36 max-sm:w-28" src="https://static.thenounproject.com/png/5759794-200.png" alt="" />
                        <p className="text-center text-lg">Followings</p>
                    </Link>
                    <Link to={'/options/videos/Follower List'} className="group">
                        <img className="w-42 group-hover:scale-[0.95] transition-all max-md:w-36 max-sm:w-28" src="https://static.thenounproject.com/png/5692768-200.png" alt="" />
                        <p className="text-center text-lg">Followers</p>
                    </Link>
                    <Link to={'/options/videos/Like List'} className="group">
                        <img className="w-42 group-hover:scale-[0.95] transition-all max-md:w-36 max-sm:w-28" src="https://static.thenounproject.com/png/5770928-200.png" alt="" />
                        <p className="text-center text-lg">Likes</p>
                    </Link>
                </div>

            </div>
        </div>
    )
}

/*

      setFavEffects(file.Activity["Favorite Effects"].FavoriteEffectsList)
      setFavSounds(file.Activity["Favorite Sounds"].FavoriteSoundList)
      setFavVideos(file.Activity["Favorite Videos"].FavoriteVideoList)
      setFollowingList(file.Activity["Following List"].Following)
      setFollowerList(file.Activity["Follower List"].FansList)
      setLikedList(file.Activity["Like List"].ItemFavoriteList)


*/