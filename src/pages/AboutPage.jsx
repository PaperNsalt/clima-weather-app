
import LottieBackground from "../components/LottieBackground";

function AboutPage(){
  return(
    <>
    <section>
    <div className="flex justify-center items-center mt-10">
      <h1 className="text-[3rem] font-bold tracking-tighter">About the Page</h1>
    </div>

    <div className="grid grid-cols-2 mt-30 gap-8">
      <div className="flex justify-center items-center">
        
      </div>

      <div className="flex justify-center items-start flex-col">
        <h1 className="text-[2.6rem] font-medium tracking-tighter leading-14">About CLIMA</h1>
        <p className="text-base">CLIMA is a modern web-based weather application designed to deliver accurate, real-time weather information through a clean and user-friendly interface. By leveraging reliable weather APIs and interactive map technology, CLIMA helps users better understand current and upcoming weather conditions at a glance.</p>
      </div>
    </div>
    </section>

    <section className="mt-30">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex justify-center items-start flex-col">
          <h1 className="text-[2.6rem] tracking-tighter font-medium">Purpose of the Project</h1>
          <p className="text-base">The goal of CLIMA is to provide an accessible and visually clear weather platform that enables users to monitor real-time weather conditions, visualize weather patterns through interactive maps, and make informed decisions for daily activities and travel, while showcasing effective API integration, UI/UX design, and frontend development skills.</p>
        </div>

        <div>

        </div>
      </div>
    </section>
    </>
  );
}

export default AboutPage;