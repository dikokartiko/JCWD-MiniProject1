import React from 'react';
import { Link } from "react-router-dom";

function BlogCard(props) {
    const post = props.post;
    let stringUrl = '';
    if (!post.message) {
      stringUrl = post.title.replace(/\s+/g, '-')
    }
    const detailBlogUrl = `/Blog/${stringUrl}`;
    return (
        <div class="customCardBlog p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between items-center mb-5 text-gray-500">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                {post.Category.name}
                </span>
                <span class="text-sm">14 days ago</span>
            </div>
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate" style={{WebkitLineClamp: 2}}>
                {post.title}
            </h2>
            <p class="mb-5 font-light text-gray-500 dark:text-gray-400 truncate" style={{WebkitLineClamp: 3}}>
                {post.content}
            </p>
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <div className="image-background w-100"
                        style={{
                        backgroundImage: `url(
                            https://minpro-blog.purwadhikabootcamp.com/${post.imageURL}
                        )`,
                        height: `200px`,
                        }}>
                    </div>
                    <span class="font-medium dark:text-white">
                        {post.User.username}
                    </span>
                </div>
                <Link
                    class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    to={detailBlogUrl}
                    state={{ data: post }}>
                    Read more
                </Link>
            </div>
        </div> 
    )
}

export default BlogCard