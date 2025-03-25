"use client";
import React, { useState } from "react";
import Alert from "../components/Alert";
import Success from "../components/Success";

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

// Helper: Map boards to allowed class levels
function getAllowedClassLevels(selectedBoards: string[]): string[] {
  const classLevelsByBoard: Record<string, string[]> = {
    "O Levels": ["O1", "O2", "O3"],
    "A Levels": ["AS", "A2", "Accelerated"],
    IGCSE: ["01", "02", "03"],
    EDEXCEL: ["01", "02", "03"],
    PEARSON: ["01", "02", "03"],
    IB: ["01", "02", "03"],
  };

  if (selectedBoards.length === 0) {
    return [...new Set(Object.values(classLevelsByBoard).flat())];
  }
  let union: string[] = [];
  selectedBoards.forEach((board) => {
    const levels = classLevelsByBoard[board] || [];
    union = [...new Set([...union, ...levels])];
  });
  return union;
}

// Subjects categorized by class level
const subjectsByClass: Record<string, string[]> = {
  "6": ["Mathematics", "English Language", "Science", "Social Studies"],
  "7": ["Mathematics", "English Language", "Science", "Computer Studies"],
  "8": ["Mathematics", "English Language", "Physics", "Chemistry", "Biology"],
  "O1": ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Studies", "Business Studies"],
  "O2": ["Mathematics", "Physics", "Chemistry", "Biology", "Accounting", "Economics"],
  "O3": ["Mathematics", "Physics", "Chemistry", "Biology", "English Literature"],
  "AS": ["Mathematics", "Statistics", "Accounting", "Psychology", "Physics"],
  "A2": ["Mathematics", "Statistics", "Accounting", "Psychology", "Business Studies"],
  "Accelerated": ["Mathematics", "Physics", "Chemistry", "Biology"],
  // For boards like IGCSE, EDEXCEL, PEARSON, IB
  "01": ["Mathematics", "English Language", "Science", "Social Studies"],
  "02": ["Mathematics", "English Language", "Science", "Computer Studies"],
  "03": ["Mathematics", "English Language", "Physics", "Chemistry", "Biology"],
};

const boards = ["O Levels", "A Levels", "IGCSE", "EDEXCEL", "PEARSON", "IB"];
const appearingYears = ["2025", "2026"];
const appearingSessions = ["Spring", "Fall"];

const EnrollmentForm: React.FC = () => {
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

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);

  // Handle input/select changes
  const handleInputChange = (
    formId: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              [name]: value,
              ...(name === "classLevel" ? { subjects: [] } : {}),
            }
          : form
      )
    );
  };

  // Handle board checkboxes
  const handleBoardChange = (formId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForms((prev) =>
      prev.map((form) => {
        if (form.id !== formId) return form;
        const updatedBoard = checked
          ? [...form.board, value]
          : form.board.filter((b) => b !== value);
        const allowedLevels = getAllowedClassLevels(updatedBoard);
        const newClassLevel = allowedLevels.includes(form.classLevel) ? form.classLevel : "";
        const newSubjects = newClassLevel ? form.subjects : [];
        return { ...form, board: updatedBoard, classLevel: newClassLevel, subjects: newSubjects };
      })
    );
  };

  // Handle subject checkboxes
  const handleSubjectChange = (formId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              subjects: checked
                ? [...form.subjects, value]
                : form.subjects.filter((item) => item !== value),
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (forms.some((f) => !f.childName || !f.parentName || !f.whatsapp || !f.email)) {
      setNotification({
        type: "error",
        title: "Submission Failed",
        description: "Please fill all required fields in each form.",
      });
      return;
    }

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forms }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({
          type: "success",
          title: "Form submitted!",
          description: "Your enrollment has been submitted and an email has been sent.",
        });
      } else {
        setNotification({
          type: "error",
          title: "Submission Failed",
          description: "Submission failed. Try again.",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setNotification({
        type: "error",
        title: "Error",
        description: "An error occurred. Check console for details.",
      });
    }
  };

  return (
    <div id="form" className="w-full mx-auto m-12">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-center font-['Plus_Jakarta_Sans'] tracking-tighter text-indigo-950 text-3xl md:text-4xl font-bold mb-4">
          Enroll Now
        </h2>
        <p className="text-center font-['Poppins'] text-base md:text-lg text-indigo-950 mb-8">
          Fill out the form below to book a tutor and customize your learning experience.
          Choose your subjects, and start your journey toward academic excellence!
        </p>

        {/* Notification Alert */}
        {notification && (
           <div className="fixed bottom-4 right-4 md:right-0 md:bottom-4 md:left-auto left-1/2 transform -translate-x-1/2 md:translate-x-0 z-50">
            {notification.type === "success" ? (
              <Success
                title={notification.title}
                description={notification.description}
                onClose={() => setNotification(null)}
              />
            ) : (
              <Alert
                title={notification.title}
                description={notification.description}
                onClose={() => setNotification(null)}
              />
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          {forms.map((form) => {
            const allowedLevels = getAllowedClassLevels(form.board);
            return (
              <div key={form.id} className="p-6 border border-gray-300 rounded-lg bg-gray-50 relative">
                {forms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeForm(form.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    ❌ Remove
                  </button>
                )}

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
                    {allowedLevels.map((cl) => (
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
                    required
                  >
                    <option value="">Select Appearing Year</option>
                    {appearingYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <select
                    name="appearingSession"
                    value={form.appearingSession}
                    onChange={(e) => handleInputChange(form.id, e)}
                    className="p-3 border rounded-lg w-full"
                    required
                  >
                    <option value="">Select Appearing Session</option>
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
                    <label key={boardOption} className="flex items-center gap-2 font-['Poppins'] text-indigo-950">
                      <input
                        type="checkbox"
                        value={boardOption}
                        checked={form.board.includes(boardOption)}
                        onChange={(e) => handleBoardChange(form.id, e)}
                        className="w-4 h-4"
                      />
                      {boardOption}
                    </label>
                  ))}
                </div>

                <p className="text-lg font-semibold mt-4">Subjects (Only Eligible):</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {form.classLevel && subjectsByClass[form.classLevel]
                    ? subjectsByClass[form.classLevel].map((subject) => (
                        <label key={subject} className="flex items-center gap-2 font-['Poppins'] text-indigo-950">
                          <input
                            type="checkbox"
                            value={subject}
                            checked={form.subjects.includes(subject)}
                            onChange={(e) => handleSubjectChange(form.id, e)}
                            className="w-4 h-4"
                          />
                          {subject}
                        </label>
                      ))
                    : null}
                </div>
              </div>
            );
          })}

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={addForm}
              className="flex font-['Poppins'] items-center gap-2 text-indigo-950 px-6 py-2 rounded-lg border border-indigo-950 hover:bg-indigo-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add More
            </button>
            <button
              type="submit"
              className="flex font-['Poppins'] items-center gap-2 bg-indigo-900 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;
