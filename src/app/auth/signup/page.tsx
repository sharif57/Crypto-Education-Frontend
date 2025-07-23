import SignUp from '@/components/Signup'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

export default function page() {
  return (
    <div>
         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_API_KEY_CLIENT_ID || ''}>
      {/* <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_API_KEY_Client_ID || ''}> */}
        <SignUp />
      </GoogleOAuthProvider>
    </div>
  )
}
