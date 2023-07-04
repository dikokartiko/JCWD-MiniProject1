import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  categoriesBlogs,
  setBlogs,
  setTotalPages,
} from "../redux/reducer/blogSlice";
import { FilterCategory, FilterSort, Pagination } from "./Filter";
import HomeCard from "./HomeCard";

const BlogList = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const categories = useSelector(categoriesBlogs);
  const blogs = useSelector((state) => state.blogs.blog);
  const totalPages = useSelector((state) => state.blogs.totalPages);

  const fetchBlogs = (currentPage, sortOrder, selectedCategoryId) => {
    return async (dispatch) => {
      try {
        let url = `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=${currentPage}&orderBy=total_fav&sort=${sortOrder}&size=10`;
        if (selectedCategoryId) {
          url += `&id_cat=${selectedCategoryId}`;
        }
        const response = await axios.get(url);
        dispatch(setBlogs(response.data.result));
        dispatch(setTotalPages(response.data.page));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  };

  useEffect(() => {
    dispatch(fetchBlogs(currentPage, sortOrder, selectedCategoryId));
  }, [dispatch, currentPage, sortOrder, selectedCategoryId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const totalPagesToShow = 3;
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(totalPagesToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="text-center">
      <div className=" top-20 p-6 rounded-lg z-30 bg-white shadow-lg container ml-auto mr-auto">
        <div className="flex my-4 justify-center">
          <button
            className={classNames("mr-2 px-4 py-2 rounded-md", {
              "bg-blue-500 text-white": selectedCategoryId === null,
              "bg-gray-200 text-gray-700": selectedCategoryId !== null,
            })}
            onClick={() => handleCategoryClick(null)}>
            All
          </button>
          {categories.map((category) => (
            <FilterCategory
              key={category.id}
              data={category}
              selectedCategoryId={selectedCategoryId}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
        <FilterSort
          asc={() => handleSortOrderChange("ASC")}
          desc={() => handleSortOrderChange("DESC")}
          sortOrder={sortOrder}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 container ml-auto mr-auto">
        {blogs.map((blog) => (
          <HomeCard key={blog.id} post={blog} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        getPageNumbers={getPageNumbers()}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogList;
