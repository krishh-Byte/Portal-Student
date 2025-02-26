import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb'; // ✅ Use the reusable Breadcrumb component
import widgetsData from '../widgetData.json';

const Dashboard = ({ enrolledCourses }) => {
    const [widgets, setWidgets] = useState([
        ...widgetsData,
        { id: 1, title: 'Current CGPA', content: 'Your current CGPA is 0.00' },
        { id: 2, title: 'Enrolled Courses', content: 'You are enrolled in 0 courses' },
    ]);

    // Calculate CGPA
    const gradeToPoint = {
        A: 10.0, "A-": 9.0, "B+": 8, B: 7.0, "B-": 6.0,
        "C+": 5.0, C: 4.0, "C-": 3.0, D: 2.0, F: 1.0,
    };

    const calculateCgpa = () => {
        const totalPoints = enrolledCourses.reduce((acc, course) => {
            const gradePoint = gradeToPoint[course.grade] || 0.0;
            return acc + (course.credit * gradePoint);
        }, 0);

        const totalCredits = enrolledCourses.reduce((acc, course) => acc + parseFloat(course.credit), 0);
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    };

    const cgpa = calculateCgpa();
    const numberOfCourses = enrolledCourses.length;

    // Update widgets with dynamic data
    useEffect(() => {
        setWidgets((prevWidgets) => [
            ...widgetsData,
            { id: 1, title: 'Current CGPA', content: `Your current CGPA is ${cgpa}` },
            { id: 2, title: 'Enrolled Courses', content: `You are enrolled in ${numberOfCourses} courses` },
        ]);
    }, [cgpa, numberOfCourses]);

    // Function to remove a widget
    const removeWidget = (id) => {
        setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
    };

    return (
        <div className="dashboard-container">
            <Breadcrumb />
            <div className="widgets-grid">
                <button onClick={() => {
                    const newId = widgets.length + 1; // Generate a new ID
                    setWidgets([...widgets, { id: newId, title: 'New Widget', content: 'Widget Content' }]);
                }}>Add Widget</button>

                {widgets.map((widget) => (
                    <div key={widget.id} className="widget-card">
                        <h3>{widget.title}</h3>
                        <p>{widget.content}</p>
                        <button onClick={() => removeWidget(widget.id)} className="remove-btn">Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
