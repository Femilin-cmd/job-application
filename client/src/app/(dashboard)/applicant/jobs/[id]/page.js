"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job");
      }
    };

    if (id) fetchJob();
  }, [id]);

  const isExpired = (date) => new Date(date) < new Date();

  const handleApply = async () => {
    if (!resume) {
      setMessage("Please select a resume file.");
      return;
    }

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("resume", resume);

    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Application submitted successfully!");
      } else {
        setMessage(data.message || "Application failed.");
      }
    } catch {
      setMessage("Server error.");
    }
  };

  if (!job) {
    return <p className="dark:text-white">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold dark:text-white">
        {job.title}
      </h1>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow space-y-6">

        <div>
          <p className="text-gray-500">Company: {job.company}</p>
          <p className="text-gray-500">Location: {job.location}</p>
          <p className="text-gray-400 text-sm mt-2">
            Expires: {new Date(job.expiryDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold dark:text-white mb-2">
            Job Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {job.description}
          </p>
        </div>

        {isExpired(job.expiryDate) ? (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg font-medium">
            This job is closed. Applications are no longer accepted.
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-400 p-6 rounded-xl space-y-4">

            <h3 className="font-semibold dark:text-white">
              Apply for this Job
            </h3>

            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="dark:text-white"
            />

            <button
              onClick={handleApply}
              className="px-6 py-2 bg-black text-white rounded-lg dark:bg-white dark:text-black"
            >
              Submit Application
            </button>

            {message && (
              <p className="text-sm text-green-500">{message}</p>
            )}

          </div>
        )}

      </div>

    </div>
  );
}