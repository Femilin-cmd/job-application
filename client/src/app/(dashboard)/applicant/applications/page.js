"use client";

import { useEffect, useState } from "react";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/applications/applicant",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching applications");
      }
      setLoading(false);
    };

    fetchApplications();
  }, []);

  const statusColor = (status) => {
    if (status === "accepted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold dark:text-white">
        My Applications
      </h1>

      {loading ? (
        <p className="dark:text-white">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="dark:text-white">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow space-y-4"
            >
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  {app.job?.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {app.job?.company}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Applied on:{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <span
                  className={`font-medium capitalize ${statusColor(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}