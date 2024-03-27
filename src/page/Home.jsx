import React, { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  detailProduct,
  findAllProductProcerduce1,
  updateProduct,
} from "../services/ProductService";
import { Table } from "../components/Table";
import { Button, Pagination } from "react-bootstrap";
import FormModel from "../components/FormModel";
import Swal from "sweetalert2";
import axios from "axios";

const Home = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    status: "",
  });

  const [formSearch, setFormSearch] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    status: "",
    startDate: "",
    endDate: "",
    page: 1,
    size: 5,
  });
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Tên  không được trống";
      valid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price không được bỏ trống";
      valid = false;
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity không được bỏ trống";
      valid = false;
    }
    if (!formData.status) {
      newErrors.status = "Trạng thái không được bỏ trống";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const [dataProduce, setDataProduce] = useState([]);

  const fetchData = async () => {
    try {
      const response = await findAllProductProcerduce1({
        name: formSearch.name,
        price: formSearch.price,
        quantity: formSearch.quantity,
        status: formSearch.status,
        startDate: formSearch.startDate,
        endDate: formSearch.endDate,
        page: formSearch.page,
        size: formSearch.size,
      });
      setDataProduce(response.data);
      setTotalPages(response.data[0].totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [formSearch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setFormSearch({
      ...formSearch,
      [name]: value,
      page: 1,
    });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePageClick = (pageNum) => {
    setFormSearch({
      ...formSearch,
      page: pageNum,
    });
    console.log(formSearch.page);
  };

  // const findAll = async () => {
  //   try {
  //     const response = await findAllProduct(page, pageSize);
  //     setData(response.data.content);
  //     // setTotalPages(Math.ceil(response.data.totalPages));
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API: ", error);
  //   }
  // };

  const handleAddDiaChi = async () => {
    try {
      if (validateForm()) {
        await addProduct(formData);
        fetchData();
        Swal.fire({
          title: "Tạo sản phẩm!",
          text: "Tạo sản phẩm thành công",
          icon: "success",
        });

        setModalShow(false);
      }
    } catch (error) {
      console.log("Lỗi ", error);
    }
  };

  const handleDetail = async (ma) => {
    try {
      const response = await detailProduct(ma);
      const dataProduct = response.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: dataProduct.id,
        name: dataProduct.name,
        status: dataProduct.status,
        price: dataProduct.price,
        quantity: dataProduct.quantity,
      }));
      setModalShowEdit(true);
    } catch (error) {
      console.log("Lỗi ", error);
    }
  };

  const handleUpdate = async (ma) => {
    if (validateForm()) {
      Swal.fire({
        title: "Bạn có chắc không?",
        text: "Bạn có muốn sửa sản phẩm không!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, tôi muốn!",
        cancelButtonText: "Thoát",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            Swal.fire({
              title: "Sửa!",
              text: "Bạn đã Sửa thành công.",
              icon: "success",
            });
            await updateProduct(formData, ma);
            setModalShowEdit(false);
            fetchData();
          } catch (error) {
            console.error(error.response.data.message);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!modalShow) {
      setFormData({
        ...formData,
        name: "",
        price: "",
        quantity: "",
        status: "",
      });
    } else {
      setErrors("");
    }
  }, [modalShow]);

  const handleDelete = (ma) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn có muốn xóa sản phẩm không!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, tôi muốn!",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Xóa!",
            text: "Bạn đã xóa thành công.",
            icon: "success",
          });
          await deleteProduct(ma);
          fetchData();
        } catch (error) {
          console.error(error.response.data.message);
        }
      }
    });
  };

  const handleFilter = () => {
    fetchData();
  };

  return (
    <div className="p-4">
      <div className="mb-5">
        <div className="row">
          <div className="col-3 mb-3">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Thêm
            </Button>
          </div>
          <div className="col-9">
            <div class="input-group  mb-3">
              <span class="input-group-text" id="basic-addon1">
                Tìm kiếm
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Tên sản phẩm ..."
                aria-label="Username"
                // name="name"
                value={formSearch.name}
                onChange={handleSearch}
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3 mb-3"></div>
          <div className="col-9">
            <div className="row">
              <div className="col-6">
                <div class="input-group  mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    Ngày bắt đầu
                  </span>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Tên sản phẩm ..."
                    aria-label="Username"
                    name="startDate"
                    value={formSearch.startDate}
                    onChange={handleSearch}
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="input-group  mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    Ngày kết thúc
                  </span>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Tên sản phẩm ..."
                    aria-label="Username"
                    name="endDate"
                    value={formSearch.endDate}
                    onChange={handleSearch}
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              {/* <div className="col-4">
                <button className="btn btn-dark" onClick={handleFilter}>
                  Lọc
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <FormModel
          show={modalShow}
          onChange={handleChange2}
          type="Thêm"
          text="Thêm sản phẩm"
          add={() => handleAddDiaChi()}
          onHide={() => setModalShow(false)}
          errorMessage={
            <>
              {errors.name && (
                <p className="text-danger font-monospace">
                  {errors.name}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
          errorMessage1={
            <>
              {errors.price && (
                <p className="text-danger font-monospace">
                  {errors.price}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
          errorMessage2={
            <>
              {errors.quantity && (
                <p className="text-danger font-monospace">
                  {errors.quantity}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
          errorMessage3={
            <>
              {errors.status && (
                <p className="text-danger font-monospace">
                  {errors.status}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
        />

        <FormModel
          show={modalShowEdit}
          onChange={handleChange}
          name={formData.name}
          quantity={formData.quantity}
          status={formData.status}
          price={formData.price}
          type="Sửa"
          text="Sửa sản phẩm"
          add={() => handleUpdate(formData.id)}
          onHide={() => setModalShowEdit(false)}
          errorMessage={
            <>
              {errors.name && (
                <p className="text-danger font-monospace">
                  {errors.name}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
          errorMessage1={
            <>
              {errors.price && (
                <p className="text-danger font-monospace">
                  {errors.price}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
          errorMessage2={
            <>
              {errors.quantity && (
                <p className="text-danger font-monospace">
                  {errors.quantity}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
          errorMessage3={
            <>
              {errors.status && (
                <p className="text-danger font-monospace">
                  {errors.status}
                  <span className="font-bold italic mr-1">!</span>
                </p>
              )}
            </>
          }
        />
      </div>
      <div className="">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
              <th scope="col">CreateDate</th>
              <th scope="col">UpdateDate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataProduce &&
              dataProduce.map((item, index) => (
                <Table
                  item={item}
                  index={index}
                  show={() => handleDetail(item.id)}
                  show2={() => handleDelete(item.id)}
                />
              ))}
          </tbody>
        </table>
        <div className="mt-7 d-flex flex-column d-md-flex d-md-flex-row justify-content-center justify-content-md-between align-items-center">
          <Pagination>
            {formSearch.page > 1 && (
              <Pagination.First onClick={() => handlePageClick(1)} />
            )}
            {formSearch.page > 1 && (
              <Pagination.Prev
                onClick={() => handlePageClick(formSearch.page - 1)}
              />
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === formSearch.page}
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              )
            )}

            {formSearch.page < totalPages && (
              <Pagination.Next
                onClick={() => handlePageClick(formSearch.page + 1)}
              />
            )}
            {formSearch.page < totalPages && (
              <Pagination.Last onClick={() => handlePageClick(totalPages)} />
            )}
          </Pagination>
          {/* <NavPage
            totalPages={totalPages}
            page={formSearch.page}
            setPage={handlePageClick}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
