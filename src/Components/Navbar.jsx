import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../Stylesheets/navbar.css";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/reducer/AuthReducer";
import LikeButton from "./button/Likebutton";
import axios from "axios";
import { useState, useEffect } from "react";
import HomeCard from "./HomeCard";
function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://minpro-blog.purwadhikabootcamp.com/api/blog?search=${query}&sortBy=title`
        );
        setResults(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.log("Terjadi kesalahan:", error);
      }
    };
    fetchData();
  }, [query]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <div className="pr-2 rounded-xl border-2  border-blue-500 flex items-center w-1/2 md:w-1/5">
          <input
            type="search"
            placeholder="Search.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 text-blue-400 py-2 bg-opacity-50 w-80 outline-none border-none focus:ring-0 rounded-xl"
          />
        </div>
        <div className="z-50">
          <div className="absolute top-16 z-50 left-[30%] bg-white rounded-xl shadow-lg w-1/3 overflow-y-auto max-h-screen">
            {results.map((result, key) => {
              if (query.length > 0) {
                return (
                  <div className="flex border-2 border-blue-500 rounded-lg px-4 py-2 shadow-md hover:cursor-pointer hover:shadow-xl transition duration-300 ease-in-out bg-white m-2">
                    <div className="relative truncate flex justify-between items-center mr-5">
                      <img
                        className="object-cover object-center w-28 rounded-lg h-28"
                        src={`https://minpro-blog.purwadhikabootcamp.com/${result.imageURL}`}
                        alt={result.title}
                      />

                      <div className="absolute w-36 bottom-0 flex p-2 bg-white rounded-tr-lg">
                        {result.User?.imgProfile ? (
                          <img
                            className="object-cover object-center w-10 h-10 rounded-full"
                            src={`https://minpro-blog.purwadhikabootcamp.com/${result.User?.imgProfile}`}
                            alt="profile"
                          />
                        ) : (
                          <></>
                        )}

                        <div className="mx-4 truncate capitalize">
                          <h1 className="truncate text-sm text-gray-700 dark:text-gray-200">
                            {result.User?.username}
                          </h1>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {result.country}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="truncate">
                      <div key={key}>
                        <HomeCard post={result} />
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>

        <div class="flex items-center md:order-2">
          {localStorage.getItem("token") === "" ||
          localStorage.getItem("token") === null ? (
            <div class="flex items-center gap-2">
              <Link to="/LoginPage">
                <Button gradientMonochrome="info">Login</Button>
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
            {/* <li>
              <NavLink
                className={
                  splitLocation[1] === "Blog" || "Blog/:id" ? "activeMenu" : ""
                }
                to="/Blog">
                Blog
              </NavLink>
            </li>{" "} */}
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
