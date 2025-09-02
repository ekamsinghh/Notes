import React, { useState } from "react";
import rightcolumn from "../../assets/rightcolumn.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");

  const navigate = useNavigate();
  const handleGetOtp = () => {
    if (email.trim() !== "") setStep("otp");
  };

  const handleSignIn = () => {
    if (otp.trim() !== "") {
      alert("✅ Signed in successfully!");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Left Column */}
      <div className="flex flex-col flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <div className="font-semibold text-lg tracking-tight">HD</div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 justify-center px-4 md:px-12 lg:px-16 gap-8">
          <div className="flex flex-col gap-3 text-left">
            <b className="text-3xl md:text-4xl tracking-tight">
              {step === "email" ? "Sign in" : "Verify OTP"}
            </b>
            <p className="text-gray-500 text-sm md:text-base">
              {step === "email"
                ? "Welcome back! Sign in to continue using HD"
                : "Enter the OTP sent to your email"}
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5 max-w-sm w-full">
            {step === "email" ? (
              <>
                <div className="relative w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-blue-500">
                    Email
                  </label>
                </div>

                <button
                  onClick={handleGetOtp}
                  disabled={email.trim() === ""}
                  className={`w-full rounded-lg py-3 font-semibold text-white ${
                    email.trim() !== ""
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Get OTP
                </button>
              </>
            ) : (
              <>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-blue-500">
                    OTP
                  </label>
                </div>

                <button
                  onClick={handleSignIn}
                  disabled={otp.trim() === ""}
                  className={`w-full rounded-lg py-3 font-semibold text-white ${
                    otp.trim() !== ""
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {step === "email" && (
            <div className="text-gray-500 text-xs md:text-sm">
              Don’t have an account?{" "}
              <span
              onClick={()=>{
                navigate("/signup")
              }}
               className="text-blue-600 font-semibold underline cursor-pointer">
                Sign up
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column (Full Cover) */}
      <div className="hidden md:flex flex-1">
        <img
          src={rightcolumn}
          alt="illustration"
          className="relative right-[-2%] w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SigninPage;
