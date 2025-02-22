import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Navbar, Sidebar, Assignments, Cgpa, Courses } from "./index.js";
import { useState } from "react";
import React from "react";

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
  };

  const removeCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.id !== courseId));
  };

  return (
    <Router basename="/Portal-Student">
      <div className="app-container">
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard enrolledCourses={enrolledCourses} />} />
              <Route path="/courses" element={<Courses enrolledCourses={enrolledCourses} enrollCourse={enrollCourse} removeCourse={removeCourse} />} />
              <Route path="/cgpa" element={<Cgpa enrolledCourses={enrolledCourses} />} />
              <Route path="/assignments" element={<Assignments />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
