import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
import HomeCard from "../Components/HomeCard";

const MyArticle = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [blog, setBlog] = useState([]);
  const getMyBlog = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlog(response.data?.result);
      console.log(response.data.result);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleClick = (id) => {
    navigate.push(`/`);
    window.location.reload();
  };

  useEffect(() => {
    getMyBlog();
  }, []);

  return (
    <div className="container mx-auto mt-[100px]">
      <h1 className="text-3xl text-center font-bold mb-5">Personal Article</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {blog?.map((post, key) => (
          <div key={key}>
            <HomeCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyArticle;
