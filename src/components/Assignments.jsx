import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Assignments() {
    const getBreadcrumb = () => {
        return (
            <nav className="breadcrumb">
                <Link to="/">Dashboard</Link>
                {' / '}
                <Link to="/assignments">Assignments</Link>
            </nav>
        );
    };

    const assignmentsData = [
        { id: "A101", courseId: "CSE101", name: "Intro to React", status: "Ongoing" },
        { id: "A102", courseId: "CSE102", name: "Data Structures Lab", status: "Completed" },
        { id: "A103", courseId: "CSE103", name: "SQL Queries", status: "Ongoing" },
        { id: "A104", courseId: "CSE104", name: "Network Security", status: "Completed" },
        { id: "A105", courseId: "CSE101", name: "React Hooks", status: "Completed" },
    ];

    const [filters, setFilters] = useState({ courseId: "", assignmentId: "" });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredAssignments = assignmentsData.filter(
        (assignment) =>
            assignment.courseId.includes(filters.courseId) &&
            assignment.id.includes(filters.assignmentId)
    );

    return (
        <div>
            {getBreadcrumb()}
            <div className="assignments-container">
                <h2>Assignments</h2>

                {/* Filter Section */}
                <div className="filter-section">
                    <input
                        type="text"
                        name="courseId"
                        placeholder="Filter by Course ID"
                        value={filters.courseId}
                        onChange={handleFilterChange}
                    />
                    <input
                        type="text"
                        name="assignmentId"
                        placeholder="Filter by Assignment ID"
                        value={filters.assignmentId}
                        onChange={handleFilterChange}
                    />
                </div>

                {/* Assignments Table */}
                <table className="assignments-table">
                    <thead>
                        <tr>
                            <th>Assignment ID</th>
                            <th>Course ID</th>
                            <th>Assignment Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssignments.map((assignment, index) => (
                            <tr key={index} className={assignment.status.toLowerCase()}>
                                <td>{assignment.id}</td>
                                <td>{assignment.courseId}</td>
                                <td>{assignment.name}</td>
                                <td className={`status ${assignment.status.toLowerCase()}`}>
                                    {assignment.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Assignments;
