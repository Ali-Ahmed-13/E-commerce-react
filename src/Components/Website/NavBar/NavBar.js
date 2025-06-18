import { Button, Form, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES } from "../../../Api/Api";
import stringSlice from "../../../Helpers/StringSlice";
import CleanSkeleton from "../Skeleton/Skeleton";
import { Cart } from "../../../Context/CartChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusAndMinusBtn from "../Btns/PlusAndMinus";
export default function NavBar() {
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);

  let [count, setCount] = useState(1);

  let { isChange } = useContext(Cart);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((res) => {
        setCategories(res.data.slice(-8));
        console.log(res.data);
      })
      .finally(() => setLoading(false));
  }, []);
  let categoriesShow = categories.map((category, key) => (
    <p key={key} className="m-0 text-black">
      {stringSlice(category.title, 12)}
    </p>
  ));

  /// produucts
  useEffect(() => {
    let getItems = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getItems);
  }, [isChange]);

  //, Handle Delete
  const handleDelete = (id) => {
    let filterProducts = products.filter((product) => product.id !== id);
    setProducts(filterProducts);
    localStorage.setItem("product", JSON.stringify(filterProducts));
  };

  //. Change Count
  const changeCount = (id, btnCount) => {
    let newProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, count: btnCount };
      }
      return product;
    });
    localStorage.setItem("product", JSON.stringify(newProducts));
  };
  //`` show products
  let productsShow = products.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle d-flex
                  align-items-center justify-content-center bg-danger text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon width="10px" icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <img
          src={product.images[0].image}
          height="80px"
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h6 className="m-0 text-primary">{product.discount}</h6>
            <h6
              className="m-0"
              style={{
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {product.price}
            </h6>
          </div>
        </div>
        <PlusAndMinusBtn
          product={product}
          count={product.count || 1}
          setCount={setCount}
          id={product.id}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {" "}
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productsShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            {/* Logo Section */}
            <Link className="col-3" to="/">
              <img
                width="200px"
                src={require("../../../Assets/Images/Logo.png")}
                alt="logo"
              />
            </Link>

            {/* Search Section */}
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded-0"
                placeholder="Search Product"
              />
              <button className="btn btn-primary position-absolute top-0 end-0 h-100 m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                Search
              </button>
            </div>

            {/* Icons Section */}
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <div onClick={handleShow}>
                <img
                  width="39px"
                  src={require("../../../Assets/Images/Cart.png")}
                  alt="Cart"
                />
              </div>
              <Link to="/register">
                <img
                  width="35px"
                  src={require("../../../Assets/icons/profile.png")}
                  alt="Profile"
                />
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center justify-content-start gap-4 flex-wrap">
              {loading ? (
                <>
                  <CleanSkeleton count={8} lg={1} md={3} sm={4} height={24} />
                </>
              ) : (
                categoriesShow
              )}
              <Link className="text-black category-title" to="/categories">
                Show all
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
