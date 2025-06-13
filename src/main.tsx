import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { AppRouter } from './routes/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
)
