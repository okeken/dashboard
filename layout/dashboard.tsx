import type { ReactElement } from "react";

function getDashLayout(page: ReactElement) {
  return (
    <>
      <div className="fixed bottom-0 w-full bg-white shadow-md md:hidden">
        <nav className="flex justify-between mx-auto max-w-7xl px-4 py-3">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
            Contact
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
            Blog
          </a>
        </nav>
      </div>

      <div className="lg:grid grid-cols-10">
        <div className="hidden md:block  col-span-2 h-screen bg-brand-blue-100 text-white ">
          <div className="flex flex-col justify-between h-screen  p-2 pl-5 pt-6">
            <div>
              {" "}
              <div className="flex mb-3">
                <div className="bg-brand-blue-200 inline-block p-3 text-2xl font-semibold mr-3">
                  OC
                </div>
                <div>
                  <div className="text-xl font-bold uppercase">
                    {" "}
                    OC
                    <sup className="font-normal">tm</sup>
                  </div>
                  <div className="text-brand-blue-300 text-xl font-semibold">
                    {" "}
                    Order Central
                  </div>
                </div>
              </div>
            </div>
            <div>Bottom Nav</div>
          </div>
        </div>
        <div className="col-span-8 bg-[#D1D7DC]/30 ">{page}</div>
      </div>
    </>
  );
}

export default getDashLayout;
