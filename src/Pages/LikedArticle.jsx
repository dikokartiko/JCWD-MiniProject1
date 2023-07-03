import React, { useEffect, useState } from "react";
import axios from "axios";
const LikedArticle = () => {
  const [likedArticles, setLikedArticles] = useState([]);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike",
          { headers }
        );

        setLikedArticles(response.data.result.map((item) => item.Blog));
      } catch (error) {
        console.error("Error fetching liked articles", error);
      }
    };

    fetchLikedArticles();
  }, []);

  return (
    <div className="pt-[100px] container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {likedArticles.map((article) => (
        <div
          key={article.id}
          className="shadow-md p-10 text-justify rounded-lg">
          <h2 className="text-2xl font-semibold text-center">
            {article.title}
          </h2>
          <p className="text-center mb-5 w-1/2 mx-auto mt-1 py-2 border border-blue-500 rounded-full">
            {article.Category.name}
          </p>
          <p className="text-xl">{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default LikedArticle;
