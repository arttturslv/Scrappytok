import Header from '../components/Header';
import FileReceiver from '../components/FileReceiver';
import { useState, useEffect } from 'react'

export default function Home() {
  const [favEffects, setFavEffects] = useState(null);
  const [favSounds, setFavSounds] = useState(null);
  const [favVideos, setFavVideos] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [followerList, setFollowerList] = useState(null);
  const [likedList, setLikedList] = useState(null);

  const [file, setFile] = useState(null);

  useEffect(()=> {
    if(file!=null) {
      window.localStorage.setItem("file", JSON.stringify(file));
    }
  }, [file])

    return (
      <div className='h-screen flex flex-col mb-36 items-center'>
        <Header></Header>
        <div className='w-full bg-[#fff] max-w-[1440px]'>
          <FileReceiver file={file} setFile={setFile} ></FileReceiver>
        </div>
    </div>
    )
}
