import heroImage from '../assets/hero-image.png'; 

const HeroSection = () => {
  return (
    <section 
      className="relative h-[85vh] mt-10 pb-10 w-screen flex items-end justify-center bg-cover bg-no-repeat bg-center text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="relative text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Letting Your True Beauty Shine</h1>
        <button className="mt-6 px-6 py-2 text-sm font-medium bg-transparent cursor-pointer border-white border-2 hover:bg-black hover:border-black text-white rounded-sm ">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
