import React from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { blog } = props;

  return (
    <div className="blog-card">
      <div className="card-img">
        <img src={blog?.images[0].url} alt="" className="img-fluid" />
      </div>
      <div className="blog-content">
        <p className="date">
          {new Date(blog?.createdAt).toLocaleString("en-GB")}
        </p>
        <h5 className="title">{blog?.title}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{ __html: blog?.description }}
        ></p>
        <Link className="button" to={`/blog/${blog?._id}`}>
          <span className="text-black">Read More</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
