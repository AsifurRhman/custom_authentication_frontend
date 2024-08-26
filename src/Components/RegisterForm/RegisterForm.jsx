"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import logo from "../../Assets/2wo_playwaer_without_bg_logo.png";
import { FaSpinner } from "react-icons/fa";
import Register from "../../Assets/Register.gif";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState(null);

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setApiErrors(null);

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        setApiErrors(result.errors || result.message || "Registration failed");
        toast.error(apiErrors);
      }
    } catch (error) {
      setApiErrors("An error occurred. Please try again.");
      toast.error(apiErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="grid md:grid-cols-10 w-full h-full items-center text-slate-500 gap-8 md:px-[140px]">
        <div className="hidden md:flex col-span-8 md:col-span-5 justify-center items-center">
          <Image
            src={Register}
            alt="Register GIF"
            priority={true}
            width={600}
            height={600}
          />
        </div>
        <div className="col-span-9 md:col-span-4 flex flex-col justify-center items-center h-full px-4">
          <div className="w-full">
            <Image
              src={logo}
              alt="logo"
              className="mx-auto mb-2"
              width={50}
              height={50}
              priority={true}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="block mb-1 text-[#242424]">
                  User Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full py-3 px-4 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-[#231f20]`}
                  onBlur={() => trigger("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="block mb-1 text-[#242424]">
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full py-3 px-4 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-[#231f20]`}
                  onBlur={() => trigger("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-3 relative">
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
                        message: "Password must be at least 5 characters",
                      },
                    })}
                    className={`w-full py-3 px-4 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-[#231f20]`}
                    onBlur={() => trigger("password")}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-6 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 text-[#242424]"
                >
                  Confirm Password
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className={`w-full py-3 px-4 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-[#231f20]`}
                    onBlur={() => trigger("confirmPassword")}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#0F0F0F] hover:bg-opacity-90 w-full text-white py-3 rounded font-semibold transition-all duration-300 ease-linear flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-[#242424] hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
