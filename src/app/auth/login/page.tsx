
import LoginPage from '@/components/LoginPage'
import React from 'react'
import { GoogleOAuthProvider } from "@react-oauth/google";


export default function page() {
  return (
    <div>
       <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_API_KEY_CLIENT_ID || ''}>
      {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_API_KEY_Client_ID || ''}> */}
        <LoginPage />
      </GoogleOAuthProvider>
    </div>
  )
}
