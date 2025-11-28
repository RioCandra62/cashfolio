import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#EEF1F8] flex">
      {/* LEFT PANEL */}
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
          Create your account and manage
          <br />
          everything in one place.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 text-center mb-8">Join Cashfolio today</p>

          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52] focus:outline-none"
                placeholder="John Doe"
              />
            </div>

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
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52] focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0D1B52] focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#0D1B52] text-white py-3 rounded-lg hover:bg-[#15256d] transition"
            >
              Create Account
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
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-sm text-center mt-5">
            Already have an account?
            <a href="/auth/login" className="text-[#0D1B52] font-semibold ml-1">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
