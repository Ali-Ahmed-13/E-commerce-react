import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../Api/axios";
import { CART, PRODUCT } from "../../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import CleanSkeleton from "../../Skeleton/Skeleton";
import { Cart } from "../../../../Context/CartChanger";
import PlusAndMinusBtn from "../../Btns/PlusAndMinus";

export default function SingleProduct() {
  let [product, setProduct] = useState({});
  let [productImages, setProductImages] = useState([]);
  let [loading, setLoading] = useState(true);
  let [count, setCount] = useState(1);

  let [error, setEror] = useState("");
  let [loadingCart, setLoadingCart] = useState(false);

  let { setIsChange } = useContext(Cart);

  let { id } = useParams();
  // `` Show Stars
  let roundStars = Math.round(product.rating);
  let stars = Math.min(roundStars, 5);
  let showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solidStar} color="gold" />
  ));
  let showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  // / Use Effect
  useEffect(() => {
    Axios.get(`/${PRODUCT}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return {
              original:
                "https://api-react-production.up.railway.app" + img.image,
              thumbnail:
                "https://api-react-production.up.railway.app" + img.image,
            };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  //! Check Count
  let checkCount = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: Math.floor(count + (productCount ? productCount : 0)),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  //* Handle Save

  const handleSave = async () => {
    let check = await checkCount();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productExist = getItems.findIndex((pro) => pro.id == id);

      if (productExist !== -1) {
        // Product exists in the array
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count; // Or 1 if you want to initialize it
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <Container className="mt-5">
      {" "}
      <div className="d-flex align-items-start  flex-wrap">
        {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="w-100">
                <CleanSkeleton count={1} sm={12} height={250} />
                <div className="d-flex col-12">
                  <CleanSkeleton count={1} mx sm={4} height={100} />
                  <CleanSkeleton count={1} mx sm={4} height={100} />
                  <CleanSkeleton count={1} mx sm={4} height={100} />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-lg-5">
                <CleanSkeleton height="20" count="1" lg={8} sm={12} />
                <CleanSkeleton
                  height="210"
                  count="1"
                  lg={8}
                  sm={12}
                  classes=" mt-2"
                />
                <hr className="col-lg-8 col-12" />

                <div className="d-flex align-items-center justify-content-between col-lg-8 col-12">
                  <CleanSkeleton
                    height="20"
                    count="1"
                    sm={4}
                    className=" mt-2"
                  />
                  <CleanSkeleton
                    height="20"
                    count="1"
                    sm={4}
                    className=" mt-2"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery items={productImages} />
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-5">
                <h1>{product.title}</h1>
                <p style={{ color: "#555" }}>{product.About}</p>
                <h3>{product.description}</h3>
                <hr className="col-lg-8 col-12" />
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div>
                    {product.stock <= 1 && (
                      <p className="text-danger">There is only ! left</p>
                    )}
                    {showGoldStars}
                    {showEmptyStars}
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <h5 className="m-0 text-primary">{product.discount}$</h5>
                    <h6
                      className="m-0"
                      style={{ color: "gray", textDecoration: "line-through" }}
                    >
                      {product.price}$
                    </h6>
                  </div>
                  <PlusAndMinusBtn setCount={setCount} />
                  <div
                    onClick={handleSave}
                    className="border p-2 rounded transition-all duration-300"
                  >
                    {loadingCart ? (
                      "Loading..."
                    ) : (
                      <img
                        src={require("../../../../Assets/Images/Cart.png")}
                        alt="cart"
                        width="20px"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}{" "}
      </div>
    </Container>
  );
}
