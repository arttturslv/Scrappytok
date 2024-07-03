import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w- h-screen flex justify-center items-center'>
      <div className='w-full max-w-[1440px'>
        <Header></Header>

        <div className='h-full space-y-8'>
          <h2 className='font-black text-5xl bg-inherit py-4 px-12'>Web tool to show data from your tiktok or instagram</h2>
          <div className='mx-32 space-y-2'>
              <div className='w-96 h-16 gap-4 border-yellow-500 flex justify-center items-center border-4 rounded-xl'>
                <h3 className='font-black text-3xl '>drop a file </h3>
                <img width={"8%"} src="../src/assets/arrow-icon.svg" alt="" srcset="" />
              </div>
              <div className='w-96 h-72 border-yellow-500 flex justify-center items-center border-4 rounded-xl'>
              <label for="avatar">
                <img width={"100%"} src="../src/assets/file-question-icon.svg" alt="" srcset="" />
              </label>
              <input className='hidden' type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
              </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
