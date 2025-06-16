import { Axios } from "../../../Api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { PRODUCTS, PRODUCT } from "../../../Api/Api";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashbourd/TableShow";

export default function Products() {
  /// States
  let [products, setProducts] = useState([]);

  let [limit, setLimit] = useState(5);
  let [page, setPage] = useState(1);
  let [dataTotal, setDataTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  let header = [
    {
      key: "images",
      name: "Images",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
    {
      key: "created_at",
      name: "Created Date",
    },
    {
      key: "updated_at",
      name: "Updated Date",
    },
  ];

  //`` USE EFFECTS
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setDataTotal(data.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [limit, page]);
  /// Handel Delete  .
  async function handelDelete(id) {
    try {
      await Axios.delete(`/${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }
  //; Return
  return (
    <div className="bg-white p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link to={"../product/add"} className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        data={products}
        delete={handelDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        dataTotal={dataTotal}
        loading={loading}
        search="title"
        searchLink={PRODUCT}
      />
    </div>
  );
}
