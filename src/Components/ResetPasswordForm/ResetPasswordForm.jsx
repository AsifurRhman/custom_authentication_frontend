"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast';

const ResetPasswordForm = ({ token }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/user/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: data.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError('password', { message: errorData.message || 'Failed to reset password' });
        throw new Error(errorData.message || 'Failed to reset password');
      }

      toast.success('Password has been reset successfully.');
      router.push('/login');
    } catch (err) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-gray-600 mb-6 text-center font-semibold text-2xl">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md flex flex-col">
        <div className="mb-4 relative">
          <label htmlFor="password" className="block mb-1 text-[#242424]">
            Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
              })}
              className={`w-full py-3 px-4 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-[#231f20]`}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-xl" />
              ) : (
                <AiOutlineEye className="text-xl" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#0F0F0F] hover:bg-opacity-90 w-full text-white py-3 rounded font-semibold transition-all duration-300 ease-linear flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
