import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../Stylesheets/navbar.css";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/reducer/AuthReducer";

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate("/");
  };

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            NeuTrend
          </span>
        </Link>
        <div class="flex items-center md:order-2">
          {localStorage.getItem("token") === "" ||
          localStorage.getItem("token") === null ? (
            <div class="flex items-center gap-2">
              <Link to="/LoginPage">
                <Button gradientMonochrome="info">Login</Button>
              </Link>
              <Link to="/Register">
                <Button gradientMonochrome="info">Register</Button>
              </Link>
            </div>
          ) : (
            <div div class="flex items-center gap-2">
              <Link to="/UserProfile">
                <Button gradientMonochrome="info">Profile</Button>
              </Link>
              <Button gradientMonochrome="info" onClick={() => handleLogout()}>
                Sign Out
              </Button>
            </div>
          )}
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                className={splitLocation[1] === "" ? "activeMenu" : ""}
                to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={
                  splitLocation[1] === "Blog" || "Blog/:id" ? "activeMenu" : ""
                }
                to="/Blog">
                Blog
              </NavLink>
            </li>{" "}
            {localStorage.getItem("token") === "" ||
            localStorage.getItem("token") === null ? (
              <></>
            ) : (
              <NavLink
                className={
                  splitLocation[1] === "Blog" || "Blog/:id" ? "activeMenu" : ""
                }
                to="/PostBlog">
                Create Post
              </NavLink>
            )}{" "}
            {localStorage.getItem("token") === "" ||
            localStorage.getItem("token") === null ? (
              <></>
            ) : (
              <NavLink
                className={
                  splitLocation[1] === "Blog" || "Blog/:id" ? "activeMenu" : ""
                }
                to="/user/article">
                My Post
              </NavLink>
            )}{" "}
            {localStorage.getItem("token") === "" ||
            localStorage.getItem("token") === null ? (
              <></>
            ) : (
              <NavLink
                className={
                  splitLocation[1] === "Blog" || "Blog/:id" ? "activeMenu" : ""
                }
                to="likedarticle">
                Liked Post 👍
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
