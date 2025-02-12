function Footer() {
  return (
    <footer>
      <main className="p-6 bg-[#E8A9C3] flex sm:flex-row flex-col justify-around items-center sm:items-start">
        <div className="text-center sm:text-start">
          <h2 className="text-2xl font-bold capitalize text-center py-4 text-[#A10550]">
            how can we help?
          </h2>
          <ul className="space-y-2">
            <li className="capitalize cursor-pointer hover:underline">
              Services
            </li>
            <li className="capitalize cursor-pointer hover:underline">
              contact us
            </li>
            <li className="uppercase cursor-pointer hover:underline">faq</li>
            <li className="capitalize cursor-pointer hover:underline">
              our brand
            </li>
            <li className="capitalize cursor-pointer hover:underline">blog</li>
          </ul>
        </div>
        <div className="sm:text-start text-center flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-bold capitalize text-center py-4 text-[#A10550]">
            keep in touch with the glam
          </h2>
          <p className="capitalize py-2">
            join the glam newsletter and be the first to hear about news and
            offers
          </p>
          <div className="flex w-full gap-2">
            <input
              type="email"
              placeholder="Email Address"
              id=""
              className="border-b-2 border-[#A10550] px-2 text-[#A10550]  w-full"
            />
            <button className="mt-6 px-6 py-2 text-sm font-medium bg-transparent capitalize cursor-pointer text-[#A10550] hover:text-white border-[#A10550] border-2 hover:border-[#A10550] rounded-sm hover:bg-[#A10550]">
              subscribe
            </button>
          </div>
        </div>
      </main>
      <aside className="bg-[#A10550] text-center text-white py-4">
        <p className="font-normal text-sm capitalize">
          &copy; 2025 Glam. All rights reserved.
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
