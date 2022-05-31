import { useState, useEffect } from "react"
import { getCategories } from "../services/categoryService";
import { Link } from "react-router-dom";


export default function CategoryView() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const getCategoriesData = async () => {
    try {
      const categoriesArr = await getCategories(page, limit);
      setCategories([...categories, ...categoriesArr]);
    } catch (error) {
      console.log(error);
    }
  };

  const viewMore = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    getCategoriesData();
  }, [page]);

  if(categories.length === 0) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <h1 className="mb-4 text-center">Categories</h1>
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
                <button>Delete</button>
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
