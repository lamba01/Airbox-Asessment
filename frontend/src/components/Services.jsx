import { useState } from "react";
import Haircut from "../assets/haircut-icon.svg";
import Lashes from "../assets/lashes-icon.svg";
import Makeup from "../assets/makeup-icon.svg";
import Manicure from "../assets/manicure svg.svg";
import Facial from "../assets/facial-svg.svg";

const servicesData = [
  { id: 1, name: "Haircut", icon: Haircut, alt: "scissors" },
  { id: 2, name: "Lashes & Brows", icon: Lashes, alt: "lashes" },
  { id: 3, name: "Makeup", icon: Makeup, alt: "makeup-kit" },
  { id: 4, name: "Manicure", icon: Manicure, alt: "manicure" },
  { id: 5, name: "Facial", icon: Facial, alt: "facial" }
];

function Services() {
  const [activeService, setActiveService] = useState("Facial");

  return (
    <section className="w-full flex  items-center flex-col gap-5 bg-[#E8A9C3] m-0 p-10 text-center">
      <h2 className="text-2xl font-bold capitalize">What are you looking for?</h2>
      <aside className="flex flex-col sm:flex-row gap-10 mt-5 items-center justify-center">
        {servicesData.map((service) => (
          <div 
            key={service.id} 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveService(service.name)}
          >
            <div 
              className={`w-20 h-20 flex justify-center items-center rounded-full 
                ${activeService === service.name ? "bg-[#A10550]" : "bg-[#F48CB8] hover:bg-[#A10550]"}`}
            >
              <img src={service.icon} alt={service.alt} className="w-10 h-10" />
            </div>
            <h5 className="text-black pt-2">
              {service.name}
            </h5>
          </div>
        ))}
      </aside>
    </section>
  );
}

export default Services;
