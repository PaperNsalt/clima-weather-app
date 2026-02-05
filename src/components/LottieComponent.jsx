import Lottie from "lottie-react";
import SharpUmbrellaAnimation from '../assets/lottie/Sharp Umbrella.json';

function LottieComponent({ className }) {
  return (
    <div className={`w-full h-auto flex justify-center items-center ${className}`}>
      <Lottie
        animationData={SharpUmbrellaAnimation}
        loop={true}
        autoPlay={true}
      
        style={{ width: "100%", height: "auto", maxWidth: "500px" }} 
      />
    </div>
  );
}

export default LottieComponent;