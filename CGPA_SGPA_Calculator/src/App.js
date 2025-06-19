
import React, { useState } from "react";

export default function App() {
  const [subjects, setSubjects] = useState([{ credit: "", grade: "" }]);
  const [semesters, setSemesters] = useState([]);
  const [sgpa, setSGPA] = useState(null);
  const [cgpa, setCGPA] = useState(null);

  const gradeToPoint = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    P: 4,
    F: 0,
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    for (let subj of subjects) {
      const credit = parseFloat(subj.credit);
      const point = gradeToPoint[subj.grade];
      if (!isNaN(credit) && point !== undefined) {
        totalCredits += credit;
        totalPoints += credit * point;
      }
    }
    const sgpaValue = (totalPoints / totalCredits).toFixed(2);
    setSGPA(sgpaValue);
    setSemesters([...semesters, { sgpa: parseFloat(sgpaValue), credits: totalCredits }]);
    setSubjects([{ credit: "", grade: "" }]);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    for (let sem of semesters) {
      totalCredits += sem.credits;
      totalPoints += sem.sgpa * sem.credits;
    }
    const cgpaValue = (totalPoints / totalCredits).toFixed(2);
    setCGPA(cgpaValue);
  };

  const getClass = (cgpa) => {
    const g = parseFloat(cgpa);
    if (g >= 7.75) return "First Class with Distinction";
    if (g >= 6.75) return "First Class";
    if (g >= 5.75) return "Second Class";
    if (g >= 5) return "Pass Class";
    return "Fail";
  };

  const getPercentage = (cgpa) => ((parseFloat(cgpa) - 0.75) * 10).toFixed(2);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SGPA & CGPA Calculator</h1>
      {subjects.map((subj, idx) => (
        <div key={idx} className="flex gap-4 mb-2">
          <input
            className="border p-2 rounded w-1/3"
            placeholder="Credits"
            value={subj.credit}
            onChange={(e) => {
              const updated = [...subjects];
              updated[idx].credit = e.target.value;
              setSubjects(updated);
            }}
          />
          <input
            className="border p-2 rounded w-2/3"
            placeholder="Grade (e.g. A+, B, F)"
            value={subj.grade}
            onChange={(e) => {
              const updated = [...subjects];
              updated[idx].grade = e.target.value.toUpperCase();
              setSubjects(updated);
            }}
          />
        </div>
      ))}
      <button onClick={() => setSubjects([...subjects, { credit: "", grade: "" }])} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        + Add Subject
      </button>
      <button onClick={calculateSGPA} className="bg-green-600 text-white px-4 py-2 rounded">
        Calculate SGPA
      </button>

      {sgpa && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <p><strong>SGPA:</strong> {sgpa}</p>
        </div>
      )}

      {semesters.length > 0 && (
        <div className="mt-6">
          <button onClick={calculateCGPA} className="bg-purple-600 text-white px-4 py-2 rounded">Calculate CGPA</button>
        </div>
      )}

      {cgpa && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <p><strong>CGPA:</strong> {cgpa}</p>
          <p><strong>Class:</strong> {getClass(cgpa)}</p>
          <p><strong>Percentage:</strong> {getPercentage(cgpa)}%</p>
        </div>
      )}
    </div>
  );
}
