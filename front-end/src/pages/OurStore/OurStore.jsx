import React, { useEffect, useState } from "react";
import "./OurStore.css";
import BreadCrumb from "components/BreadCrumb/BreadCrumb";
import Meta from "components/Meta/Meta";
import gr1 from "../../images/gr.svg";
import gr2 from "../../images/gr2.svg";
import gr3 from "../../images/gr3.svg";
import gr4 from "../../images/gr4.svg";
import ProductCard from "components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProducts } from "Features/product/productSlice";
import { AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

const OurStore = () => {
  const [queryParameters] = useSearchParams();
  const [grid, setGrid] = useState(
    window.innerWidth <= 576 ? 12 : window.innerWidth <= 768 ? 6 : 4
  );
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState(
    queryParameters.get("category") || ""
  );
  const [sort, setSort] = useState(null);
  const [brand, setBrand] = useState(null);
  const [active, setActive] = useState(queryParameters.get("c_id") || null);
  const [activeB, setActiveB] = useState(null);

  const allProducts = useSelector((state) => state.product.products);
  const allCategories = useSelector((state) => state.category.allCategories);
  const allBrands = useSelector((state) => state.product.brandProduct);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, brand]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!minPrice && !maxPrice)
      toast.warning("Please input valid price range.");
    if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
      toast.warning("Please input valid price range.");
      setMaxPrice("");
    }
    getProduct();
  };

  const getProduct = () => {
    dispatch(
      getProducts({
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice),
        category,
        sort,
        brand,
      })
    );
  };

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-2 py-sm-5">
        <div className="container-xxl">
          <div className="row">
            <div className="d-none d-sm-block col-0 col-sm-4 col-md-3">
              <div className=" filter-card mb-3">
                <h3 className="filter-title">Categories</h3>
                <ul className="ps-0">
                  {allCategories &&
                    allCategories.map((category) => (
                      <li
                        className={
                          (active === category?._id ? "active " : "") +
                          "d-flex justify-content-between align-items-center px-3"
                        }
                        key={category?._id}
                      >
                        <span
                          onClick={() => {
                            setCategory(category?.title);
                            setActive(category?._id);
                          }}
                        >
                          {category.title}
                        </span>
                        <AiOutlineClose
                          onClick={() => setActive(null)}
                          className={active === category?._id ? "" : "d-none"}
                        />
                      </li>
                    ))}
                </ul>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title">Brand</h3>
                <ul className="ps-0">
                  {allBrands &&
                    allBrands.map((brand) => (
                      <li
                        className={
                          (activeB === brand?._id ? "active " : "") +
                          "d-flex justify-content-between align-items-center px-3"
                        }
                        key={brand._id}
                      >
                        <span
                          onClick={() => {
                            setActiveB(brand?._id);
                            setBrand(brand?.title);
                          }}
                        >
                          {brand?.title}
                        </span>
                        <AiOutlineClose
                          onClick={() => {
                            setBrand(null);
                            setActiveB(null);
                          }}
                          className={activeB === brand?._id ? "" : "d-none"}
                        />
                      </li>
                    ))}
                </ul>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  {/* <h5 className="sub-title">Available</h5> */}
                  {/* <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        In Stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label" htmlFor="">
                        Out of Stock(0)
                      </label>
                    </div>
                  </div> */}

                  <h5 className="sub-title">Price</h5>
                  <form
                    className="d-flex flex-column"
                    onSubmit={(e) => handlerSubmit(e)}
                  >
                    <div className="d-flex align-items-center gap-10">
                      <div className="form-floating">
                        <input
                          type="text"
                          pattern="[0-9]*"
                          className="form-control"
                          id="floatingInput"
                          placeholder="From"
                          value={minPrice}
                          onChange={(e) =>
                            setMinPrice((minPrice) =>
                              e.target.validity.valid
                                ? e.target.value
                                : minPrice
                            )
                          }
                        />
                        <label htmlFor="floatingInput">From</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="text"
                          pattern="[0-9]*"
                          className="form-control"
                          id="floatingInput1"
                          placeholder="To"
                          value={maxPrice}
                          onChange={(e) =>
                            setMaxPrice((maxPrice) =>
                              e.target.validity.valid
                                ? e.target.value
                                : maxPrice
                            )
                          }
                        />
                        <label htmlFor="floatingInput1">To</label>
                      </div>
                    </div>

                    <button className="button mt-3">
                      <span>Apply</span>
                    </button>
                  </form>

                  {/* <h5 className="sub-title">Colors</h5>
                  <div>
                    <Color />
                  </div> */}

                  {/* <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        S (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-2"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                        M (2)
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-8 col-md-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-item-center">
                  <div className="d-flex align-items-center gap-10">
                    <div className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort by:
                    </div>
                    <select
                      name=""
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setSort(e.target.value)}
                    >
                      {/* <option value="manual">Featured</option>
                      <option value="best-selling">Best selling</option> */}
                      <option value="title">Alphabetically, A-Z</option>
                      <option value="-title">Alphabetically, Z-A</option>
                      <option value="price">Price, low to high</option>
                      <option value="-price">Price, high to low</option>
                      <option value="createdAt">Date, old to new</option>
                      <option value="-createdAt">Date, new to old</option>
                    </select>
                  </div>
                  <div className="d-none d-md-flex align-items-center gap-10">
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src={gr4}
                        className="d-block img-fluidgit
                        "
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src={gr3}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src={gr2}
                        className="d-block img-fluid"
                        alt="grid"
                      />

                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src={gr1}
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="products-list pb-5">
                <div className="d-flex justify-content-between flex-wrap">
                  {allProducts &&
                    allProducts.map((product) => (
                      <ProductCard
                        key={product?._id}
                        product={product}
                        grid={grid}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
