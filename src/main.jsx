import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentProvider } from "./context/globalContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 60 * 1000, // 30 minutes - data rarely changes
            gcTime: 60 * 60 * 1000, // 1 hour - keep in cache longer
            refetchOnWindowFocus: false, // Don't refetch on window focus
            refetchOnMount: false, // Don't refetch on component mount if data is fresh
            retry: 1,
            retryDelay: 2000,
        },
    },
});

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ContentProvider>
                <App />
            </ContentProvider>
            <Toaster
                position="bottom-right"
                toastOptions={{
                icon: null,
                style: {
                    background: 'var(--color-text-accent)',
                    color: 'var(--color-primary)',
                },
                success: {
                    icon: null,
                },
                error: {
                    icon: null,
                    style: {
                    background: 'var(--color-error)',
                    color: 'var(--color-primary)',
                    },
                },
                }}
      />
        </QueryClientProvider>
    </BrowserRouter>
);
