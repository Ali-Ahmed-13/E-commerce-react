import { useState, useEffect } from "react";
import { CATEGORIES } from "../../../Api/Api";

import { Container } from "react-bootstrap";
import stringSlice from "../../../Helpers/StringSlice";
import CleanSkeleton from "../../../Components/Website/Skeleton/Skeleton";
import { Axios } from "../../../Api/axios";

export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(CATEGORIES)
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  const showCategories = categories.map((item) => (
    <div
      key={item.id}
      className="col-lg-2 col-md-6 col-12 bg-transparent border-0"
    >
      <div className="-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img
          className="ms-3"
          width="50px"
          src={"https://api-react-production.up.railway.app" + item.image}
          alt="category"
        />
        <p className="m-0">{stringSlice(item.title, 12)}</p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="bg-secondary py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap gap-3">
            {loading ? (
              <CleanSkeleton count={50} lg={2} md={6} sm={12} height={55} />
            ) : (
              showCategories
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
