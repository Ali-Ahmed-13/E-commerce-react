import axios from "axios";
import {  useEffect, useRef, useState } from "react";
import { baseURL, REGISTER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //. States
  let [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  //? Cookies
  const cookie = Cookie();
  //. Loading
  let [loading, setLoading] = useState(false);
  //. Err
  let [err, setErr] = useState("");
  //`` Ref
  let foucs = useRef(null);
  //, Handle Change
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  //?   Handle Focus
  useEffect(() => {
    foucs.current.focus();
  }, []);
  //?   Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      let token = res.data.token;
      cookie.set("token", token);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        setLoading(false);
        setErr("Email already taken");
      } else {
        setLoading(false);
        setErr("Internal Server Error");
      }
    }
  }
  //,   Return
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className=" row vh-100">
          <form className="form" onSubmit={handleSubmit}>
            <div className=" custom-form">
              <h1>Register Now</h1>
              <Form.Group
                className="mb-3 form-custom"
                controlId="formBasicText"
              >
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name............."
                  minLength="2"
                  ref={foucs}
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 form-custom"
                controlId="formBasicEmail"
              >
                <Form.Control
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email............."
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group
                className="mb-3 form-custom"
                controlId="formBasicPassword"
              >
                <Form.Control
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password............."
                  minLength="8"
                  required
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                      alt="Sign in with Google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && <span className="erorr">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
