import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";

export default function Category() {
  //. States
  let [title, setTitle] = useState("");
  let [image, setImage] = useState("");

  let [disable, setDisable] = useState(true);

  let [loading, setLoading] = useState(false);

  //, Get The Id Of User
  let { id } = useParams();
  //! Navigate
  let navigate = useNavigate();
  //. Get The User
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORY}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() =>
        navigate("/dashboard/categories/page/404", { replace: true })
      );
  }, []);

  // ? Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    //`` Create Form
    let form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      let res = await Axios.post(`/${CATEGORY}/edit/${id}`, form);

      navigate("/dashboard/categories");
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            required
            minLength={2}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..........."
          />
          {title.length < 2 && disable === false && (
            <div className="erorr">Erorr</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="Image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>
        <button disabled={disable} className="btn btn-primary" type="submit">
          Save
        </button>
      </Form>
    </>
  );
}
