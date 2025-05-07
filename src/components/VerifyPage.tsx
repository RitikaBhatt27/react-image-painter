
import { useState } from "react";
import { Button } from "@/components/ui/button";
import brainLogo from "../assets/brain-logo.svg";

interface VerifyPageProps {
  phoneNumber: string;
}

const VerifyPage = ({ phoneNumber }: VerifyPageProps) => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  
  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    
    // Auto-focus next input
    if (value !== "" && index < 3) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerification = () => {
    const verificationCode = digits.join("");
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
        <div className="flex items-center z-10">
          <img src={brainLogo} alt="Brain Logo" className="w-16 h-16 mr-3" />
          <h1 className="text-3xl font-semibold text-white">BrainAI</h1>
        </div>
      </div>

      {/* Right side with verification input */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#111111] px-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white text-left mb-12">
            Verify Phone Number
          </h2>
          
          <div className="space-y-10">
            {/* 4-digit verification code input */}
            <div className="flex justify-between gap-4">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-14 bg-transparent border border-gray-600 rounded text-center text-xl text-white focus:border-gray-400 focus:outline-none"
                />
              ))}
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
