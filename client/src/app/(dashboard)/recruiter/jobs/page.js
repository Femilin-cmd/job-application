"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const res = await fetch(
          "http://localhost:5000/api/jobs/recruiter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (error) {
        console.error("Error fetching recruiter jobs");
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold dark:text-white">
        My Job Listings
      </h1>

      {loading ? (
        <p className="dark:text-white">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="dark:text-white">
          You have not posted any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Link
              key={job._id}
              href={`/recruiter/jobs/${job._id}`}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition block"
            >
              <h2 className="text-xl font-semibold dark:text-white">
                {job.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {job.company}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Expires: {new Date(job.expiryDate).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}