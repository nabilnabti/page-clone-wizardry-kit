
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A2533] p-6">
      <div className="max-w-md w-full bg-[#242E3E] p-6 rounded-lg shadow-lg text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-gray-300 mb-4">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="space-y-2">
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
          >
            Go to Home
          </Button>
          {resetErrorBoundary && (
            <Button 
              onClick={resetErrorBoundary}
              variant="outline" 
              className="w-full border-gray-600 hover:bg-gray-700"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
