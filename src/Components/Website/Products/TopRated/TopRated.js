import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function TopRated(props) {
  let roundStars = Math.round(props.rating);
  let stars = Math.min(roundStars, 5);
  let showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solidStar} color="gold" size="xs" />
  ));
  let showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} size="xs" />
  ));

  return (
    <NavLink
      to={`/product/${props.id}`}
      className="col-12 border-bottom d-flex align-items-start flex-wrap mb-3 p-2"
    >
      <div
        className="col-md-4 col-12"
        style={{
          backgroundImage: `url(${props.img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100px",
        }}
        aria-label={props.title}
      ></div>

      <div className="m-1 col-md-7 col-12 rounded p-2 h-100 d-flex flex-column justify-content-between">
        <div className="mb-1">
          <p
            className="text-truncate mb-0"
            style={{ color: "black", fontSize: "0.9rem", fontWeight: "bold" }}
          >
            {props.title}
          </p>
          <p
            className="text-truncate mb-1"
            style={{ fontSize: "0.8rem", color: "#666" }}
          >
            {props.description}
          </p>
        </div>

        <div>
          <div className="mb-1">
            {showGoldStars}
            {showEmptyStars}
          </div>

          <div className="d-flex align-items-center gap-2">
            <h5 className="m-0 text-primary" style={{ fontSize: "0.9rem" }}>
              {props.discount}
            </h5>
            <h6
              className="m-0"
              style={{
                color: "gray",
                textDecoration: "line-through",
                fontSize: "0.8rem",
              }}
            >
              {props.price}
            </h6>
          </div>
        </div>

        {/* Cart icon button kept as requested */}
        <div
          className="border p-1 rounded mt-1"
          style={{ width: "fit-content" }}
        >
          <img
            src={require("../../../../Assets/Images/Cart.png")}
            alt="cart"
            width="16px"
          />
        </div>
      </div>
    </NavLink>
  );
}
