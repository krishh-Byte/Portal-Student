import React from 'react';

function Cgpa({ enrolledCourses, cgpa }) {
  const gradeToPoint = {
    A: 10.0, "A-": 9.0, "B+": 8, B: 7.0, "B-": 6.0,
    "C+": 5.0, C: 4.0, "C-": 3.0, D: 2.0, F: 1.0,
  };
  return (
    <div className="cgpa-container">
      <h2>CGPA Calculator</h2>
      <div className="cgpa-display">
        <h4>
          CGPA: <span>{cgpa}</span>
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
  );
}

export default Cgpa;
