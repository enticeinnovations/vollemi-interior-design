
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/vollimelogo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkNav, setDarkNav] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Navigate without showing # in the URL
  const navigateToSection = (e, sectionId) => {
    e.preventDefault();

    closeMenu();

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  useEffect(() => {
    const checkNavbarBackground = () => {
      const navbar = document.querySelector(".navbar");

      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();

      const darkSections = document.querySelectorAll(
        "#philosophy, #contact"
      );

      let isDark = false;

      darkSections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();

        const overlaps =
          sectionRect.top < navbarRect.bottom &&
          sectionRect.bottom > navbarRect.top;

        if (overlaps) {
          isDark = true;
        }
      });

      setDarkNav(isDark);
    };

    checkNavbarBackground();

    window.addEventListener("scroll", checkNavbarBackground, {
      passive: true,
    });

    window.addEventListener("resize", checkNavbarBackground);

    return () => {
      window.removeEventListener("scroll", checkNavbarBackground);
      window.removeEventListener("resize", checkNavbarBackground);
    };
  }, []);

  return (
    <header className={`navbar ${darkNav ? "dark-nav" : ""}`}>

      {/* LOGO */}
      <a
        href="/"
        className="navbar-logo"
        onClick={(e) => navigateToSection(e, "home")}
      >
        <img src={logo} alt="Vollemi Interior Design" />
      </a>

      {/* DESKTOP NAVIGATION */}
      <nav className="nav-links">
        <a href="/" onClick={(e) => navigateToSection(e, "home")}>Home</a>
        <a href="/" onClick={(e) => navigateToSection(e, "about")}>About</a>
        <a href="/" onClick={(e) => navigateToSection(e, "services")}>Services</a>
        <a href="/" onClick={(e) => navigateToSection(e, "projects")}>Projects</a>
        <a href="/" onClick={(e) => navigateToSection(e, "contact")}>Contact</a>
      </nav>

      {/* DESKTOP TALK BUTTON */}
      <a
        href="/"
        className="nav-button"
        onClick={(e) => navigateToSection(e, "contact")}
      >
        <span>Let's Talk</span>
        <span className="nav-button-arrow">↗</span>
      </a>

      {/* MOBILE MENU BUTTON */}
      <button
        className={`menu-button ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MOBILE NAVIGATION */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <a href="/" onClick={(e) => navigateToSection(e, "home")}>
          Home
        </a>

        <a href="/" onClick={(e) => navigateToSection(e, "about")}>
          About
        </a>

        <a href="/" onClick={(e) => navigateToSection(e, "services")}>
          Services
        </a>

        <a href="/" onClick={(e) => navigateToSection(e, "projects")}>
          Projects
        </a>

        <a href="/" onClick={(e) => navigateToSection(e, "contact")}>
          Contact
        </a>

        <a
          href="/"
          className="mobile-talk"
          onClick={(e) => navigateToSection(e, "contact")}
        >
          <span>Let's Talk</span>
          <span>↗</span>
        </a>

      </nav>
    </header>
  );
}

export default Navbar;
