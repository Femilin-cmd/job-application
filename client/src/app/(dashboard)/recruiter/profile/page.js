"use client";

import { useEffect, useState } from "react";

export default function RecruiterProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    website: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const res = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        setForm({
          name: data.name || "",
          email: data.email || "",
          companyName: data.company?.name || "",
          website: data.company?.website || "",
          description: data.company?.description || "",
        });
      } catch (error) {
        console.error("Error fetching recruiter profile");
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
            company: {
              name: form.companyName,
              website: form.website,
              description: form.description,
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
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">
        Recruiter Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow space-y-6"
      >
        {/* Name */}
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

        {/* Email (View Only) */}
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

        {/* Company Section */}
        <div className="pt-4 border-t dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Company Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
            />

            <input
              type="text"
              name="website"
              placeholder="Company Website"
              value={form.website}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
            />

            <textarea
              name="description"
              placeholder="Company Description"
              value={form.description}
              onChange={handleChange}
              rows={4}
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