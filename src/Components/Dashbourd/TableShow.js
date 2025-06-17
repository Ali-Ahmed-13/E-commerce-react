import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "./pagination/PaginatedItems";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../Helpers/TransformDate";

export default function TableShow(props) {
  /// Variables &  States
  let currentUser = props.currentUser || { name: "" };

  let [search, setSearch] = useState("");
  let [date, setDate] = useState([]);
  let [filterData, setFilterData] = useState([]);
  let [searchLoading, setSearchLoading] = useState(false);
  /// Filter with Date
  let filterWithDate = props.data.filter(
    (item) => TransformDate(item.created_at) === date
  );
  let filterSarchByDate = filterData.filter(
    (item) => TransformDate(item.created_at) === date
  );

  let showichData =
    date.length > 0
      ? search.length > 0
        ? filterSarchByDate
        : filterWithDate
      : search.length > 0
      ? filterData
      : props.data;

  //`` GET SEARCHED DATA
  async function getSearchedData() {
    try {
      let res = await Axios.post(`/${props.searchLink}/search?title=${search}`);
      setFilterData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }
  useEffect(() => {
    let debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 800);
    return () => clearTimeout(debounce);
  }, [search]);

  /// Map Header
  let headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  //. Map Data
  let dataShow = showichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img
              width={"50px"}
              src={
                "https://api-react-production.up.railway.app" + item[item2.key]
              }
              alt=""
            />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center juustify-content-center gap-2 flex-wrap">
              {item[item2.key].map((image, key3) => {
                return (
                  <img
                    key={key3}
                    style={{ marginRight: "4px" }}
                    width={"50px"}
                    src={image.image}
                    alt=""
                  />
                );
              })}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manager"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && "  (You)"}
        </td>
      ))}
      <td className="d-flex primary align-items-center justify-content-evenly">
        <Link to={`${item.id}`}>
          <FontAwesomeIcon
            cursor={"pointer"}
            icon={faPenToSquare}
            fontSize={"20px"}
          />
        </Link>
        {currentUser.name !== item.name && (
          <FontAwesomeIcon
            cursor={"pointer"}
            onClick={() => props.delete(item.id)}
            icon={faTrash}
            color="red"
            fontSize={"20px"}
          />
        )}
      </td>
    </tr>
  ));
  //`` Return
  return (
    <>
      <div className="col-3">
        <Form.Control
          type="Search"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
          className="my-2"
          placeholder="Search"
        />
      </div>
      <div className="col-5">
        <Form.Control
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          className="my-2"
          placeholder="Search"
        />
      </div>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.loading ? (
            <tr className="text-center fs-3" style={{ background: "#F2F2F2" }}>
              <td colSpan={12}>Loading......</td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center fs-3" style={{ background: "#F2F2F2" }}>
              <td colSpan={12}>Searching......</td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end align-items-center flex-wrap">
        <div className="col-1">
          <Form.Select onChange={(e) => props.setLimit(e.target.value)}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.dataTotal}
        />
      </div>
    </>
  );
}
