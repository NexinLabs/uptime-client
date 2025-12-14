// import React from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ThemeProvider from '@/components/theme-provider'
import AuthProvider from '@/components/auth-provider'

const LandingPage = lazy(async () => import('@/pages/info/LandingPage'))
const Dashboard = lazy(async () => import('@/pages/util/Dashboard'))
const ProfilePage = lazy(async () => import('@/pages/util/ProfilePage'))
const LoginPage = lazy(async () => import('@/pages/info/auth/LoginPage'))
const SignUpPage = lazy(async () => import('@/pages/info/auth/SignUpPage'))
const VerifyAccPage = lazy(async () => import('@/pages/info/auth/VerifyAccPage'))
const ForgotPassPage = lazy(async () => import('@/pages/info/auth/ForgotPassPage'))
const ResetPassPage = lazy(async () => import('@/pages/info/auth/ResetPasswordPage'))
const AboutPage = lazy(async () => import('@/pages/info/misc/AboutPage'))
const ServiceDetailsPage = lazy(async () => import('@/pages/util/ServiceDetailsPage'))
const PricingPage = lazy(async () => import('@/pages/info/misc/PricingPage'))
const ContactPage = lazy(async () => import('@/pages/info/misc/ContactPage'))
const NotFoundPage = lazy(async () => import('@/pages/info/misc/NotFoundPage'))

// Legal Pages
const PrivacyPage = lazy(async () => import('@/pages/legal/PrivacyPage'))
const TermsPage = lazy(async () => import('@/pages/legal/TermsPage'))
const SecurityPage = lazy(async () => import('@/pages/legal/SecurityPage'))
const CookiesPage = lazy(async () => import('@/pages/legal/CookiesPage'))

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
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/dashboard/:id' element={<ServiceDetailsPage />} />
                        <Route path='/profile' element={<ProfilePage />} />

                        {/* Public Routes with Theme Provider */}
                        <Route path='/*' element={<ThemeProvider />}>
                            <Route index element={<LandingPage />} />
                            <Route path='login' element={<LoginPage />} />
                            <Route path='signup' element={<SignUpPage />} />
                            <Route path='verify' element={<VerifyAccPage />} />
                            <Route path='forgot-password' element={<ForgotPassPage />} />
                            <Route path='reset-password' element={<ResetPassPage />} />
                            <Route path='about' element={<AboutPage />} />
                            <Route path='pricing' element={<PricingPage />} />
                            <Route path='contact' element={<ContactPage />} />
                            <Route path='privacy' element={<PrivacyPage />} />
                            <Route path='terms' element={<TermsPage />} />
                            <Route path='security' element={<SecurityPage />} />
                            <Route path='cookies' element={<CookiesPage />} />
                            <Route path='*' element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
