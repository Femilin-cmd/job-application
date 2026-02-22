"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://job-application-backend-gw1n.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);

      if (res.ok) {
        // Store authentication in cookies for middleware RBAC
        document.cookie = `token=${data.token}; path=/`;
        document.cookie = `role=${data.user.role}; path=/`;

        // Redirect based on role
        if (data.user.role === "applicant") {
          router.push("/applicant");
        } else {
          router.push("/recruiter");
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-black">
   
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          Login
        </h2>
           <Link 
           href="/" 
            className="text-sm text-gray-500 hover:underline mb-4 inline-block"
          >
                  Back
            </Link>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p className="text-sm text-red-500 mb-4 text-center">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-lg dark:bg-white dark:text-black transition hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}