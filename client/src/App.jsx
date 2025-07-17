import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, useParams } from 'react-router-dom'
import Home from './views/Home/Home'
//import './App.css'

function App() {
  const{token}=useParams();
  console.log('que tiene token: ', token);
  const [count, setCount] = useState(0)

  return (
    <div className='m-0'>
      <Routes>
        <Route path='/:token?' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
