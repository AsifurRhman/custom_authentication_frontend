"use client";

import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";

const OTPForm = () => {
    const params = useParams();
    const email = params.email;
    console.log(email)
  const { register, handleSubmit, setValue, getValues, formState: { errors }, trigger } = useForm();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const router = useRouter();


  const handleChange = async (index, value) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setValue(`code${index + 1}`, value);

    if (value && index < 5) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }

    if (value === "" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }

    await trigger(`code${index + 1}`);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const verificationCode = getValues(["code1", "code2", "code3", "code4", "code5", "code6"]).join("");
    console.log("Verification Code:", verificationCode);
    try {
      const response = await fetch(`http://localhost:5000/api/user/verify-otp/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: verificationCode }),
      });
      console.log(response,"response")

      if (response.ok) {
        toast.success("Email verified successfully");
        
          router.push('http://localhost:3000/home');
    
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-md shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#242424]">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <div key={index} className="flex flex-col items-center">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  {...register(`code${index + 1}`, {
                    required: "This field is required",
                    validate: (value) => /^\d$/.test(value) || "Invalid code"
                  })}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-semibold text-[#242424] border rounded-lg focus:outline-none ${errors[`code${index + 1}`] ? 'border-red-500' : 'border-gray-300'} focus:border-[#242424]`}
                />
                {errors[`code${index + 1}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`code${index + 1}`]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-[#0F0F0F] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <FaSpinner className="animate-spin mr-2" />
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
