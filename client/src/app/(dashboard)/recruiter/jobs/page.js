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
        "https://job-application-backend-gw1n.onrender.com/api/jobs/recruiter",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("FULL RESPONSE:", data);

      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
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
            <div
              key={job._id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl"
            >
              <Link href={`/recruiter/jobs/${job._id}`}>
                <h2 className="text-xl font-semibold dark:text-white">
                  {job.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {job.company}
                </p>

                <p className="text-sm text-blue-500 mt-2">
                  Applications: {job.applicationCount}
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  Expires:{" "}
                  {job.expiryDate
                    ? new Date(job.expiryDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </Link>

              <Link
                href={`/recruiter/jobs/${job._id}/edit`}
                className="mt-4 inline-block bg-blue-500 text-white px-3 py-1 rounded mr-2"
              >
                Edit
              </Link>

              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");

                  await fetch(
                    `https://job-application-backend-gw1n.onrender.com/api/jobs/${job._id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  setJobs((prev) =>
                    prev.filter((j) => j._id !== job._id)
                  );
                }}
                className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}