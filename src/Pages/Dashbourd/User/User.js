import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function User() {
  //. States
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");

  let [disable, setDisable] = useState(true);

  let [loading, setLoading] = useState(false);

  //, Get The Id Of User
  let id = Math.floor(window.location.pathname.slice(17));

  //! Navigate
  let navigate = useNavigate();
  //. Get The User
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => navigate("/dashboard/users/page/404", { replace: true }));
  }, []);

  // ? Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      let res = await Axios.post(`/${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });

      navigate("/dashboard/users");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //*  Return
  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            required
            minLength={2}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name..........."
          />
          {name.length < 2 && disable === false && (
            <div className="erorr">Erorr</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..........."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary" type="submit">
          Save
        </button>
      </Form>
    </>
  );
}
