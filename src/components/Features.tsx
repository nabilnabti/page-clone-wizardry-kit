
import { calendar, credit-card, file-text, bell } from "lucide-react";

const features = [
  {
    icon: calendar,
    title: "Check-In & Check-Out",
    description: "Keep track of tenant start and end dates",
  },
  {
    icon: credit-card,
    title: "Payment Updates",
    description: "Receive and record payments with ease",
  },
  {
    icon: file-text,
    title: "House Rules & Charter",
    description: "Access important guidelines and regulations",
  },
  {
    icon: bell,
    title: "Notice",
    description: "Submit and manage move-out notices",
  },
  {
    icon: calendar,
    title: "Cleaning Tasks",
    description: "Stay on top of weekly chores with a schedule",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="p-2 rounded-lg bg-[#7FD1C7] bg-opacity-10 mb-4">
              <feature.icon className="h-6 w-6 text-[#7FD1C7]" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
