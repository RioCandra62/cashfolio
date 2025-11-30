"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF1F8] flex">
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
        <p className="text-lg opacity-90 text-center">
          Welcome to your dashboard.
          <br />
          Sign in to continue your journey!
        </p>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-8">Login to your account</p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg transition ${
                isLoading
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-[#0D1B52] text-white hover:bg-[#15256d]"
              }`}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </div>

          <p className="text-sm text-center mt-5">
            Don't have an account?
            <a href="/auth/register" className="text-[#0D1B52] font-semibold ml-1">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
