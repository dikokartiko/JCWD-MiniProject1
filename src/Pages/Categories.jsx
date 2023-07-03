import React from "react";
import PostBlog from "./PostBlog";
import UserProfile from "./UserProfile";

function Categories() {
  return (
    <div className="flex justify-center">
      <UserProfile />
      <PostBlog />
    </div>
  );
}

export default Categories;
