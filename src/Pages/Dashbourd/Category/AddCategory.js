import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  //. States
  let [title, setTitle] = useState("");
  let [image, setImage] = useState("");

  let [loading, setLoading] = useState(false);

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
    //`` Create Form
    let form = new FormData();
    form.append("title", title);
    form.append("image", image);
    //. Send Data
    try {
      await Axios.post(`/${CATEGORY}/add`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //!  Return
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
            ref={foucs}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>
        <button
          disabled={title.length >= 2 ? false : true}
          className="btn btn-primary"
          type="submit"
        >
          Save
        </button>
      </Form>
    </>
  );
}
