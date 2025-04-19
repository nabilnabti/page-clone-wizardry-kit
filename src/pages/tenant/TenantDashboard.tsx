
import { Card } from "@/components/ui/card";
import { TenantNavbar } from "@/components/tenant/TenantNavbar";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TenantDashboard() {
  return (
    <div className="min-h-screen bg-[#1A2533]">
      <div className="max-w-md mx-auto px-4 pb-20 md:pb-0 md:px-6">
        <header className="pt-6 pb-8">
          <h1 className="text-2xl text-white font-bold">Hello, Thomas</h1>
          <p className="text-gray-400 mt-1">Room 1</p>
        </header>

        <div className="space-y-4">
          <Card className="p-4 bg-white rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Check In</h2>
              <ArrowRight className="text-gray-400" size={20} />
            </div>
            <Link
              to="/tenant/payments"
              className="block w-full py-2 px-4 bg-[#7FD1C7] text-white text-center rounded-lg hover:bg-[#6BC1B7] transition-colors"
            >
              Make Payment
            </Link>
          </Card>

          <Card className="p-4 bg-white rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium">Next Cleaning Task</h2>
              <Link to="/tenant/cleaning">
                <ArrowRight className="text-gray-400" size={20} />
              </Link>
            </div>
            <div className="bg-[#7FD1C7] text-white p-2 rounded-lg mb-2">
              April 26
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>May 10</span>
              <span>May 20</span>
            </div>
          </Card>

          <Card className="p-4 bg-white rounded-xl">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">Last Cleaning Task</h2>
              <Link to="/tenant/cleaning" className="flex items-center text-sm text-[#7FD1C7]">
                View All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
      <TenantNavbar />
    </div>
  );
}
