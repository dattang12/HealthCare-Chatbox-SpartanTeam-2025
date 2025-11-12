import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setOpen(!isOpen)}>
          ☰
        </button>

        <h2 className="sidebar-title">HealthCare</h2>

        <ul className="sidebar-menu">
          <li onClick={() => scrollToSection("home")}> Home</li>
          <li onClick={() => scrollToSection("about")}> About Us</li>
          <li onClick={() => scrollToSection("services")}> Our Services</li>
          <li onClick={() => scrollToSection("articles")}> Articles / Resources</li>
          <li onClick={() => scrollToSection("feedback")}>Feedback</li>
        </ul>
      </div>

      {/* Floating open button */}
      {!isOpen && (
        <button className="open-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
      )}
    </>
  );
}
