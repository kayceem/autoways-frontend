import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentProvider } from "../src/context/globalContext.jsx";
import { Toaster } from "react-hot-toast";
import Navbar from "../src/components/common/NavBar";
import Footer from "../src/components/common/Footer";
import "../src/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000, // 30 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      retryDelay: 2000,
    },
  },
});

export default function Layout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <Navbar />
        {children}
        <Footer />
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
      </ContentProvider>
    </QueryClientProvider>
  );
}
