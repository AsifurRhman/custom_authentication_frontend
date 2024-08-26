"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    clearErrors();

    try {
      const response = await fetch("http://localhost:5000/api/user/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseBody = await response.json();
      if (!response.ok) {
      
        if (response.status === 404) {
          setError("email", { message: responseBody.message || "An error occurred" });
        } else {
          throw new Error(responseBody.message || "An error occurred");
        }
      } else {
        toast.success("Reset password link has been sent to your email.");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-16">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded">
        <p className="text-gray-600 mb-6 text-center">
          Forgot your password? Please enter your email address. You will
          receive a link to create a new password via email.
        </p>
        <div className="border-t border-gray-300 my-6" />
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-[#242424] text-left"
            >
              Email Address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full py-3 px-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-[#231f20]`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 text-left">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#0F0F0F] hover:bg-opacity-90 w-full text-white py-3 rounded font-semibold transition-all duration-300 ease-linear cursor-pointer flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : "Reset Password Link"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remembered your password?{" "}
            <Link href="/login" className="text-[#0F0F0F] hover:underline transition-all duration-300 ease-linear">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
