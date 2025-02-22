import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate("/")}>Dashboard</li>

        <li onClick={() => navigate("/courses")}>Courses</li>
        <li onClick={() => navigate("/cgpa")}>CGPA</li>
        <li onClick={() => navigate("/assignments")}>Assignments</li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
