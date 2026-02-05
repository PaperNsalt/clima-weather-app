import Lottie from "lottie-react";
import animationData from "../assets/lottie/AeroPlane.json";

const LottieBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        // This makes the SVG act like object-fit: cover
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }} 
      />
    </div>
  );
};

export default LottieBackground;