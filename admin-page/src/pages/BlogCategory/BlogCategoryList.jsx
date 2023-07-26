import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteBlogCategory,
  getBlogCategories,
  resetState,
} from "features/blogCategory/blogCategorySlice";
import CustomModal from "components/CustomModal/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogCategoryId, setBlogCategoryId] = useState("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);

  const showModal = (id) => {
    setOpen(true);
    setBlogCategoryId(id);
  };

  const hideModal = () => {
    setOpen(false);
    setBlogCategoryId("");
  };

  const blogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const data1 = [];
  for (let i = 0; i < blogCategories.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCategories[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCategories[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCategories[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handlerDeleteBlogCategory = (couponId) => {
    dispatch(deleteBlogCategory(couponId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4">Blogs Category</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handlerDeleteBlogCategory(blogCategoryId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
};

export default BlogCategoryList;
