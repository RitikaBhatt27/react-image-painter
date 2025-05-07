
import { Apple, Chrome } from "lucide-react";
import brainLogo from "../assets/brain-logo.svg";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side with brain logo */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1a1a] relative">
        <div className="absolute inset-0 opacity-10">
          <div className="network-lines"></div>
        </div>
        <div className="flex flex-col items-center z-10">
          <img src={brainLogo} alt="Brain Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-3xl font-semibold text-white">BrainAI</h1>
        </div>
      </div>

      {/* Right side with login options */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#111111] px-12">
        <div className="w-full max-w-md">
          <h2 className="text-xl text-white text-center mb-8">
            Login or Sign Up With Account
          </h2>
          
          <div className="space-y-4">
            <button 
              className="flex items-center justify-center w-full py-3 px-4 rounded-full bg-[#232323] text-white hover:bg-[#2d2d2d] transition-colors"
            >
              <Chrome className="mr-3 h-5 w-5" />
              <span>Sign in with Google</span>
            </button>
            
            <button 
              className="flex items-center justify-center w-full py-3 px-4 rounded-full bg-[#232323] text-white hover:bg-[#2d2d2d] transition-colors"
            >
              <Apple className="mr-3 h-5 w-5" />
              <span>Sign in with Apple</span>
            </button>
          </div>
          
          {/* Footer links */}
          <div className="mt-auto pt-32 text-center text-sm text-gray-500">
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of use</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy policy</a>
            </div>
            <img src={brainLogo} alt="Brain Icon" className="w-6 h-6 mx-auto mt-4 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
