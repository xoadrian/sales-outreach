import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      retry: 1, // Only retry failed requests once
      refetchOnWindowFocus: false, // Add this to prevent localStorage error
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            minWidth: '300px',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            style: {
              background: '#1e293b', // slate-800
              color: 'white',
            },
            iconTheme: {
              primary: '#22c55e', // green-500
              secondary: 'white',
            },
          },
          error: {
            style: {
              background: '#dc2626', // red-600
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#dc2626',
            },
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
)
