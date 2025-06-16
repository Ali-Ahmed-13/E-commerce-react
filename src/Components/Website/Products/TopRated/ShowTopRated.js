import { useEffect, useState } from "react";
import TopRated from "./TopRated";
import { Axios } from "../../../../Api/axios";
import { TOPRATED } from "../../../../Api/Api";
import CleanSkeleton from "../../Skeleton/Skeleton";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`/${TOPRATED}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const productsShow = products.map((product) => (
    <TopRated
      key={product.id}
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));

  return (
    <div className="col-md-6 col-12" style={{ border: "2px solid #0D6efd" }}>
      <h1 className="text-center m-0  p-3 bg-primary text-white">Top Rated</h1>
      <div className="p-3">
        {loading ? (
          <>
            <CleanSkeleton mx count={5} lg={12} md={12} sm={12} height={155} />
          </>
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
