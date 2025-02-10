import Navbar from '../components/Navbar'
import HeroSection from '../components/Herosection'
import Services from '../components/Services'
import Testimonial from '../components/Testimonial'

function Home() {
  return (
    <section className="overflow-hidden">
        <Navbar />
        <HeroSection />
        <Services />
        <Testimonial />
    </section>
  )
}

export default Home