// import React from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ThemeProvider from '@/components/theme-provider'
import AuthProvider from '@/components/auth-provider'
import ProtectedRoute from '@/components/ProtectedRoute'

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

// Loading component for lazy-loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Protected Dashboard Route */}
            <Route 
              path='/dashboard/*' 
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />
            
            {/* Public Routes with Theme Provider */}
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
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
