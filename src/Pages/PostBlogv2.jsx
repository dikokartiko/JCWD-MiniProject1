import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeArticle } from "../redux/reducer/ArticleReducer";
import { FileInput, Label } from "flowbite-react";

function withAuth(Component) {
  return function WrappedComponent(props) {
    const login = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
      if (!login) {
        navigate("/sign-in");
      }
    }, [login, navigate]);

    if (!login) {
      return null; // or any other placeholder while checking authentication
    }

    return <Component {...props} />;
  };
}
const WriteBlog = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target?.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
      );
      setCategory(res.data);
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(handleSubmit);

    const data = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      country: document.getElementById("country").value,
      CategoryId: selectedOption,
      url: "/",
      keywords: document.getElementById("keywords").value,
    };
    const file = document.getElementById("file").files[0];
    dispatch(makeArticle(data, file));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Make A new Post
          </h2>
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="name"
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type Title name"
              required=""
            />
          </div>
          <div class="sm:col-span-2">
            <label
              for="content"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              content
            </label>
            <textarea
              id="content"
              rows="8"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Your description here"></textarea>
          </div>
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select Category</option>
            {category &&
              category.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <div class="w-full">
            <label
              for="Keyword"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Keyword
            </label>
            <input
              type="text"
              id="keywords"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type Keyword name"
              required="yes"
            />
          </div>
          <div class="w-full">
            <label
              for="Country"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Country
            </label>
            <input
              type="text"
              id="country"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type Country name"
              required="yes"
            />
          </div>
          <div class="w-full">
            <label
              for="File"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Image / Video
            </label>
            <FileInput
              variant={""}
              accept=".jpg, .jpeg, png"
              type="file"
              helperText="A profile picture is useful to confirm your are logged into your account"
              id="file"
              onChange={handleImageUpload}
            />
            {selectedImage && (
              <div className="mb-6 relative">
                <img
                  src={selectedImage}
                  alt="Preview"
                  style={{
                    maxWidth: "332px",
                    maxHeight: "300px",
                    marginTop: "10px",
                  }}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(WriteBlog);
