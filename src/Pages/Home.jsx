import React from "react";
import AllArticles from "../Components/AllArticles";
import FavArticle from "../Components/FavArticle";
import CarouselHome from "../Components/CarouselHome";
import PaginationWithIcons from "../Components/Pagination";
import BlogList from "../Components/BlogList";

function Home() {
  return (
    <div>
      <CarouselHome />
      <FavArticle />
      {/* <AllArticles /> */}
      <BlogList />
      {/* <PaginationWithIcons totalPosts={dataBlog.result.length} /> */}
    </div>
  );
}

export default Home;
