// import React from 'react'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ThemeProvider from '@/components/theme-provider'

const LandingPage  = lazy(async () => import('@/pages/info/LandingPage'))
const Dashboard = lazy(async () => import('@/pages/util/Dashboard'))
const LoginPage = lazy(async () => import('@/pages/info/auth/LoginPage'))
const SignUpPage = lazy(async () => import('@/pages/info/auth/SignUpPage'))
const VerifyAccPage = lazy(async () => import('@/pages/info/auth/VerifyAccPage'))
const ForgotPassPage = lazy(async () => import('@/pages/info/auth/ForgotPassPage'))
const AboutPage = lazy(async () => import('@/pages/info/misc/AboutPage'))
const PricingPage = lazy(async () => import('@/pages/info/misc/PricingPage'))
const ContactPage = lazy(async () => import('@/pages/info/misc/ContactPage'))
const NotFoundPage = lazy(async () => import('@/pages/info/misc/NotFoundPage'))

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/dashboard/*' element={<Dashboard/>}></Route>
            <Route path='/*' element={<ThemeProvider/>}>
                <Route index element={<LandingPage/>}></Route>
                <Route path='login' element={<LoginPage/>}></Route>
                <Route path='signup' element={<SignUpPage/>}></Route>
                <Route path='verify' element={<VerifyAccPage/>}></Route>
                <Route path='forgot-password' element={<ForgotPassPage/>}></Route>
                <Route path='about' element={<AboutPage/>}></Route>
                <Route path='pricing' element={<PricingPage/>}></Route>
                <Route path='contact' element={<ContactPage/>}></Route>
                <Route path='*' element={<NotFoundPage/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
