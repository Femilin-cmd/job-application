"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const cookieRole = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1];

    if (!cookieRole) {
      router.push("/login");
    } else {
      setRole(cookieRole);
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">

      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold dark:text-white">
            NextHire
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {role} Dashboard
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded-lg dark:bg-white dark:text-black transition hover:opacity-90"
        >
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

    </div>
  );
}