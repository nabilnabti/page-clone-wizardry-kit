
import { Home } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6 px-4 md:px-20">
      <div className="flex items-center space-x-2">
        <Home className="h-6 w-6 text-[#7FD1C7]" />
        <span className="text-white text-xl font-semibold">COLIVE</span>
      </div>
      <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533] font-medium">
        Get Started
      </Button>
    </nav>
  );
};

export default Navbar;
