import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/authContext.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google"
import ApiContextProvider from './context/apiContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='690167718041-dit09c9hmfpglcrbul3kicedfen420r4.apps.googleusercontent.com'>
      <ApiContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </ApiContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
