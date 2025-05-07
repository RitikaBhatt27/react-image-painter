
import { useState } from "react";
import { Button } from "@/components/ui/button";
import brainLogo from "../assets/brain-logo.svg";
import { Input } from "@/components/ui/input";

interface VerifyPageProps {
  phoneNumber: string;
}

const VerifyPage = ({ phoneNumber }: VerifyPageProps) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerification = () => {
    console.log("Verification submitted:", verificationCode);
    // Add your verification logic here
  };

  const handleResendCode = () => {
    console.log("Resend code requested for:", phoneNumber);
    // Add your resend code logic here
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side with brain logo and network design */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1a1a] relative">
        <div className="absolute inset-0 opacity-10">
          <div className="network-lines"></div>
        </div>
        <div className="flex flex-col items-center z-10">
          <img src={brainLogo} alt="Brain Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-3xl font-semibold text-white">BrainAI</h1>
        </div>
      </div>

      {/* Right side with verification input */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#111111] px-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white text-left mb-12">
            Verify Phone Number
          </h2>
          
          <div className="space-y-6">
            <div className="relative">
              <Input 
                className="py-6 bg-[#232323] border-none text-white"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
              />
            </div>
            
            <Button 
              className="w-full py-6 bg-[#232323] hover:bg-[#2d2d2d] text-white rounded-md font-medium"
              onClick={handleVerification}
            >
              Verification
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full py-6 text-white hover:bg-[#232323] rounded-md font-medium"
              onClick={handleResendCode}
            >
              Send Again
            </Button>
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

export default VerifyPage;
