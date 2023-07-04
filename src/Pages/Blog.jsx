import React from "react";
import { Sidebar } from "flowbite-react";
import { getBlog, getCategory } from "../Service/apiService";
import BlogCard from "../Components/BlogCard";
import axios from "axios";

function Blog() {
  const [dataBlog, setDataBlog] = React.useState([]);
  const [dataCategory, setDataCategory] = React.useState([]);
  const [filterBlog, setFilterBlog] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState([]);
  const [sortOrder, setSortOrder] = React.useState("ASC");

  const fetchData = async () => {
    try {
      const url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${dataCategory}&sort=${sortOrder}&page=1&size=100`;
      const response = await axios.get(url);
      // console.log(response.data);
      setDataBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchData();
    getCategory().then(setDataCategory);
    setFilterBlog();
    setActiveCategory("all");
  }, [sortOrder]);

  function handleFilterBlog(idCat, nameCat) {
    let category = idCat === "all" ? idCat : parseInt(idCat);
    const filteredBlog = filterBlogCategory(category),
      emptyFilteredBlog = [],
      emptyMessage = {
        message: "Empty articles with " + nameCat + " category!",
      };
    emptyFilteredBlog.push(emptyMessage);
    const isFilteredBlog =
      filteredBlog.length > 0 ? filteredBlog : emptyFilteredBlog;
    category === "all"
      ? setFilterBlog(dataBlog?.result)
      : setFilterBlog(isFilteredBlog);
    setActiveCategory(category);
  }

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const filterBlogCategory = (category) => {
    let filtredBlogCategory = dataBlog?.result?.filter(
      (item) => item.CategoryId === category
    );
    return filtredBlogCategory;
  };

  const sortedArticles = dataBlog.result?.sort((a, b) => {
    if (sortOrder === "ASC") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "DESC") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "createdAt_ASC") {
      return a.createdAt.localeCompare(b.createdAt);
    } else if (sortOrder === "createdAt_DESC") {
      return b.createdAt.localeCompare(a.createdAt);
    }
  });

  const blogData = filterBlog?.length > 0 ? filterBlog : sortedArticles;

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="flex first-letter:py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="flex-none">
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item>
                  <select value={sortOrder} onChange={handleSortOrder}>
                    <option value="createdAt_ASC">Oldest First</option>
                    <option value="createdAt_DESC">Newest First</option>
                  </select>
                </Sidebar.Item>
                <Sidebar.Item>
                  <span
                    key="all"
                    value="all"
                    onClick={() => handleFilterBlog("all", null)}
                    className={`sidebarBlog ${
                      activeCategory === "all" && "sidebarActive"
                    }`}>
                    All Category
                  </span>
                </Sidebar.Item>
                {dataCategory.map((category) => {
                  return (
                    <Sidebar.Item>
                      <span
                        key={category.id}
                        value={category.id}
                        onClick={() =>
                          handleFilterBlog(category.id, category.name)
                        }
                        className={`sidebarBlog ${
                          activeCategory === category.id && "sidebarActive"
                        }`}>
                        {category.name}
                      </span>
                    </Sidebar.Item>
                  );
                })}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div className="flex-auto">
          <div class="grid gap-8 lg:grid-cols-2">
            {blogData?.map((post, key) => {
              return (
                <article>
                  {post.message ? (
                    <p class="emptyArticle">{post.message}</p>
                  ) : (
                    <BlogCard key={key} post={post} />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blog;
