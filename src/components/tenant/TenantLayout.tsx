
import { TenantNavbar } from "./TenantNavbar";

interface TenantLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

export function TenantLayout({ children, title, showBackButton }: TenantLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1A2533]">
      <div className="max-w-md mx-auto px-4 pb-20 md:max-w-4xl md:pb-12 md:px-8 lg:px-12">
        <div className="md:flex md:gap-6">
          {/* Only show this on desktop */}
          <div className="hidden md:block md:w-52 md:pt-8">
            <TenantNavbar />
          </div>
          
          <div className="flex-1">
            <header className="flex items-center pt-6 pb-8 md:pt-8 md:pb-10">
              {showBackButton && (
                <button 
                  onClick={() => window.history.back()}
                  className="mr-4 text-white hover:text-gray-300"
                >
                  ←
                </button>
              )}
              <h1 className="text-xl text-white font-semibold md:text-2xl">{title}</h1>
            </header>
            <div className="md:grid md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:gap-6">
              {children}
            </div>
          </div>
        </div>
      </div>
      <TenantNavbar />
    </div>
  );
}
