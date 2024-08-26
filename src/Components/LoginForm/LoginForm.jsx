"use client";

import Image from "next/image";
import logo from "../../Assets/2wo_playwaer_without_bg_logo.png";
import Login from "../../Assets/Login.gif";
import google from '../../Assets/googlelogo.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data) 
    const email = data?.email
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/verify-otp/${email}`);
      } else {
        toast.error(result.message || "An error occurred");
        setError("server", { message: result.message || "An error occurred" });
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    
  
    try {
     
      await router.push('http://localhost:5000/auth/google');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      
    }
  };
  const handleInputChange = (field) => {
    clearErrors(field);
    clearErrors("server");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="grid md:grid-cols-10 w-full h-full items-center text-slate-500 gap-8 md:px-[60px] lg:px-[140px]">
          <div className="hidden md:flex col-span-8 md:col-span-5 justify-center items-center">
            <Image
              src={Login}
              alt="login"
              priority={true}
              width={600}
              height={600}
              unoptimized
            />
          </div>

          <div className="col-span-9 md:col-span-4 flex flex-col justify-center items-center h-full px-4">
            <div className="w-full">
              <div>
                <Image
                  src={logo}
                  alt="logo"
                  className="mx-auto w-20 h-20 mb-4"
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 space-y-3">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 text-[#242424]"
                      >
                        Email Address
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        id="email"
                        className={`w-full py-3 px-4 border ${errors.email ? "border-red-500" : "border-gray-300"
                          } rounded focus:outline-[#231f20]`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                          },
                        })}
                        onChange={() => handleInputChange("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-4 relative">
                      <label
                        htmlFor="password"
                        className="block mb-1 text-[#242424]"
                      >
                        Password
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: "Password is required",
                          })}
                          className={`w-full py-3 px-4 border ${errors.password
                              ? "border-red-500"
                              : "border-gray-300"
                            } rounded focus:outline-[#231f20]`}
                          onChange={() => handleInputChange("password")}
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
                  </div>

                  {errors.server && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.server.message}
                    </p>
                  )}

                  <div className="py-3 flex gap-4 justify-between items-center w-full">
                    <div className="flex items-center">
                      <input
                        className="custom-checkbox"
                        type="checkbox"
                        name="checkbox"
                        id="checkbox"
                      />
                      <label htmlFor="checkbox" className="ml-2 text-[#242424]">
                        Remember Me
                      </label>
                    </div>
                    <div className="flex gap-1 items-center text-[#242424] hover:text-[#231f20] cursor-pointer transition-all duration-300 ease-linear hover:underline">
                      <Link href="/forgot-password" className="text-[#242424]">
                        Lost Your Password?
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0F0F0F] hover:bg-opacity-90 w-full text-white py-3 rounded font-semibold transition-all duration-300 ease-linear flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin mr-2" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="pt-6 text-center">
                  <p>
                    Do not have an account?{" "}
                    <Link href="/register" className="text-[#242424]">
                      Register
                    </Link>
                  </p>
                </div>

                <div className="pt-6 flex justify-center">
                  <button
                    
                    onClick={handleGoogleSignIn}
                    className="text-black py-3 px-6 rounded font-semibold transition-all duration-300 ease-linear flex items-center">
                    <Image src={google} alt="Google" width={50} height={50} className="rounded-full bg-transparent mr-2" />
                    Sign in with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
