import Girls from '../assets/testimonial-img.png'
function Testimonial() {
  return (
    <section className='w-screen bg-gray-200 flex sm:flex-row flex-col items-center justify-center py-5'>
        <div className="w-5/6 sm:w-4/12 bg-[#A10550] h-48 text-white px-5 flex flex-col  justify-center">
            <h4 className='font-semibold'>We take care of our clients and our people.</h4>
            <p className='font-normal'>Share your company&apos;s mission, vision, or background with your potential clients. 
                Set yourself apart from the competition with a strong brand persona that puts your clients first.
            </p>
        </div>
        <div className='w-5/6 sm:w-4/12 h-48 bg-cover' style={{ backgroundImage: `url(${Girls})` }}></div>
    </section>
  )
}

export default Testimonial