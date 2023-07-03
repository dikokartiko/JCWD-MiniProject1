import React from "react";
import { Link } from "react-router-dom";

function HomeCard(props) {
  const post = props.post;
  let stringUrl = "";
  if (!post.message) {
    stringUrl = post.title.replace(/\s+/g, "-");
  }
  const detailBlogUrl = `/Blog/${stringUrl}`;
  return (
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div
        className="image-background w-100"
        style={{
          backgroundImage: `url(
              https://minpro-blog.purwadhikabootcamp.com/${post.imageURL}
            )`,
          height: `200px`,
        }}></div>
      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate"
          style={{ WebkitLineClamp: 2 }}>
          {post.title}
        </h5>
        <p
          class="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate"
          style={{ WebkitLineClamp: 3 }}>
          {post.content}
        </p>
        <Link
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          to={detailBlogUrl}
          state={{ data: post }}>
          Read more
        </Link>
      </div>
    </div>
  );
}

export default HomeCard;
