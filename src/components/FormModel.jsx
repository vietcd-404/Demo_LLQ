import React from "react";
import { Button, Modal } from "react-bootstrap";

const FormModel = (props, formData, onChange) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.text}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <p>
            <div className="mb-3 row">
              <h5 className="col-sm-2 col-form-label">Name</h5>
              <div className="col-sm-7">
                <input
                  name="name"
                  onChange={onChange}
                  value={props.name}
                  type="text"
                  className="form-control"
                />
                {props.errorMessage}
              </div>
            </div>
            <div className="mb-3 row">
              <h5 className="col-sm-2 col-form-label">Price</h5>
              <div className="col-sm-7">
                <input
                  name="price"
                  onChange={onChange}
                  value={props.price}
                  type="number"
                  min="0"
                  className="form-control"
                />
                {props.errorMessage1}
              </div>
            </div>
            <div className="mb-3 row">
              <h5 className="col-sm-2 col-form-label">Quantity</h5>
              <div className="col-sm-7">
                <input
                  type="number"
                  name="quantity"
                  min="0"
                  onChange={onChange}
                  value={props.quantity}
                  className="form-control"
                />
                {props.errorMessage2}
              </div>
            </div>
            <div className="mb-3 row">
              <h5 className="col-sm-2 col-form-label">Status</h5>
              <div className="col-sm-7">
                <input
                  name="status"
                  onChange={onChange}
                  value={props.status}
                  min="0"
                  type="number"
                  className="form-control"
                />
                {props.errorMessage3}
              </div>
            </div>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-success" onClick={props.add}>
            {props.type}
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormModel;
