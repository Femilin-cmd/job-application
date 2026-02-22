"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`https://job-application-backend-gw1n.onrender.com/api/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApply = async () => {
    if (!file) {
      alert("Please select a resume file");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobId", id);

      await axios.post(
        "https://job-application-backend-gw1n.onrender.com/api/applications",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Application submitted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error applying");
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p>
        <strong>Expires:</strong>{" "}
        {job.expiryDate
          ? new Date(job.expiryDate).toLocaleDateString()
          : "No expiry date"}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Job Description
      </h2>
      <p>{job.description}</p>

      <div className="mt-8 border p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Apply for this Job
        </h3>

        <>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 border p-2"
          />

          <button
            onClick={handleApply}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Submit Application
          </button>
        </>
      </div>
    </div>
  );
}