import "./Home.css";
import Landing from "../../../Components/Website/Landing/Landing";
import LatestSaleProducts from "../../../Components/Website/Products/SaleProducts/ShowLatestSaleProducts";
import ShowTopRated from "../../../Components/Website/Products/TopRated/ShowTopRated";
import { Container } from "react-bootstrap";
import ShowLatestProducts from "../../../Components/Website/Products/LatestProducts/ShowLatestProducts";

export default function HomePage() {
  return (
    <div className=" d-flex flex-column row-gap-5">
      <Landing />
      <LatestSaleProducts />
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </div>
  );
}
