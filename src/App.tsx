import React from 'react'
import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter'

const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
    </QueryClientProvider>
  )
}