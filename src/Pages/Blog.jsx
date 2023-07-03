import React from "react";
import { Sidebar } from "flowbite-react";
import { getBlog, getCategory } from "../Service/apiService";
import BlogCard from "../Components/BlogCard";

function Blog() {
  const [dataBlog, setDataBlog] = React.useState([]);
  const [dataCategory, setDataCategory] = React.useState([]);
  const [filterBlog, setFilterBlog] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState([]);

  React.useEffect(() => {
    getBlog().then((d) => setDataBlog(d));
    getCategory().then(setDataCategory);
    setFilterBlog();
    setActiveCategory("all");
  }, []);

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

  const filterBlogCategory = (category) => {
    let filtredBlogCategory = dataBlog?.result?.filter(
      (item) => item.CategoryId === category
    );
    return filtredBlogCategory;
  };

  const blogData = filterBlog?.length > 0 ? filterBlog : dataBlog.result;
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="flex first-letter:py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="flex-none">
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
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
