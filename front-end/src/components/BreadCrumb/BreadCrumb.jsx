import React from "react";
import "./BreadCrumb.css";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { title } = props;

  return (
    <div className="breadcrumb py-4 mb-0">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className=" mb-0 fs-4">
              <Link to="/" className="text-dark ">
                Home &nbsp;
              </Link>{" "}
              / {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
