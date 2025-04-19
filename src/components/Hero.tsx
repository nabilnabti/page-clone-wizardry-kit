
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between py-12 px-4 md:px-20 gap-12">
      <div className="flex-1">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Subletting management made easy
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Streamline check-ins, payments, house rules, and communication
        </p>
        <Button className="bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533] font-medium px-8 py-6 text-lg">
          Download the app
        </Button>
      </div>
      <div className="flex-1 flex justify-center lg:justify-end">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="COLIVE App Interface"
          className="w-full max-w-md object-cover rounded-lg shadow-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
