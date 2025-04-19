
import { TenantNavbar } from "./TenantNavbar";

interface TenantLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

export function TenantLayout({ children, title, showBackButton }: TenantLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1A2533]">
      <div className="max-w-md mx-auto px-4 pb-20 md:pb-0 md:px-6">
        <header className="flex items-center pt-6 pb-8">
          {showBackButton && (
            <button 
              onClick={() => window.history.back()}
              className="mr-4 text-white hover:text-gray-300"
            >
              ←
            </button>
          )}
          <h1 className="text-xl text-white font-semibold">{title}</h1>
        </header>
        {children}
      </div>
      <TenantNavbar />
    </div>
  );
}
