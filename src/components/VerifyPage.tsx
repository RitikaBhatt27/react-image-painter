
import { useState } from "react";
import { Button } from "@/components/ui/button";
import brainLogo from "../assets/brain-logo.svg";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface VerifyPageProps {
  phoneNumber: string;
}

const VerifyPage = ({ phoneNumber }: VerifyPageProps) => {
  const [otp, setOtp] = useState("");

  const handleVerification = () => {
    console.log("OTP verification submitted:", otp);
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
        <div className="flex items-center z-10">
          <img src={brainLogo} alt="Brain Logo" className="w-16 h-16 mr-3" />
          <h1 className="text-3xl font-semibold text-white">BrainAI</h1>
        </div>
      </div>

      {/* Right side with OTP input */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#111111] px-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white text-left mb-12">
            Verify Phone Number
          </h2>
          
          <div className="space-y-10">
            <div className="flex justify-center">
              <InputOTP 
                maxLength={4} 
                value={otp} 
                onChange={setOtp}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot 
                        key={index} 
                        index={index} 
                        className="w-16 h-14 bg-[#232323] border-none text-white text-lg"
                      />
                    ))}
                  </InputOTPGroup>
                )}
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
