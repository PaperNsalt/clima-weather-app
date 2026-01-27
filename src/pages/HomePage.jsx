import { motion } from "framer-motion";
import { LocationIcon } from "../components/IconComponent";
import logo from "../assets/ClimaLogo.svg";

function HomePage() {
  return (
    <>
      <section>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col p-10 rounded-3xl bg-[#4b92e3]/30 gap-4">
            <div className="flex flex-row rounded-full bg-amber-50 max-w-46 justify-evenly items-center py-1 px-4">
              {LocationIcon}
              <p className="tracking-tighter">Albay,Philippines</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <h1 className="text-[2.8rem] tracking-tighter font-bold leading-10">
                  Weather
                </h1>
                <p className="text-gray-700 text-base">Now</p>
              </div>

              <div className="flex items-center justify-center">
                <img src={logo} alt="" className="size-50" />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <h1 className="text-[6rem] font-bold">25.C</h1>
              </div>

              <div className="flex flex-row justify-evenly items-center">
                <div className="bg-amber-300 flex flex-col justify-center items-center p-8 rounded-2xl">
                  <p>Visibility</p>
                  <h1 className="text-[1.8rem] font-medium">4.1 km</h1>
                </div>

                <div className="bg-amber-300 flex flex-col justify-center items-center p-8 rounded-2xl">
                  <p>Humidity</p>
                  <h1 className="text-[1.8rem] font-medium">87%</h1>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
