"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/jobs?keyword=${search}`
        );

        const data = await res.json();

        setJobs(data.jobs || []); // ✅ FIXED
      } catch (error) {
        console.error("Error fetching jobs");
        setJobs([]);
      }
    };

    fetchJobs();
  }, [search]);

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">
        Browse Jobs
      </h1>

      <input
        type="text"
        placeholder="Search by title, company, or skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border dark:bg-gray-900 dark:text-white"
      />

      {jobs.length === 0 ? (
        <p className="dark:text-white">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Link
              key={job._id}
              href={`/applicant/jobs/${job._id}`}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold dark:text-white">
                  {job.title}
                </h2>

                {job.expiryDate && isExpired(job.expiryDate) && (
                  <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                    Closed
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {job.company}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Expires:{" "}
                {job.expiryDate
                  ? new Date(job.expiryDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}