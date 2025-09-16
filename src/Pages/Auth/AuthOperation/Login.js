import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import "./Auth.css";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Register() {
  //. States
  let [form, setForm] = useState({
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
  //?   Handle Focus
  useEffect(() => {
    foucs.current.focus();
  }, []);
  //, Handle Change
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  //?   Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      let token = res.data.token;
      cookie.set("token", token);
      let role = res.data.user.role;
      let go =
        role === "1995"
          ? "/dashboard/users"
          : role === "1996"
          ? "/dashboard/writer"
          : role === "2001"
          ? "/"
          : "/dashboard/categories";
      window.location.pathname = go;
    } catch (err) {
      setLoading(false);
      if (err.response) {
        if (err.response.status === 401) {
          setErr("Email Or Password Is Incorrect");
        } else {
          setErr("Internal Server Error");
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
        setErr("Network Error: Cannot reach the server");
      } else {
        console.error("Error", err.message);
        setErr("Something went wrong");
      }
    }
  }

  //,   Return
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className=" row vh-100">
          <Form className="form" onSubmit={handleSubmit}>
            <div className=" custom-form">
              <h1>Login</h1>

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
                  ref={foucs}
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group
                className="mb-3 form-custom"
                controlId="formBasicEmail2"
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

              <button className="btn btn-success" type="submit">
                Login
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
          </Form>
        </div>
      </div>
    </>
  );
}
