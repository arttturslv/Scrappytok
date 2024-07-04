import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import Options from './pages/Options'
import ViewVideos from './pages/ViewVideos'
import ViewPeople from './pages/ViewPeople'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/options",
    element: <Options/>
  },
  {
    path: "/options/videos/:id",
    element: <ViewVideos/>
  },
  {
    path: "/options/people/:id",
    element: <ViewPeople/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
