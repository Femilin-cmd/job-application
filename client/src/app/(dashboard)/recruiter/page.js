"use client";

import Link from "next/link";

export default function RecruiterDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">

      <h1 className="text-3xl font-bold dark:text-white">
        Recruiter Dashboard 🧑‍💼
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <Link
          href="/recruiter/jobs"
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
        >
          <h2 className="text-lg font-semibold dark:text-white">
            My Job Listings
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            View and manage your posted jobs.
          </p>
        </Link>

        <Link
          href="/recruiter/create-job"
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
        >
          <h2 className="text-lg font-semibold dark:text-white">
            Post New Job
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Create a new job opening.
          </p>
        </Link>

        <Link
          href="/recruiter/profile"
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
        >
          <h2 className="text-lg font-semibold dark:text-white">
            My Profile
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            View your recruiter details.
          </p>
        </Link>

      </div>

    </div>
  );
}