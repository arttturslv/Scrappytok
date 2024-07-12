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
  
    return (
      <div className='h-screen w-full max-w-[1440px] m-auto flex flex-col justify-center items-center'>
        <Header/>
        <FileReceiver file={file} setFile={setFile} ></FileReceiver>
    </div>
    )
}
