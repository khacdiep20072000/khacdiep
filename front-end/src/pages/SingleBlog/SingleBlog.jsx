import React, { useEffect } from "react";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import "./SingleBlog.css";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "Features/Blog/BlogSlice";

const SingleBlog = () => {
  const { id: blogId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog(blogId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blog = useSelector((state) => state.blog.blog);

  console.log(blog);

  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <div className="single-blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blog" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
                </Link>
                <h3 className="title">{blog?.title}</h3>
                <img
                  src={blog?.images[0]?.url}
                  className="img-fluid w-100 my-4"
                  alt="blog"
                />
                <p dangerouslySetInnerHTML={{ __html: blog?.description }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
