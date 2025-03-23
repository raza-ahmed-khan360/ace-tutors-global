"use client";
import { div } from "framer-motion/client";
import React, { useState } from "react";

interface FormData {
  id: number;
  childName: string;
  parentName: string;
  whatsapp: string;
  email: string;
  classLevel: string;
  appearingYear: string;
  appearingSession: string;
  board: string[];
  subjects: string[];
}

// List of boards
const boards = ["O & A Levels", "IGCSE", "EDEXCEL", "PEARSON", "IB"];

// List of all subjects
const allSubjects = [
  "Mathematics",
  "Additional Math",
  "Statistics",
  "Computer Studies",
  "Economics",
  "English Language",
  "Sociology",
  "Chemistry",
  "Physics",
  "Biology",
  "Accounting",
  "Business Studies",
  "English Literature",
  "Psychology",
  "Environmental Management",
];

// Class levels
const classLevels = ["6", "7", "8", "O1", "O2", "O3", "AS", "A2"];

// Appearing years
const appearingYears = ["2025", "2026"];

// Appearing sessions
const appearingSessions = ["Spring", "Fall"];

const subjectsByClass: Record<string, string[]> = {
    "6": ["Mathematics", "English Language", "Science", "Social Studies"],
    "7": ["Mathematics", "English Language", "Science", "Computer Studies"],
    "8": ["Mathematics", "English Language", "Physics", "Chemistry", "Biology"],
    "O1": ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Studies", "Business Studies"],
    "O2": ["Mathematics", "Physics", "Chemistry", "Biology", "Accounting", "Economics"],
    "O3": ["Mathematics", "Physics", "Chemistry", "Biology", "English Literature"],
    "AS": ["Mathematics", "Statistics", "Accounting", "Psychology", "Physics"],
    "A2": ["Mathematics", "Statistics", "Accounting", "Psychology", "Business Studies"],
  };

const EnrollmentForm: React.FC = () => {
  // State array to hold multiple forms
  const [forms, setForms] = useState<FormData[]>([
    {
      id: Date.now(),
      childName: "",
      parentName: "",
      whatsapp: "",
      email: "",
      classLevel: "",
      appearingYear: "",
      appearingSession: "",
      board: [],
      subjects: [],
    },
  ]);

  // Handle text/select input changes
  const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForms((prev) =>
      prev.map((form) =>
        form.id === id
          ? { ...form, [name]: value }
          : form
      )
    );
  };

  // Handle board/subject checkbox changes
  const handleCheckboxChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
    category: "board" | "subjects"
  ) => {
    const { value, checked } = e.target;
    setForms((prev) =>
      prev.map((form) =>
        form.id === id
          ? {
              ...form,
              [category]: checked
                ? [...form[category], value]
                : form[category].filter((item) => item !== value),
            }
          : form
      )
    );
  };

  // Add a new empty form
  const addForm = () => {
    setForms((prev) => [
      ...prev,
      {
        id: Date.now(),
        childName: "",
        parentName: "",
        whatsapp: "",
        email: "",
        classLevel: "",
        appearingYear: "",
        appearingSession: "",
        board: [],
        subjects: [],
      },
    ]);
  };

  // Remove a form
  const removeForm = (id: number) => {
    setForms((prev) => prev.filter((form) => form.id !== id));
  };

  // Submit all forms
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic required fields check
    const incomplete = forms.some(
      (f) => !f.childName || !f.parentName || !f.whatsapp || !f.email
    );
    if (incomplete) {
      alert("Please fill all required fields in each form.");
      return;
    }

    try {
      // Send to your Next.js API route
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forms }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Form submitted! Email Sent.");
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("An error occurred. Check console for details.");
    }
  };

  return (
<div id="form" className="w-full mx-auto m-12">
 <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg">
      <h2 className="text-center font-['Plus_Jakarta_Sans'] tracking-tighter text-indigo-950 text-3xl md:text-4xl font-bold mb-4">
        Enroll Now
      </h2>
      <p className="text-center font-['Poppins'] text-base md:text-lg text-indigo-950 mb-8">
        Fill out the form below to book a tutor and customize your learning
        experience. Choose your subjects, and start your journey toward academic
        excellence!
      </p>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {forms.map((form) => (
          <div key={form.id} className="p-6 border border-gray-300 rounded-lg bg-gray-50 relative">
            {/* Remove button (visible if multiple forms exist) */}
            {forms.length > 1 && (
              <button
                type="button"
                onClick={() => removeForm(form.id)}
                className="relative p-2 text-red-600 hover:text-red-800"
              >
                ❌ Remove
              </button>
            )}

            {/* Left Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="childName"
                type="text"
                placeholder="Child’s Name"
                value={form.childName}
                onChange={(e) => handleInputChange(form.id, e)}
                className="p-3 border rounded-lg w-full"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => handleInputChange(form.id, e)}
                className="p-3 border rounded-lg w-full"
                required
              />
              <input
                name="parentName"
                type="text"
                placeholder="Parent Name"
                value={form.parentName}
                onChange={(e) => handleInputChange(form.id, e)}
                className="p-3 border rounded-lg w-full"
                required
              />
              <input
                name="whatsapp"
                type="text"
                placeholder="+123 456 7890"
                value={form.whatsapp}
                onChange={(e) => handleInputChange(form.id, e)}
                className="p-3 border rounded-lg w-full"
                required
              />
              <select
                name="classLevel"
                value={form.classLevel}
                onChange={(e) => handleInputChange(form.id, e)}
                className="p-3 border rounded-lg w-full"
                required
              >
                <option value="">Select Class Level</option>
                {classLevels.map((cl) => (
                  <option key={cl} value={cl}>
                    {cl}
                  </option>
                ))}
              </select>
              <select
                name="appearingYear"
                value={form.appearingYear}
                onChange={(e) => handleInputChange(form.id, e)}
                className="p-3 border rounded-lg w-full"
              >
                <option value="">Appearing Year</option>
                {appearingYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Right Column (Board + Year + Session) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <select
                name="appearingSession"
                value={form.appearingSession}
                onChange={(e) => handleInputChange(form.id, e)}
                className="p-3 border rounded-lg w-full"
              >
                <option value="">Appearing Session</option>
                {appearingSessions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-lg font-semibold mt-4">Board of Interest:</p>
            <div className="flex flex-wrap gap-4 mb-4">
              {boards.map((boardOption) => (
                <label key={boardOption} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={boardOption}
                    checked={form.board.includes(boardOption)}
                    onChange={(e) => handleCheckboxChange(form.id, e, "board")}
                    className="w-4 h-4"
                  />
                  {boardOption}
                </label>
              ))}
            </div>

            <p className="text-lg font-semibold mt-4">Subjects:</p>
            {/* Filter or disable subjects based on class selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {form.classLevel && subjectsByClass[form.classLevel]
                ? subjectsByClass[form.classLevel].map((subject) => (
                    <label key={subject} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={subject}
                        checked={form.subjects.includes(subject)}
                        onChange={(e) => handleCheckboxChange(form.id, e, "subjects")}
                        className="w-4 h-4"
                      />
                      {subject}
                    </label>
                  ))
                : null}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={addForm}
            className="text-indigo-950 px-6 py-2 rounded-lg border border-indigo-950"
          >
            ➕ Add More
          </button>
          <button
            type="submit"
            className="bg-indigo-900 text-white px-6 py-2 rounded-lg hover:bg-indigo-800"
          >
            ✅ Submit
          </button>
        </div>
      </form>
    </div>
</div>

   
  );
};

export default EnrollmentForm;
