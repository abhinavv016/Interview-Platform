import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { dark } from "@clerk/themes";

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#22d3ee", // Your Electric Cyan
    colorBackground: "#0d110d", // Matching your editor bg
    colorInputBackground: "#0a0d0a",
    colorInputText: "#f1ede4",
    borderRadius: "0.75rem",
    fontFamily: "Geist, sans-serif",
  },
  elements: {
    card: "border border-white/10 shadow-[0_20px_50px_rgba(34,211,238,0.15)]",
    navbar: "hidden", // Clean up the UI
    headerTitle: "text-stone-100",
    headerSubtitle: "text-stone-400",
  }
};

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if(!PUBLISHABLE_KEY){
  throw new Error("Missing Clerk Publishable Key")
}
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}> 
    <ClerkProvider appearance={clerkAppearance} publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
