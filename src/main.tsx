
import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react';
import App from './App.tsx'
import './index.css'
import { ErrorFallback } from './components/ErrorFallback.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from 'lucide-react';

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#1A2533]">
            <Loader className="h-8 w-8 text-[#7FD1C7] animate-spin" />
          </div>
        }>
          <App />
        </Suspense>
      </ErrorBoundary>
    </StrictMode>
  );
}
