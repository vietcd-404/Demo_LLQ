import React from "react";
import { Button } from "react-bootstrap";

export const Table = ({ item, index, show, show2 }) => {
  return (
    <>
      <tr key={item.id}>
        <th scope="row">{index + 1}</th>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.status === 0 ? "Unactive" : "Active"}</td>
        <td>{item.createDate}</td>
        <td>{item.updateDate}</td>
        <td>
          <Button
            type="button"
            className="btn btn-secondary"
            style={{ marginRight: "10px" }}
            onClick={show}
          >
            Edit
          </Button>
          <Button type="button" className="btn btn-danger" onClick={show2}>
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
