import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function FileReceiver({file, setFile}) {
    const [existingFile, setExistingFile] = useState(null);

    function FileUploader (fileTarget) {   
        if(!fileTarget) {
          console.error("File undefined")
          return;
        }

        console.log(fileTarget.name);

        const fr = new FileReader();

        fr.readAsText(fileTarget);

        fr.onload = () => {
          const parsedData = JSON.parse(fr.result);
          setFile(parsedData.Activity);
          localStorage.setItem('ScrappyTok', JSON.stringify({data: parsedData.Activity, name: fileTarget.name}));
          console.log(parsedData);
        };
      
        fr.onerror = () => {
          console.error("Error reading file");
        };
    }

    useEffect(() => {
      const localFile = localStorage.getItem('ScrappyTok');
      if(localFile!=null) {
        console.log(JSON.parse(localFile))
        console.log('Já tem um arquivo salvo.')
        setFile(JSON.parse(localFile));
      } 
    }, [])

    return (
        <div className='h-full space-y-8 md:flex md:justify-center'>
          <div>
            <h2 className='font-black text-5xl py-4 px-12'>Web tool to show data from your tiktok JSON file</h2>
          </div>

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
      </div>

    )
}