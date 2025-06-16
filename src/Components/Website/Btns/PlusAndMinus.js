import { useEffect, useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function PlusAndMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);
    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  useEffect(() => {
    if (props.count !== undefined) {
      setBtn(props.count);
    }
  }, [props.count]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (!isNaN(val) || val === "") setBtn(val);
  };

  const handleButtonClick = (type) => {
    const numericValue = parseInt(btn) || 0;
    const stock = props.product?.stock || Infinity;

    if (type === "minus") {
      setBtn(numericValue - 1 < 0 ? 0 : numericValue - 1);
    }

    if (type === "plus") {
      if (numericValue >= stock) return;
      setBtn(numericValue + 1);
    }
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <InputGroup style={{ width: "200px" }}>
        <Button variant="danger" onClick={() => handleButtonClick("minus")}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <Form.Control
          type="text"
          value={btn}
          onChange={handleChange}
          className="text-center"
        />
        <Button variant="success" onClick={() => handleButtonClick("plus")}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </InputGroup>
    </div>
  );
}
