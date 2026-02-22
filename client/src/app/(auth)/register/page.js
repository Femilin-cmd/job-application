"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [role, setRole] = useState("applicant");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://job-application-backend-gw1n.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {          
          router.push("/login");
        }, 1500);
      } else {
        setMessage(data.message || "Registration failed");
        
      }

    } catch (error) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">

      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-md transition-colors duration-500">

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          Create Account
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          Join NextHire today
        </p>

        <form className="space-y-5" onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setRole("applicant")}
              className={`flex-1 py-2 rounded-lg border ${
                role === "applicant"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              } transition`}
            >
              Applicant
            </button>

            <button
              type="button"
              onClick={() => setRole("recruiter")}
              className={`flex-1 py-2 rounded-lg border ${
                role === "recruiter"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              } transition`}
            >
              Recruiter
            </button>
          </div>
          {message && (
            <p className="text-sm text-center text-green-600 dark:text-green-400 mb-3">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gray-900 text-white hover:scale-105 transition duration-300 dark:bg-white dark:text-black"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 dark:text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}