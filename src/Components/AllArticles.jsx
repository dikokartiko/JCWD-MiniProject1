import React from "react";
import { getBlog, getBlogLogin } from "../Service/apiService";
import { Link } from "react-router-dom";
import "../Stylesheets/component.css";
import HomeCard from "../Components/HomeCard";
import PaginationWithIcons from "./Pagination";

function Card() {
  const [dataBlog, setDataBlog] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = dataBlog.result?.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    getBlog().then(setDataBlog);
  }, []);

  return (
    <div id="cardHome" class="mt-6 container ml-auto mr-auto">
      <h2 class="titleBlog">All Articles</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dataBlog.result
          ?.slice(firstPostIndex, lastPostIndex)
          .map((post, key) => {
            return (
              <div key={key}>
                <HomeCard post={post} />
              </div>
            );
          })}
      </div>
      <PaginationWithIcons
        totalPosts={dataBlog.result?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Card;
