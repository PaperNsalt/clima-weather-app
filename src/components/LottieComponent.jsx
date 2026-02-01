import Lottie from "lottie-react";
import SharpUmbrellaAnimation from '../assets/lottie/Sharp Umbrella.json';

function LottieComponent({
  width = 500,
  height = 500
}) {
  return(
    <Lottie
    animationData={SharpUmbrellaAnimation}
    loop={true}
    autoPlay={true}
    style={{ width: width, height: height }}
    />
  );
}

export default LottieComponent;