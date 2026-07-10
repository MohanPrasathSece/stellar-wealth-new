import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="bottom-right" theme="dark" />
    </AuthProvider>
  </React.StrictMode>,
)
