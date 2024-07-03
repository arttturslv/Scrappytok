
import { useState, useRef, useEffect } from 'react'

export default function Home({file, setFile, setProgress}) {
  const [file, setFile] = useState(null);
  const [favEffects, setFavEffects] = useState(null);
  const [favSounds, setFavSounds] = useState(null);
  const [favVideos, setFavVideos] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [followerList, setFollowerList] = useState(null);
  const [likedList, setLikedList] = useState(null);

  const [progress, setProgress] = useState(0);

  useEffect(()=> {
    if(file!=null) {
      setFavEffects(file.Activity["Favorite Effects"].FavoriteEffectsList)
      setFavSounds(file.Activity["Favorite Sounds"].FavoriteSoundList)
      setFavVideos(file.Activity["Favorite Videos"].FavoriteVideoList)
      setFollowingList(file.Activity["Following List"].Following)
      setFollowerList(file.Activity["Follower List"].FansList)
      setLikedList(file.Activity["Like List"].ItemFavoriteList)
    }
  }, file)


    return (
      <div className='h-screen flex justify-center items-center mb-36'>
      <div className='w-full max-w-[1440px]'>
        <div className='absolute top-0'>
          <Header></Header>

          {
            progress == 0 ?
              <FileReceiver file={file} setFile={setFile} setProgress={setProgress}></FileReceiver>
              :
              <div className='flex flex-wrap justify-center'>
              <div className='flex flex-wrap justify-evenly space-y-2 w-[90%]'>

                {
                  (favVideos).map((item, i) => (
                    <div className='w-32 h-48 bg-slate-600' onClick={() => window.open(`${item.Link}`, 'blank')} key={i}>
                      <p className='text-yellow-400'>{item.Date}</p>
                    </div>
                  ))
                }
              </div>          
            </div>
          }

        </div>

      </div>
    </div>

    )
}