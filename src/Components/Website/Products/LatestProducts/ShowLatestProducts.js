import CleanSkeleton from "../../Skeleton/Skeleton";
import WebSiteProducts from "../SaleProducts/SaleProducts";
import { LATEST } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { useEffect, useState } from "react";

export default function ShowLatestProducts() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`/${LATEST}`)
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
      sale
    />
  ));
  return (
    <div className=" col-md-6 col-sm-12 col-12">
      <div className="ms-2">
        <h1 className="text-center">Latest Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-3 mb-5">
          {loading ? (
            <>
              <CleanSkeleton mx count={6} lg={6} md={6} sm={12} height={300} />
            </>
          ) : (
            productsShow
          )}
        </div>
      </div>
    </div>
  );
}
