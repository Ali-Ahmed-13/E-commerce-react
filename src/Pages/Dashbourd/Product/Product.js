import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Product() {
  //. States
  let [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  let { id } = useParams();

  let [categories, setCategories] = useState([]);
  let [images, setImages] = useState([]);
  let [imagesFromServer, setImagesFromServer] = useState([]);
  let [idsFromServer, setIdsFromServer] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCT}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //. Handle open Image
  function handleOpenImage() {
    openImage.current.click();
  }

  //,Handle Change
  function HandleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      await Axios.delete(`/product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((id) => id !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDeleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdsFromServer((prev) => {
      return [...prev, id];
    });
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
  const imagesFromServerShow = imagesFromServer.map((img, key) => (
    <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img alt="" src={img.image} className="w-100"></img>
      </div>
      <div
        style={{ cursor: "pointer" }}
        className="position-absolute top-0 end-0 bg-danger rounded text-white"
      >
        <p
          className="py-1 px-2 m-0"
          onClick={() => handleDeleteImageFromServer(img.id)}
        >
          x
        </p>
      </div>
    </div>
  ));
  // ? Handle Edit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();
    //. Edit Data
    try {
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`/product-img/${idsFromServer[i]}`).then((data) => {
          console.log(data);
        });
      }
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
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center rounded mb-2 justify-content-center gap-2 py-2 w-100 flex-column"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            width="100px"
            src={require("./../../../Assets/Images/upload.png")}
            alt="upload"
          />
          <p style={{ color: "#0086fe" }}>Upload Images</p>
        </div>
        <div className="d-flex align-items-start flex-wrap gap-2">
          {imagesFromServerShow}
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
