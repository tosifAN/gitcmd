import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from '../Context/auth';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer

import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
      toast.success("Logout SuccessFully");

    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <>
    <ToastContainer />
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <span className="material-symbols-outlined">timer</span>Tosify
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/courses">
                Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blogs">
                Blogs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/entertestpaper">
                Enter
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/pricing">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/support">
                Support
              </a>
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none" }}
                >
                  {auth?.user?.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/dashboard/user" className="dropdown-item">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="/user/blogs" className="dropdown-item">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="/generate/user" className="dropdown-item">
                      Create
                    </a>
                  </li>
                  <li>
                    <a href="/result/user" className="dropdown-item">
                      Results
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout}
                      href="/"
                      className="dropdown-item"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
