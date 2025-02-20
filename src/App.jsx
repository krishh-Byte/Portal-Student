import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Navbar, Sidebar, Assignments, Cgpa, Courses } from "./index.js";
import { useState } from "react";

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Grade to Grade Points Mapping
  const gradeToPoint = {
    A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
    "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.3, F: 0.0,
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
