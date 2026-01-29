import Lottie from "lottie-react";
import animationData from "../assets/lottie/AeroPlane.json"; // Your file

const LottieBackground = () => {
  return (
    <div className="absolute inset-0 -z-0 pointer-events-none">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        className="w-full h-full object-cover" // Ensure it fills the div
        style={{ width: "100%", height: "100%" }} // Force full size
      />
    </div>
  );
};

export default LottieBackground;