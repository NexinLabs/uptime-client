// import React from 'react'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import LandingPage from '@/pages/info/LandingPage'
const Dashboard = lazy(async () => import('@/pages/util/dashboard'))

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
