import { useState } from 'react'
import { addCategory } from '../services/categoryService';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
// import {uploadFile} from "../config/fireStorage"

export default function AddCategoryView() {
  const [inputs, setInputs] = useState({});

  const [loading, setLoading] = useState(false);

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

      await addCategory({ ...inputs });
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Category added!",
      });
      navigate("/categories");
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-3">Add Category</h1>
      <form
        onSubmit={(e) => {
          manageSubmit(e);
        }}
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="Introduce category name"
            className="form-control"
            name="cat_name"
            value={inputs.cat_name || ""}
            onChange={(e) => {
              manageInputs(e);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Description
          </label>
          <input
            type="text"
            placeholder="Introduce a description for the category"
            className="form-control"
            name="cat_desc"
            value={inputs.cat_desc || ""}
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
            name="cat_img"
            value={inputs.cat_img  || ""}
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

        <Link to="/categories" className="btn btn-primary ms-3">
          Cancel
        </Link>
      </form>
    </div>
  );
}
