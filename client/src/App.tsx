// import React from 'react'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

const LandingPage  = lazy(async () => import('@/pages/info/LandingPage'))
const Dashboard = lazy(async () => import('@/pages/util/Dashboard'))

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/dashboard/*' element={<Dashboard/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
