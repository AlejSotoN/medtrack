import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter'
import { AuthProvider } from './contexts/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
      </QueryClientProvider>
    </AuthProvider>
  )
}
