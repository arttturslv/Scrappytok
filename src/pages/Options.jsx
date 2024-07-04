import { useState } from "react"
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Options() {

    return (
        <div className="flex mx-32 gap-8 md:flex-row items-center flex-wrap">
            <Header />

            <Link to={'/options/videos/Favorite Effects'} className="hover:bg-slate-200">
                <img src="https://static.thenounproject.com/png/5770928-200.png" alt="" />
                <h1 className="text-center font-bold">Favorite Effects</h1>
            </Link>
            <Link to={'/options/videos/Favorite Sounds'} className="hover:bg-slate-200">
                <img src="https://static.thenounproject.com/png/919726-200.png" alt="" />
                <h1 className="text-center font-bold">Favorite Sounds</h1>
            </Link>
            <Link to={'/options/videos/Favorite Videos'} className="hover:bg-slate-200">
                <img src="https://static.thenounproject.com/png/3870055-200.png" alt="" />
                <h1 className="text-center font-bold">Favorite Videos</h1>
            </Link>
            <Link to={'/options/people/Following List'} className="hover:bg-slate-200">
                <img src="https://static.thenounproject.com/png/5759794-200.png" alt="" />
                <h1 className="text-center font-bold">Following List</h1>
            </Link>
            <Link to={'/options/people/Follower List'} className="hover:bg-slate-200">
                <img src="https://static.thenounproject.com/png/5692768-200.png" alt="" />
                <h1 className="text-center font-bold">Follower List</h1>
            </Link>
            <Link to={'/options/videos/Like List'} className="hover:bg-slate-200">
                <img src="https://static.thenounproject.com/png/5770928-200.png" alt="" />
                <h1 className="text-center font-bold">Liked List</h1>
            </Link>
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