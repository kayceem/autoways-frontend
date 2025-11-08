import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ContentProvider } from "./context/globalContext.jsx";
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <ContentProvider>
      <App />
      <Toaster/>
    </ContentProvider>
  </QueryClientProvider>
</BrowserRouter>
)
