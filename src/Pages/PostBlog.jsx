import React from "react";
import { FileInput, Label } from "flowbite-react";
import { Link } from "react-router-dom";
function PostBlog() {
  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Make A new Post
          </h2>
          <form action="#">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Title name"
                  required=""
                />
              </div>
              <div class="w-full">
                <label
                  for="File"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Image / Video
                </label>
                <FileInput
                  accept=".jpg, .jpeg, png"
                  type="file"
                  helperText="A profile picture is useful to confirm your are logged into your account"
                  id="file"
                />
              </div>
              <div class="w-full">
                <label
                  for="Keyword"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Keyword
                </label>
                <input
                  type="text"
                  id="keyword"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Keyword name"
                  required="yes"
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </label>
                <select
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option selected="">Select category</option>
                  <option value="Bisnis">Bisnis</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Kuliner">Kuliner</option>
                  <option value="Internasional">Internasional</option>
                  <option value="Fiksi">Fiksi</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"></textarea>
              </div>
            </div>
            <Link to={"/"}>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Post
              </button>
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PostBlog;
