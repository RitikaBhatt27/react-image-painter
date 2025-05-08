
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone } from "lucide-react";
import brainLogo from "../assets/brain-logo.svg";
import { useIsMobile } from "../hooks/use-mobile";

type ScreenType = "welcome" | "login" | "phone" | "verify";

const AuthFlow = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const isMobile = useIsMobile();
  
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

  const handlePhoneNumberSubmit = () => {
    console.log("Phone number submitted:", phoneNumber);
    setCurrentScreen("verify");
  };

  const handleVerification = () => {
    const verificationCode = digits.join("");
    console.log("Verification submitted:", verificationCode);
    // Add your verification logic here
    setCurrentScreen("login"); // Go back to login after verification
  };

  const handleResendCode = () => {
    console.log("Resend code requested for:", phoneNumber);
    // Add your resend code logic here
  };

  const handleLater = () => {
    console.log("User selected 'Later'");
    setCurrentScreen("login");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  const goBack = () => {
    if (currentScreen === "phone") {
      setCurrentScreen("welcome");
    } else if (currentScreen === "verify") {
      setCurrentScreen("phone");
    } else {
      setCurrentScreen("welcome");
    }
  };

  // Common network pattern background for left panel
  const LeftPanel = () => (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#1a1a1a] relative">
      <div className="absolute inset-0 opacity-10">
        <div className="network-lines"></div>
      </div>
      <div className="flex items-center z-10">
        <img src={brainLogo} alt="Brain Logo" className="w-16 h-16 mr-3" />
        <h1 className="text-3xl font-semibold text-white">BrainAI</h1>
      </div>
    </div>
  );

  // Common footer with terms and links
  const Footer = () => (
    <div className={`${isMobile ? "mt-auto pt-6" : "mt-auto pt-32"} text-center text-sm text-gray-500`}>
      <div className="flex justify-center space-x-4">
        <a href="#" className="hover:text-gray-300 transition-colors">Terms of use</a>
        <span>|</span>
        <a href="#" className="hover:text-gray-300 transition-colors">Privacy policy</a>
      </div>
      <img src={brainLogo} alt="Brain Icon" className="w-6 h-6 mx-auto mt-4 opacity-60" />
    </div>
  );

  // Mobile Back Button
  const BackButton = () => (
    isMobile && currentScreen !== "welcome" && (
      <button 
        onClick={goBack}
        className="absolute top-6 left-6 bg-[#232323] p-4 rounded-lg"
      >
        <ArrowLeft className="h-5 w-5 text-white" />
      </button>
    )
  );

  return (
    <div className={`flex min-h-screen w-full ${isMobile ? "flex-col" : ""}`}>
      {/* Left side with brain logo and network design (desktop only) */}
      {!isMobile ? <LeftPanel /> : null}

      {/* Mobile View - Welcome Screen Logo (only on welcome screen) */}
      {isMobile && currentScreen === "welcome" && (
        <div className="flex flex-col items-center mt-24 mb-8">
          <img src={brainLogo} alt="Brain Logo" className="w-20 h-20 mb-4" />
          <h1 className="text-3xl font-semibold text-white mb-6">Welcome to</h1>
          <h1 className="text-3xl font-semibold text-white">BrainAI</h1>
        </div>
      )}

      {/* Mobile View - Back Button (absolute positioned) */}
      <BackButton />

      {/* Right side with content based on current screen */}
      <div className={`${isMobile ? "flex-grow" : "flex-1"} flex flex-col ${isMobile ? "justify-start px-6 pb-4" : "justify-center items-center px-12"} bg-[#111111]`}>
        <div className={`w-full ${isMobile ? "max-w-full" : "max-w-md"}`}>
          {/* Welcome Screen - First time visit (Desktop & Mobile) */}
          {currentScreen === "welcome" && (
            <>
              {!isMobile && (
                <h2 className="text-3xl font-bold text-white text-center mb-12">
                  Login or Sign Up With Account
                </h2>
              )}
              <div className={`space-y-4 ${isMobile ? "mt-auto" : ""}`}>
                {isMobile && (
                  <p className="text-white text-base mb-8">Login or Sign Up With Account</p>
                )}
                <Button 
                  className="w-full py-6 bg-[#232323] hover:bg-[#2d2d2d] text-white rounded-md font-medium"
                  onClick={handleGoogleLogin}
                >
                  <div className="flex items-center justify-center w-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                      <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                      <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3037 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                      <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                    </svg>
                    Google
                  </div>
                </Button>
                <Button 
                  className="w-full py-6 bg-[#232323] hover:bg-[#2d2d2d] text-white rounded-md font-medium"
                  onClick={handleAppleLogin}
                >
                  <div className="flex items-center justify-center w-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M14.94 5.19C15.88 4.11 16.5 2.7 16.5 1.5C16.5 1.33 16.49 1.17 16.47 1C15.56 1.05 14.42 1.57 13.54 2.46C12.46 3.44 12.04 4.79 12.04 5.81C12.04 5.99 12.05 6.17 12.07 6.25C12.17 6.28 12.3 6.3 12.43 6.3C13.38 6.3 14.26 5.83 14.94 5.19ZM17.91 12.34C17.91 10.36 18.67 9.57 20.09 8.31C19.36 7.41 18.26 6.77 17.09 6.77C15.47 6.77 14.7 7.53 13.63 7.53C12.5 7.53 11.54 6.78 10.17 6.78C8.22 6.78 6 8.43 6 11.86C6 13.54 6.41 15.29 7.07 16.64C7.93 18.27 8.73 19.97 10.17 19.97C11.25 19.97 11.81 19.28 13.17 19.28C14.56 19.28 14.91 19.96 16.14 19.96C17.59 19.96 18.43 18.01 19.38 16.34C19.81 15.5 20.11 14.85 20.33 14.36C18.35 13.57 17.91 12.35 17.91 12.34Z" fill="white"/>
                    </svg>
                    Apple
                  </div>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full py-6 text-white hover:bg-[#232323] rounded-md font-medium"
                  onClick={() => setCurrentScreen("phone")}
                >
                  Phone Number
                </Button>
              </div>
            </>
          )}

          {/* Login Screen */}
          {currentScreen === "login" && (
            <>
              <h2 className="text-3xl font-bold text-white text-left mb-12">
                Login
              </h2>
              <div className="space-y-6">
                <Button 
                  className="w-full py-6 bg-[#232323] hover:bg-[#2d2d2d] text-white rounded-md font-medium"
                  onClick={() => setCurrentScreen("phone")}
                >
                  Login
                </Button>
              </div>
            </>
          )}

          {/* Phone Login Screen */}
          {currentScreen === "phone" && (
            <>
              {!isMobile && (
                <h2 className="text-3xl font-bold text-white text-left mb-12">
                  Enter Your Phone Number
                </h2>
              )}
              {isMobile && (
                <h2 className="text-3xl font-bold text-white mt-16 mb-8">
                  Enter Your Phone Number
                </h2>
              )}
              <div className="space-y-6">
                <div className="relative">
                  <Input 
                    className={`pl-10 py-6 ${isMobile ? "bg-[#1A1A1A]" : "bg-[#232323]"} border-none text-white rounded-md`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <Button 
                  className={`w-full py-6 ${isMobile ? "bg-[#1A1A1A]" : "bg-[#232323]"} hover:bg-[#2d2d2d] text-white rounded-md font-medium`}
                  onClick={handlePhoneNumberSubmit}
                >
                  Verification
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full py-6 text-white ${isMobile ? "hover:bg-[#1A1A1A]" : "hover:bg-[#232323]"} rounded-md font-medium`}
                  onClick={handleLater}
                >
                  Later
                </Button>
              </div>
            </>
          )}

          {/* Verify Screen */}
          {currentScreen === "verify" && (
            <>
              {!isMobile && (
                <h2 className="text-3xl font-bold text-white text-left mb-12">
                  Verify Phone Number
                </h2>
              )}

              {isMobile && (
                <div className="mt-16 mb-8 space-y-1">
                  <h2 className="text-3xl font-bold text-white">
                    Verify Phone Number
                  </h2>
                  <p className="text-gray-400 text-sm">
                    We Have Sent Code To Your Phone Number
                  </p>
                  <p className="text-gray-400 text-sm">
                    +{phoneNumber || "00 000000 0000"}
                  </p>
                </div>
              )}

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
                      className={`w-full h-14 bg-transparent border ${isMobile ? "border-white" : "border-gray-600"} rounded text-center text-xl text-white focus:border-gray-400 focus:outline-none`}
                    />
                  ))}
                </div>
                
                <Button 
                  className={`w-full py-6 ${isMobile ? "bg-[#1A1A1A]" : "bg-[#232323]"} hover:bg-[#2d2d2d] text-white rounded-md font-medium`}
                  onClick={handleVerification}
                >
                  {isMobile ? "Verify" : "Verification"}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className={`w-full py-6 text-white ${isMobile ? "hover:bg-[#1A1A1A]" : "hover:bg-[#232323]"} rounded-md font-medium`}
                  onClick={handleResendCode}
                >
                  Send Again
                </Button>
              </div>
            </>
          )}
          
          {/* Footer links */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;
