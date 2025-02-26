import React ,{useState,useEffect}from 'react'
import student from "../assets/student.png"
import user from "../assets/user-3296.svg"

function Navbar() {
  const [dropdownOpen,setDropdownOpen]=useState(false)
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".user-menu")) {
        setDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (dropdownOpen) {
      document.addEventListener("click", closeDropdown);
    }

    // Cleanup event listener on unmount or when dropdown closes
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [dropdownOpen]);
  return (
    <>
      <nav className='navbar'>
      <div className='navbar-left'>
      <img src={student} alt="Logo" className="logo" />
      <h3>Student Portal</h3>
      </div>
      <div className="user-menu">
        <img src={user}
           alt="User Icon"
          className="user-icon"
          onClick={(e) => {
            e.stopPropagation(); // Prevents click from bubbling up
            setDropdownOpen(!dropdownOpen);
          }}
        />
        
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>Change Password</li>
              <li>Edit Personal Data</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
      </nav>
    </>
  )
}

export default Navbar
