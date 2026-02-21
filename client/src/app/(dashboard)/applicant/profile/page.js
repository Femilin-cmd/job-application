"use client";

import { useEffect, useState } from "react";

export default function ApplicantProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    degree: "",
    institution: "",
    year: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");  

        const res = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setForm({
          name: data.name || "",
          email: data.email || "",
          degree: data.education?.degree || "",
          institution: data.education?.institution || "",
          year: data.education?.year || "",
        });
      } catch (error) {
        console.error("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

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

      const res = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name,
            education: {
              degree: form.degree,
              institution: form.institution,
              year: form.year,
            },
          }),
        }
      );

      if (res.ok) {
        setMessage("Profile updated successfully ✅");
      } else {
        setMessage("Update failed ❌");
      }
    } catch (error) {
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">
        My Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow space-y-6"
      >
        <div>
          <label className="block mb-2 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            disabled
            className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="pt-4 border-t dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Education
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={form.degree}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
            />

            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={form.institution}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 dark:bg-white dark:text-black text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Save Changes
        </button>

        {message && (
          <p className="text-center mt-4 dark:text-white">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}