"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RecruiterViewApplicant() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const res = await fetch(
          `https://job-application-backend-gw1n.onrender.com/api/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setApplicant(data);
      } catch (error) {
        console.error("Error fetching applicant");
      }
      setLoading(false);
    };

    if (id) fetchApplicant();
  }, [id]);

  if (loading) return <p className="dark:text-white">Loading...</p>;

  if (!applicant)
    return <p className="dark:text-white">Applicant not found.</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold dark:text-white">
        Applicant Profile
      </h1>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow space-y-6">

        <div>
          <p className="text-gray-500">Name</p>
          <p className="text-lg font-semibold dark:text-white">
            {applicant.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-lg font-semibold dark:text-white">
            {applicant.email}
          </p>
        </div>

        <div className="pt-4 border-t dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Education
          </h2>

          {applicant.education ? (
            <div className="space-y-2">
              <p className="dark:text-white">
                Degree: {applicant.education.degree || "N/A"}
              </p>
              <p className="dark:text-white">
                Institution: {applicant.education.institution || "N/A"}
              </p>
              <p className="dark:text-white">
                Year: {applicant.education.year || "N/A"}
              </p>
            </div>
          ) : (
            <p className="dark:text-white">
              No education details provided.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}