import React, { useState } from "react";
import rightcolumn from "../../assets/rightcolumn.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleGetOtp = async () => {
    if (email.trim() === "") return;

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const response = await axiosInstance.post(API_PATHS.LOGIN, { email });

      if (response.status === 200) {
        setMessage("✅ OTP sent to your email!");
        setStep("otp");
      }
    } catch (err: any) {
      
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (otp.trim() === "") return;

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const response = await axiosInstance.post(API_PATHS.VERIFY_OTP, {
        email,
        otp,
      });

      if (response.status === 200) {
        setMessage("🎉 Signed in successfully!");
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user._id);
        }
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Invalid OTP or server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      
      <div className="flex flex-col flex-1 p-6 md:p-10 overflow-y-auto">
        
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <div className="font-semibold text-lg tracking-tight">Notes App</div>
        </div>

        <div className="flex flex-col flex-1 justify-center px-4 md:px-12 lg:px-16 gap-8 items-center">
         
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

          {error && (
            <div className="text-red-500 text-sm bg-red-100 p-2 rounded w-full max-w-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="text-green-600 text-sm bg-green-100 p-2 rounded w-full max-w-sm">
              {message}
            </div>
          )}

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
                  disabled={email.trim() === "" || loading}
                  className={`w-full rounded-lg py-3 font-semibold text-white ${
                    email.trim() !== "" && !loading
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Sending OTP..." : "Get OTP"}
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
                  disabled={otp.trim() === "" || loading}
                  className={`w-full rounded-lg py-3 font-semibold text-white ${
                    otp.trim() !== "" && !loading
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Verifying..." : "Sign In"}
                </button>
              </>
            )}
          </div>

          {step === "email" && (
            <div className="text-gray-500 text-xs md:text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-blue-600 font-semibold underline cursor-pointer"
              >
                Sign up
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:flex flex-1 p-2">
        <img
          src={rightcolumn}
          alt="illustration"
          className="w-full h-full object-cover rounded-3xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default SigninPage;
