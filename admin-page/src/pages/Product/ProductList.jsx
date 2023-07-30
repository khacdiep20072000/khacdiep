import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "features/product/productSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "components/CustomModal/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const hideModal = () => {
    setOpen(false);
    setProductId("");
  };

  const products = useSelector((state) => state.product.products);

  const data1 = products.map((product, i) => {
    return {
      key: i + 1,
      title: product.title,
      brand: product.brand,
      category: product.category,
      color: (
        <div className="d-flex  gap-2">
          {product?.color.map((c) => (
            <span
              key={c._id}
              className="rounded-circle d-block border border-dark"
              style={{
                backgroundColor: `${c.title}`,
                width: "20px",
                height: "20px",
              }}
            ></span>
          ))}
        </div>
      ),

      price: `$ ${product.price}`,
      action: (
        <>
          <Link
            to={`/admin/product/${product._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(product._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });

  const handlerDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4">Product</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handlerDeleteProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default ProductList;
