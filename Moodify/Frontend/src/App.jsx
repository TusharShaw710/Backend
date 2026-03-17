import { useState } from 'react'
import FaceExpression from './features/Expressions/components/FaceRecognition'
import { RouterProvider } from 'react-router'
import router from './App.route.jsx'
import './features/shared/styles/global.scss'

function App() {
  

  return (
    <>

    <RouterProvider router={router} />
      
    </>
  )
}

export default App
