import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router/appRouter'
import './global/global.css'

export const APIHost = "https://sistema-de-noticias-api.dev.hardproxdev.com.br/"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
