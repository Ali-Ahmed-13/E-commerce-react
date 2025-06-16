import { useEffect, useRef, useState } from "react";
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
  let [password, setPassword] = useState("");

  let [loading, setLoading] = useState(false);

  let [accept, setAccept] = useState(false);
  //! Navigate
  let navigate = useNavigate();
  //`` Ref
  let foucs = useRef(null);
  //?   Handle Focus
  useEffect(() => {
    foucs.current.focus();
  }, []);
  // ? Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    setAccept(true);
    try {
      await Axios.post(`/${USER}/add`, {
        name: name,
        email: email,
        password: password,
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
            ref={foucs}
          />
          {name.length < 2 && accept && <div className="erorr">Erorr</div>}
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
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..........."
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
            <option value="1999">Product Manager</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 2 &&
            email.length > 2 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-primary"
          type="submit"
        >
          Save
        </button>
      </Form>
    </>
  );
}
