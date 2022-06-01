import {useEffect, useState, useRef} from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import Swal from 'sweetalert2';

import { editProduct, getProduct } from '../services/productService';
// import {uploadFile} from "../config/fireStorage"

export default function EditProductView() {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { catId, prodId } = useParams()

  const navigate = useNavigate();

  const manageInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const manageSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // const savedFile = await uploadFile(file)

      await editProduct(catId, prodId, { ...inputs });
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Product updated!",
      });

      navigate("/products");
    } catch (error) {
      setLoading(false);
      // Swal
      console.log(error);
    }
  };

  // const validateInputs = () => {
  //     if(inputs.lug_nom.trim() === "" ||
  //     inputs.lug_desc.trim() === "" ||
  //     inputs.lug_dir.trim() === ""){
  //     // si es true (inputs vacíos), retorna true
  //     // se se ejecuta un return, finaliza la función
  //     return true
  //     }
  //     return false
  // }

  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true);
        const productData = await getProduct(catId, prodId);
        setInputs(productData);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    getProductData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-3">Edit Product</h1>
      <form
        onSubmit={(e) => {
          manageSubmit(e);
        }}
      >
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            placeholder="Introduce category id"
            className="form-control"
            name="categoryId"
            value={inputs.categoryId || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="Introduce product name"
            className="form-control"
            name="prod_name"
            value={inputs.prod_name || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Type
          </label>
          <input
            type="text"
            placeholder="Introduce product type"
            className="form-control"
            name="prod_type"
            value={inputs.prod_type || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>
        {/* <div>sizes checkbox</div> */}
        {/* <div>colors checkbox</div> */}
        <div className="mb-3">
          <label className="form-label">
            Price
          </label>
          <input
            type="number"
            placeholder="Introduce product price"
            className="form-control"
            name="prod_price"
            value={inputs.prod_price || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Topic
          </label>
          <input
            type="text"
            placeholder="Introduce a topic for the product"
            className="form-control"
            name="prod_topic"
            value={inputs.prod_topic || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Designer
          </label>
          <input
            type="text"
            placeholder="Introduce designer nickname"
            className="form-control"
            name="prod_designer"
            value={inputs.prod_designer || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            placeholder="Introduce image url"
            className="form-control"
            name="prod_img"
            value={inputs.prod_img  || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>

        {/* <div className="mb-3">
                    <label className="form-label">
                        Upload an image
                    </label>
                    <input 
                        type="file" className="form-control"
                        ref={inputFile}
                        onChange={(e) => {manejarFile(e)} } />
                </div> */}

        <button
          className="btn btn-primary"
          type="submit"
          // disabled={existeErrorInputs()}
        >
          Save
        </button>

        <Link to="/products" className="btn btn-primary ms-3">
          Cancel
        </Link>
      </form>
    </div>
  );
}
