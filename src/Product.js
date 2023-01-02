import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { config } from "./config";

function Product() {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [productId, setProductId] = useState(null);

  const fetchData = async () => {
    try {
      const products = await axios.get(`${config.api}/products`
      , {
        headers: {
          Authorization: localStorage.getItem("myreact "),
        },
      }
      );
      //  alert("hello");
      console.log(products);
      setProductList(products.data);
    } catch (error) {
      alert("something went wrong");
    }
  };
  useEffect(() => {
    // console.log("hello");

   

    fetchData();
  }, []);

  // console.log(productList);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },
    onSubmit: async (values) => {
      try {
        if (!isEdit) {
          const product = await axios.post(`${config.api}/product`, values, {
            headers: {
              Authorization: localStorage.getItem("myreact"),
            },
          });
          setProductList([...productList, { ...values, _id: product.data.id }]);
          formik.resetForm();
        } else {
          await axios.put(`${config.api}/product/${productId}`, values, {
            headers: {
              Authorization: localStorage.getItem("myreact"),
            },
          });
          const pIndex = productList.findIndex((p) => p._id == productId);
          productList[pIndex] = values;
          setProductList([...productList]);
          formik.resetForm();
          setEdit(false);
        }
      } catch (error) {
        alert("something went wrong");
      }
    },
  });
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${config.api}/product/${id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      const pIndex = productList.findIndex((p) => p.id == id);
      productList.splice(pIndex, 1);
      setProductList([...productList]);
    } catch (error) {
      // console.log(error.response.data.message)
      alert(error.response.data.message);
    }
  };
  const editProduct = async (id) => {
    try {
      const product = await axios.get(`${config.api}/product/${id}`, {
        headers: {
          Authorization: localStorage.getItem("myreact"),
        },
      });
      formik.setValues(product.data);
      setProductId(id);
      setEdit(true);
    } catch (error) {
      alert("something went wrong");
    }
  };
  const logout = () => {
    localStorage.removeItem("myreact");
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-right ">
          <button className="btn btn-danger" onClick={logout}>
            logout
          </button>
        </div>
        <div className="col-lg-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <label>Name</label>
                <input
                  type={"text"}
                  className="form-control"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-lg-6">
                <label>Price</label>
                <input
                  type={"text"}
                  className="form-control"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-lg-6">
                <input
                  type={"submit"}
                  value={isEdit ? "Update" : "Submit"}
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => {
                return (
                  <tr>
                    <th scope="row">{product._id}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        onClick={() => editProduct(product._id)}
                        className="btn btn-info btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
