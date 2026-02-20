"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">

      {/* Floating background shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-6 right-6 px-4 py-2 text-sm rounded-lg bg-gray-800 text-white dark:bg-gray-200 dark:text-black transition"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Card */}
      <div className="relative z-10 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md text-center transition-colors duration-500">

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          NextHire
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Smart hiring. Seamless opportunities.
        </p>

        <div className="space-y-6">

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="block w-full py-3 rounded-lg bg-gray-900 text-white hover:scale-105 transition duration-300 dark:bg-white dark:text-black"
            >
              Login
            </Link>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              New user?
            </p>
            <Link
              href="/register"
              className="block w-full py-3 rounded-lg border border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300"
            >
              Register
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}