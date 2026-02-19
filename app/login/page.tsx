"use client"

import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Top Branding */}
      <div className="pt-10 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold">
            W
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            WebinarPro
          </span>
        </div>
      </div>

      {/* Centered Login Card */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Welcome back
            </h2>

            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Sign in to manage your webinars, attendees, and analytics
              from your dashboard.
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="mt-8 w-full flex items-center justify-center gap-3 
                       bg-white border border-gray-300
                       hover:bg-gray-50 
                       h-12 rounded-xl 
                       text-sm font-medium text-gray-700 
                       transition-all duration-200 
                       shadow-sm hover:shadow"
          >
           
            Continue with  <Image
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="Google"
              width={58}
              height={58}
            />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-6">
            <div className="w-full h-px bg-gray-200" />
            <p className="text-xs text-gray-400 whitespace-nowrap">
              or continue with email
            </p>
            <div className="w-full h-px bg-gray-200" />
          </div>

          {/* EMAIL */}
          <div className="flex items-center w-full border border-gray-300 
                          focus-within:ring-2 focus-within:ring-indigo-500
                          rounded-xl h-12 px-4 transition">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center mt-5 w-full border border-gray-300 
                          focus-within:ring-2 focus-within:ring-indigo-500
                          rounded-xl h-12 px-4 transition">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              required
            />
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="w-full flex items-center justify-between mt-6 text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-600" />
              Remember me
            </label>

            <Link href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-xl 
                       bg-indigo-600 hover:bg-indigo-500 
                       text-white text-sm font-medium
                       transition-all duration-200 
                       shadow-md hover:shadow-lg"
          >
            Sign in
          </button>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link href="#" className="text-indigo-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
