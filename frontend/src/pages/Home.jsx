import Navbar from '../components/Navbar'
import HeroSection from '../components/Herosection'
import Services from '../components/Services'
import Testimonial from '../components/Testimonial'
import BookingForm from '../components/Bookingcomponent'

function Home() {
  return (
    <section className="overflow-hidden">
        <Navbar />
        <HeroSection />
        <Services />
        <BookingForm />
        <Testimonial />
    </section>
  )
}

export default Home