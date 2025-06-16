import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  //. States
  let [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });

  let dummyForm = {
    category: null,
    title: "duummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  };

  let [id, setId] = useState("");
  let [categories, setCategories] = useState([]);
  let [images, setImages] = useState([]);

  let [sent, setSent] = useState(false);

  let [loading, setLoading] = useState(false);

  let nav = useNavigate();

  //`` Ref
  let foucs = useRef(null);
  let openImage = useRef(null);
  let progress = useRef([]);
  let ids = useRef([]);
  //,Handle Focus
  useEffect(() => {
    foucs.current.focus();
  }, []);
  //. Handle open Image
  function handleOpenImage() {
    openImage.current.click();
  }
  //. Handle submit form
  async function HandleSubmitForm() {
    try {
      let res = await Axios.post(`/${PRODUCT}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }
  //,Handle Change
  function HandleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      HandleSubmitForm();
    }
  }

  //`` Handle Change Images

  let j = useRef(-1);
  async function HandleChangeImages(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    let data = new FormData();
    let imagesAsFiles = e.target.files;
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        let res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }
  //. Handle Delete Image
  async function handleDeleteImage(id, img) {
    let findId = ids.current[id];
    try {
      let res = await Axios.delete(`/product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((id) => id !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }
  /// Get all Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //, Categories map
  let categoriesShow = categories.map((category, key) => (
    <option key={key} value={category.id}>
      {category.title}
    </option>
  ));

  /// Images map
  let imagesShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-space-between w-100">
        <div className="d-flex align-items-center justify-content-start gap-2 w-100">
          <img width="80px" src={URL.createObjectURL(img)} alt="."></img>
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + " KB"
                : (img.size / (1024 * 1024)).toFixed(2) + " MB"}
            </p>
          </div>
        </div>
        <Button variant="danger" onClick={() => handleDeleteImage(key, img)}>
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  // ? Handle Edit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();
    //. Edit Data
    try {
      await Axios.post(`/${PRODUCT}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  //!  Return
  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleEdit}>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={form.category}
            name="category"
            onChange={HandleChange}
            ref={foucs}
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={form.title}
            required
            minLength={2}
            onChange={HandleChange}
            placeholder="Title..........."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            value={form.description}
            required
            minLength={2}
            onChange={HandleChange}
            placeholder="Description..........."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="text"
            value={form.price}
            required
            onChange={HandleChange}
            placeholder="Price..........."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            name="discount"
            type="text"
            value={form.discount}
            required
            onChange={HandleChange}
            placeholder="Discount..........."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            name="About"
            type="text"
            value={form.About}
            required
            onChange={HandleChange}
            placeholder="About..........."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            name="stock"
            type="number"
            value={form.stock}
            required
            onChange={HandleChange}
            placeholder="Stock..........."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            type="file"
            onChange={HandleChangeImages}
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center rounded mb-2 justify-content-center gap-2 py-2 w-100 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: sent && "pointer",
          }}
        >
          <img
            width="100px"
            src={require("./../../../Assets/Images/upload.png")}
            alt="upload"
            style={{ filter: !sent && "grayscale(100%)" }}
          />
          <p style={{ color: !sent ? "gray" : "#0086fe" }}>Upload Images</p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesShow}
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </Form>
    </>
  );
}
