"use client";

import Image from 'next/image'; 

import { useRouter } from 'next/navigation';
import { use } from 'react';
export default function Login() {

  const router = useRouter();
  return (
    <>
      <div className="min-h-screen bg-[#EEF1F8] flex">
        {/* LEFT PANEL (Brand) */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#0D1B52] text-white p-16">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src={"/assets/images/logo-flat.png"}
              width={86}
              height={86}
              unoptimized
              alt="logo"
              className="rounded-md"
            />
            <h1 className="text-3xl font-bold">Cashfolio</h1>
          </div>

          <p className="text-lg opacity-90 text-center leading-relaxed">
            Welcome to your dashboard.
            <br />
            Sign in to continue your journey!
          </p>
        </div>

        {/* RIGHT PANEL (Form) */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
          <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Login to your account
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52] focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52] focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  Remember me
                </label>
                <a href="#" className="text-[#0D1B52] font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                // type="submit"
                onClick={() => router.push('/dashboard')}
                className="w-full bg-[#0D1B52] text-white py-3 rounded-lg hover:bg-[#15256d] transition"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button className="w-full border py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                width="22"
              />
              Continue with Google
            </button>

            {/* Register */}
            <p className="text-sm text-center mt-5">
              Don't have an account?
              <a href="/dashboard" className="text-[#0D1B52] font-semibold ml-1">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
