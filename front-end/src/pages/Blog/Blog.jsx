import React, { useEffect, useState } from "react";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import "./Blog.css";
import BlogCard from "components/BlogCard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories, getBlogs } from "Features/Blog/BlogSlice";
import { useSearchParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Blog = () => {
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();
  const [category, setCategory] = useState(
    queryParameters.get("category") || ""
  );
  const [active, setActive] = useState(queryParameters.get("c_id") || null);

  const blogs = useSelector((state) => state.blog.blogs);
  const blogCategories = useSelector((state) => state.blog.categoryBlog);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  useEffect(() => {
    getBlogC();
  }, [category]);

  const getBlogC = () => {
    dispatch(
      getBlogs({
        category,
      })
    );
  };

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 col-sm-3">
              <div className="filter-card mb-3 dropdown">
                <h3
                  className="filter-title"
                  data-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Find By Categories
                </h3>
                <ul className="ps-0" id="collapseExample">
                  {blogCategories &&
                    blogCategories?.map((blogCategory) => (
                      <li
                        className={
                          (active === blogCategory?._id ? "active " : "") +
                          "d-flex justify-content-between align-items-center px-3"
                        }
                        key={blogCategory._id}
                      >
                        <span
                          onClick={() => {
                            setCategory(blogCategory?.title);
                            setActive(blogCategory?._id);
                          }}
                        >
                          {blogCategory.title}
                        </span>
                        <AiOutlineClose
                          onClick={() => setActive(null)}
                          className={
                            active === blogCategory?._id ? "" : "d-none"
                          }
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-9">
              <div className="row">
                {blogs?.map((blog) => (
                  <div key={blog._id} className="col-12 col-sm-6 col-md-4 mb-3">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
