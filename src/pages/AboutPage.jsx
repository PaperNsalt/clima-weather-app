
import LottieBackground from "../components/LottieBackground";

function AboutPage(){
  return(
    <>
    <section>
    <div className="flex justify-center items-center">
      <h1 className="text-[3rem] font-bold tracking-tighter">About the Page</h1>
    </div>

    <div className="grid grid-cols-2 mt-10 gap-8">
      <div className="flex justify-center items-center">
        
      </div>

      <div className="">
        <h1 className="text-[2.6rem] font-medium tracking-tighter leading-14">About CLIMA</h1>
        <p className="text-base">CLIMA is a modern web-based weather application designed to deliver accurate, real-time weather information through a clean and user-friendly interface. By leveraging reliable weather APIs and interactive map technology, CLIMA helps users better understand current and upcoming weather conditions at a glance.</p>
      </div>
    </div>
    </section>

    <section>

    </section>
    </>
  );
}

export default AboutPage;