import React from 'react';
import Breadcrumb from './Breadcrumb';

function Cgpa({ enrolledCourses }) {
  const gradeToPoint = {
    A: 10.0, "A-": 9.0, "B+": 8, B: 7.0, "B-": 6.0,
    "C+": 5.0, C: 4.0, "C-": 3.0, D: 2.0, F: 1.0,
  };

  const totalPoints = enrolledCourses.reduce((acc, course) => {
    const gradePoint = gradeToPoint[course.grade] || 0.0;
    const credit = parseFloat(course.credit) || 0.0;

    // Debugging logs to verify calculations
    console.log(`Course: ${course.name}, Credit: ${credit}, Grade: ${course.grade}, Grade Point: ${gradePoint}`);
    
    return acc + (credit * gradePoint);
  }, 0);

  const totalCredits = enrolledCourses.reduce((acc, course) => acc + (parseFloat(course.credit) || 0.0), 0);
  const calculatedCgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div>
      <Breadcrumb />
      <div className="cgpa-container">
        <h2>CGPA Calculator</h2>
        <div className="cgpa-box">
          <h4>
            CGPA: <span>{calculatedCgpa}</span>
          </h4>
        </div>
        <table className="cgpa-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Credit Units</th>
              <th>Grade</th>
              <th>Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course, index) => (
              <tr key={index}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.credit}</td>
                <td>{course.grade}</td>
                <td>{gradeToPoint[course.grade] || 0.0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cgpa;
