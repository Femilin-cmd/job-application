"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJob() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
    location: "",
    expiryDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
        }),
      });

      if (res.ok) {
        setMessage("Job created successfully ✅");
        router.push("/recruiter/jobs");
      } else {
        setMessage("Failed to create job ❌");
      }
    } catch (error) {
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">
        Post New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow space-y-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-gray-800 dark:bg-white dark:text-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Create Job
        </button>

        {message && (
          <p className="text-center dark:text-white">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}