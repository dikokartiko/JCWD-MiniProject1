import React from "react";
import { getPagFav } from "../Service/apiService";
import { Link } from "react-router-dom";
import HomeCard from "./HomeCard";
import { useEffect, useState } from "react";
import axios from "axios";
function FavArticle() {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?size=10&sort=DESC&orderBy=total_fav"
      );
      setArticles(response.data.result);
    } catch (error) {
      console.error("error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [popularArticles, setPopularArticles] = useState([]);

  const sortedArticles = articles
    .sort((a, b) => b.total_fav - a.total_fav)
    .slice(0, 10);

  useState(() => {
    setPopularArticles(sortedArticles);
  }, [sortedArticles]);

  return (
    <div id="cardHome" class="mt-6 container ml-auto mr-auto">
      {sortedArticles ? (
        <div>
          <h2 class="titleBlog">Top 10 Articles</h2>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            {sortedArticles.map((post, key) => {
              return (
                <div key={key}>
                  <HomeCard post={post} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FavArticle;
