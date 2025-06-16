import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { LATESTSALE } from "../../../../Api/Api";
import WebSiteProducts from "./SaleProducts";
import { Container } from "react-bootstrap";
import CleanSkeleton from "../../Skeleton/Skeleton";

export default function LatestSaleProducts() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`/${LATESTSALE}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  let productsShow = products.map((product, key) => (
    <WebSiteProducts
      key={key}
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
      lg
      sale
    />
  ));
  return (
    <Container>
      <h1 className="text-center mt-5 mb-3">Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-3 mb-5">
        {loading ? (
          <>
            <CleanSkeleton mx count={5} lg={3} md={6} sm={12} height={300} />
          </>
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
