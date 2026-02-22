"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function RecruiterJobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        // Fetch job details
        const jobRes = await fetch(
          `https://job-application-backend-gw1n.onrender.com/api/jobs/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const jobData = await jobRes.json();
        setJob(jobData);

        // Fetch applications for this job
        const appRes = await fetch(
          `https://job-application-backend-gw1n.onrender.com/api/applications/recruiter?jobId=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const appData = await appRes.json();
        setApplications(Array.isArray(appData) ? appData : []);
      } catch (error) {
        console.error("Error fetching recruiter job details");
      }

      setLoading(false);
    };

    if (id) fetchData();
  }, [id]);

  const updateStatus = async (applicationId, status) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      await fetch(
        `https://job-application-backend-gw1n.onrender.com/api/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      // Refresh applications
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (error) {
      console.error("Error updating status");
    }
  };

  if (loading) return <p className="dark:text-white">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* Job Info */}
      {job && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow space-y-4">
          <h1 className="text-2xl font-bold dark:text-white">
            {job.title}
          </h1>
          <p className="text-gray-500">{job.company}</p>
          <p className="dark:text-gray-300">{job.description}</p>
        </div>
      )}

      {/* Applicants */}
      <div>
        <h2 className="text-2xl font-semibold dark:text-white mb-6">
          Applicants
        </h2>

        {applications.length === 0 ? (
          <p className="dark:text-white">
            No applicants yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow space-y-4"
              >
                <div>
                  <Link
                    href={`/recruiter/applicant/${app.applicant._id}`}
                    className="text-lg font-semibold dark:text-white hover:underline"
                  >
                    {app.applicant.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {app.applicant.email}
                  </p>
                </div>

                <div>
                  <a
                    href={`https://job-application-backend-gw1n.onrender.com/uploads/${app.resume}`}
                    target="_blank"
                     className="text-blue-500 underline"
                >
                        View Resume
                    </a>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      updateStatus(app._id, "accepted")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(app._id, "rejected")
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Reject
                  </button>
                </div>

                <p className="text-sm capitalize dark:text-white">
                  Status: {app.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}