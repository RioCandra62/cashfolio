"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setMessage(data.error || "Failed to register");
      } else {
        setMessage("User registered successfully!");
        setForm({ fullName: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err: any) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF1F8] flex">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#0D1B52] text-white p-16">
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/assets/images/logo-flat.png"
            width={86}
            height={86}
            alt="logo"
            unoptimized
            className="rounded-md"
          />
          <h1 className="text-3xl font-bold">Cashfolio</h1>
        </div>
        <p className="text-lg opacity-90 text-center leading-relaxed">
          Create your account and manage
          <br />
          everything in one place.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 text-center mb-8">Join Cashfolio today</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
            />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D1B52] text-white py-3 rounded-lg hover:bg-[#15256d] transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {message && (
            <p
              className={`text-center mt-3 ${
                message.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-sm text-center mt-5">
            already have an account?
            <a
              href="/auth/login"
              className="text-[#0D1B52] font-semibold ml-1"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
