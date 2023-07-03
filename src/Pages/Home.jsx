import React from "react";
import AllArticles from "../Components/AllArticles";
import FavArticle from "../Components/FavArticle";
import CarouselHome from "../Components/CarouselHome";
import PaginationWithIcons from "../Components/Pagination";

function Home() {
  return (
    <div>
      <CarouselHome />
      <FavArticle />
      <AllArticles />
      {/* <PaginationWithIcons totalPosts={dataBlog.result.length} /> */}
    </div>
  );
}

export default Home;
