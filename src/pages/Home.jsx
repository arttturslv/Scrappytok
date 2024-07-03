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
      <div className='h-screen flex justify-center items-center mb-36'>
      <div className='w-full max-w-[1440px]'>
        <div className='absolute top-0'>
          <Header></Header>
          <FileReceiver file={file} setFile={setFile} ></FileReceiver>
        </div>
      </div>
    </div>
    )
}

/*

     {
            progress == 0 ?
              <FileReceiver file={file} setFile={setFile} ></FileReceiver>
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

*/