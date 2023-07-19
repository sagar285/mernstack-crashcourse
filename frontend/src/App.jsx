import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Component/Home'
import Navbar from './Layout/Navbar'
import Register from './Component/Register'
import Login from './Component/Login'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App