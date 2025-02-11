import { useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Herosection';
import Services from '../components/Services';
import Testimonial from '../components/Testimonial';
import BookingForm from '../components/Bookingcomponent';

function Home() {
  const bookingRef = useRef(null);

  return (
    <section className="overflow-hidden">
      <Navbar />
      <HeroSection bookingRef={bookingRef} />
      <Services />
      <Testimonial />
      <BookingForm ref={bookingRef} /> 
    </section>
  );
}

export default Home;
