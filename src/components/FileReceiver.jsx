import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearData } from "../Hooks/useTikTokData";
export default function FileReceiver({file, setFile}) {
    const [existingFile, setExistingFile] = useState(null);

    function FileUploader (fileTarget) {   
        if(!fileTarget) {
          console.error("File undefined")
          return;
        }

        if(file) {
          clearData('ScrappyTok');
        } 

        const fr = new FileReader();
        fr.readAsText(fileTarget);

        fr.onload = () => {
          const parsedData = JSON.parse(fr.result);
          setFile(parsedData.Activity);
          localStorage.setItem('ScrappyTok', JSON.stringify({data: parsedData.Activity, name: fileTarget.name}));
        };
      
        fr.onerror = () => {
          console.error("Error reading file");
        };
    }

    useEffect(() => {
      const localFile = localStorage.getItem('ScrappyTok');
      if(localFile!=null) {
        console.log('Já tem um arquivo salvo.')
        setFile(JSON.parse(localFile));
      } 
    }, [])

    return (
        <div className='mx-20 flex justify-around items-center gap-8 max-sm:mx-4 max-lg:gap-0 max-lg:flex-col'>
          <div className="text-left">
            <h2 className='font-black text-7xl py-4 max-sm:text-5xl max-sm:px-8'>Web tool to show data from your tiktok data JSON.</h2>
            <p className='text-2xl py-4 max-sm:text-xl max-sm:px-8'>Totally local, drop your file, then navigate through your comments, likes, followers etc.</p>
          </div>
          
          <div className='flex flex-col w-min items-center gap-1'>
            <div className=''>
              <label htmlFor="avatar" className='cursor-pointer  w-48 flex-col flex items-center px-4 '>
                {
                  !file?
                      <img className="md:w-[100%] w-[80%] "  src="../src/assets/file-question-icon.svg" alt="" />
                  :
                    <>
                      <p className="text-sm">{file.name}</p>
                      <img className="w-[100%]" src="../src/assets/file-icon.svg" alt="" />
                    </>

                }
              </label>
              <input onChange={(e)=> FileUploader(e.target.files[0])} className='hidden' type="file" id="avatar" name="avatar" accept="*" />
            </div>
            <h3 className='text-xl'>drop a file </h3>
            {
              file&&
                ( 
                <Link to={'/options'} className='border-[#241623] border-8 rounded-xl px-8 flex items-center gap-2'>
                  <h3 className='text-xl'>Continuar</h3>
                </Link>
                )
            }
        </div>
      </div>

    )
}

/*

   <div className='md:mx-32 mx-8 flex flex-col items-center space-y-2'>
            <div className='w-[100%] h-[100%] max-h-16 max-w-96 gap-4 border-yellow-500 flex justify-center items-center border-4 rounded-xl'>
              <h3 className='font-black text-[3xl] '>drop a file </h3>
              <img width={"8%"} src="../src/assets/arrow-icon.svg" alt="" srcSet="" />
            </div>
            <div className='w-[100%] h-[100%] max-h-72 max-w-96 border-yellow-500 flex justify-center items-center border-4 rounded-xl'>
            <label htmlFor="avatar" className='cursor-pointer w-max flex-col flex items-center p-4'>
              {
                file==null?
                    <img className="md:w-[100%] w-[80%] "  src="../src/assets/file-question-icon.svg" alt="" />
                :
                  <>
                    <img className="w-[100%]" src="../src/assets/file-icon.svg" alt="" />
                    <p className="font-medium">{file.name}</p>
                  </>

              }
            </label>
            <input onChange={(e)=> FileUploader(e.target.files[0])} className='hidden' type="file" id="avatar" name="avatar" accept="*" />
            </div>
            <Link to={'/options'} className='w-[100%] h-[100%] gap-4 max-h-16 max-w-96 border-yellow-500 flex justify-center items-center border-4 rounded-xl'>
              <h3 className='font-black text-2xl '>Continuar</h3>
              <img width={"8%"} className=" -rotate-90" src="../src/assets/arrow-icon.svg" alt="" srcSet="" />
            </Link>
        </div>

*/