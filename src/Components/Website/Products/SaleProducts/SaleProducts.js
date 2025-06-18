import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function WebSiteProducts(props) {
  let roundStars = Math.round(props.rating);
  let stars = Math.min(roundStars, 5);
  let showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solidStar} color="gold" />
  ));
  let showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <NavLink
      to={`/product/${props.id}`}
      className={`col-md-6 col-12 ${props.lg && "col-lg-3"}`}
    >
      <div className="m-1 border rounded p-3 h-100">
        <div className="border-bottom pb-3">
          <p className="text-truncate" style={{ color: "gray" }}>
            {props.title}
          </p>
          <p className="text-truncate">{props.description}</p>
          <div className="px-5 py-4 position-relative">
            {props.sale && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                Sale
              </p>
            )}
            <img
              src={"https://api-react-production.up.railway.app" + props.img}
              alt="Thermometer"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStars}
            {showEmptyStars}
          </div>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{props.discount}$</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {props.price}$
            </h6>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../../Assets/Images/Cart.png")}
              alt="cart"
              width="20px"
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
