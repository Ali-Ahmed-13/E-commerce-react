import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { USER, USERS } from "../../../Api/Api";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashbourd/TableShow";
export default function Users() {
  /// States
  let [users, setUsers] = useState([]);

  let [currentUser, setCurrentUser] = useState("");

  let [limit, setLimit] = useState(5);
  let [page, setPage] = useState(1);
  let [dataTotal, setDataTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  //`` USE EFFECTS

  useEffect(() => {
    Axios.get(`/${USER}`).then((data) => {
      setCurrentUser(data.data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
      .then((data) => {
        setUsers(data.data.data);
        setDataTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  let header = [
    {
      key: "name",
      name: "UserName",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "Created Date",
    },
    {
      key: "updated_at",
      name: "Last Login",
    },
  ];

  //! Handel Delete
  async function handelDelete(id) {
    try {
      await Axios.delete(`/${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // Return
  return (
    <div className=" p-3  w-100 bg-gray">
      <div className="shadow-sm">
        <div className="d-flex align-items-center justify-content-between  p-3 ">
          <h1>Users Page</h1>
          <Link to={"../user/add"} className="btn btn-primary">
            Add User
          </Link>
        </div>
        <TableShow
          header={header}
          data={users}
          delete={handelDelete}
          currentUser={currentUser}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          dataTotal={dataTotal}
          loading={loading}
          search="name"
          searchLink={USER}
        />
      </div>
    </div>
  );
}
