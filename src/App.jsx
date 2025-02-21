import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Navbar, Sidebar, Assignments, Cgpa, Courses } from "./index.js";
import { useState } from "react";
import React from "react";

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Grade to Grade Points Mapping
  const gradeToPoint = {
    A: 10.0, "A-": 9.0, "B+": 8, B: 7.0, "B-": 6.0,
    "C+": 5.0, C: 4.0, "C-": 3.0, D: 2.0, F: 1.0,
  };

  // Function to calculate CGPA
  const calculateCgpa = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    enrolledCourses.forEach(course => {
      const gradePoint = gradeToPoint[course.grade] || 0;
      totalGradePoints += gradePoint * parseFloat(course.credit);
      totalCredits += parseFloat(course.credit);
    });

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
  };

  // Function to enroll in a course
  const enrollCourse = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
  };

  // Function to remove a course
  const removeCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.id !== courseId));
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home enrolledCourses={enrolledCourses} cgpa={calculateCgpa()} />} />
              <Route path="/courses" element={<Courses enrolledCourses={enrolledCourses} enrollCourse={enrollCourse} removeCourse={removeCourse} />} />
              <Route path="/cgpa" element={<Cgpa enrolledCourses={enrolledCourses} cgpa={calculateCgpa()} />} />
              <Route path="/assignments" element={<Assignments />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
