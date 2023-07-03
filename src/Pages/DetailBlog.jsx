import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
import LikeButton from "../Components/button/Likebutton";

function DetailBlog() {
  const location = useLocation(),
    detailBlog = location.state?.data;

  return (
    <div class="container my-24 mx-auto md:px-6">
      <section class="mb-32">
        <div className="flex gap-4">
          <h1 class="mb-6 text-3xl font-bold">{detailBlog.title}</h1>
          <LikeButton data={detailBlog} />
        </div>
        <img
          src={`https://minpro-blog.purwadhikabootcamp.com/${detailBlog.imageURL}`}
          class="mb-6 imageDetailBlog shadow-lg dark:shadow-black/20"
          alt="image"
        />
        <div class="mb-6 flex items-center">
          <img
            src={`https://minpro-blog.purwadhikabootcamp.com/${detailBlog.User.imgProfile}`}
            class="mr-2 rounded-full"
            style={{
              height: `40px`,
              width: `40px`,
            }}
            alt="Avatar"
            loading="lazy"
          />
          <div>
            <span>
              &nbsp;Published <u>15.07.2020</u> by&nbsp;
              <strong>{detailBlog.User.username}</strong>
            </span>
          </div>
        </div>

        <p>{detailBlog.content}</p>
      </section>
    </div>
  );
}

export default DetailBlog;
