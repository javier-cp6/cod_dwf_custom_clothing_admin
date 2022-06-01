import { useState, useEffect } from "react"
import { getCategories } from "../services/categoryService";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { deleteCategory } from "../services/categoryService";

export default function CategoryView() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const getCategoriesData = async () => {
    try {
      const categoriesArr = await getCategories(page, limit);
      setCategories([...categories, ...categoriesArr]);
    } catch (error) {
      throw error;
    }
  };

  const viewMore = () => {
    setPage(page + 1)
  }

  const manageDelete = async (catId, cat_name) => {
    try {
      const confirmation = await Swal.fire({
        title: `Click ok to permanently delete the "${cat_name}" category?`,
        showCancelButton: true,
        confirmButtonText: 'Ok, delete',
        cancelButtonText: `No, cancel`,
      })
      if(confirmation.isConfirmed){
        setPage(0)
        setCategories([])
        await deleteCategory(catId)
        setPage(1)
        Swal.fire({
          icon: "success",
          title: "Category deleted!",
        });
        setPage(1)
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getCategoriesData();
  }, [page]);

  if(categories.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between text-center">
        <h1 className="mb-4 text-center">Categories</h1>
        <Link className="btn btn-dark" to="/addcategory">Add</Link>
      </div>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Item</th>
            <th>Id</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>          
        </thead>
        <tbody>
          {categories.map((item, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{item.cat_id}</td>
              <td>{item.cat_name}</td>
              <td>{item.cat_desc}</td>
              <td>
                <Link to={`/editcategory/${item.cat_id}`} className="me-2">Edit</Link>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => {manageDelete(item.cat_id, item.cat_name)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button className="btn btn-outline-success btn-sm" onClick={viewMore}>
          View more
        </button>
      </div>
    </div>
  )
}
