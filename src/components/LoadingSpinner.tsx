// components/LoadingSpinner.js

import Image from "next/image";
import SpinnerImage from "@icons/loadingSpinner.png";

const LoadingSpinner = () => {
  return (
    <div className="w-24 h-24 relative animate-spin">
      <Image src={SpinnerImage} alt="Loading spinner" layout="fill" objectFit="contain" />
    </div>
  );
};

export default LoadingSpinner;
