"use client";

import Link from "next/link";

export default function ApplicantDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">

      <h1 className="text-3xl font-bold dark:text-white">
        Applicant Dashboard 🎓
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Link
          href="/applicant/jobs"
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
        >
          <h2 className="text-lg font-semibold dark:text-white">
            Browse Jobs
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            View available job openings.
          </p>
        </Link>

        <Link
          href="/applicant/applications"
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
        >
          <h2 className="text-lg font-semibold dark:text-white">
            My Applications
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Track your application status.
          </p>
        </Link>

        <Link
          href="/applicant/profile"
          className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
        >
          <h2 className="text-lg font-semibold dark:text-white">
            Profile
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Manage your account.
          </p>
        </Link>

      </div>

    </div>
  );
}