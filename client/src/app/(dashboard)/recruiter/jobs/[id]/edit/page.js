"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditJob() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(
          `https://job-application-backend-gw1n.onrender.com/api/jobs/${id}`
        );

        const data = await res.json();

        setTitle(data.title || "");
        setCompany(data.company || "");
        setLocation(data.location || "");
        setDescription(data.description || "");
        setExpiryDate(data.expiryDate?.split("T")[0] || "");
      } catch (error) {
        console.error("Fetch job error:", error);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://job-application-backend-gw1n.onrender.com/api/jobs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            company,
            location,
            description,
            expiryDate:expiryDate || null,
          }),
        }
      );

      const data = await res.json();
      console.log("UPDATE RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Update failed");
        setLoading(false);
        return;
      }

      router.push("/recruiter/jobs");
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      <input
        className="border p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <input
        className="border p-2 w-full mb-4"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
      />

      <input
        className="border p-2 w-full mb-4"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />

      <textarea
        className="border p-2 w-full mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        type="date"
        className="border p-2 w-full mb-4"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Job"}
      </button>
    </div>
  );
}