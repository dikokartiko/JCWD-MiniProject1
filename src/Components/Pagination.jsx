"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import "../Stylesheets/pagination.css";

export default function PaginationWithIcons({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}>
            {page}
          </button>
        );
      })}
    </div>
  );
}
