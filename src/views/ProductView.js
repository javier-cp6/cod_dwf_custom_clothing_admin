import { useState, useEffect } from "react"
import { getCategories } from "../services/categoryService";
import { Link } from "react-router-dom";

export default function ProductView() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const getCategoriesData = async () => {
    try {
      const categoriesArr = await getCategories(page, limit);
      const filtCategories = categoriesArr.filter((item) => item.products.length > 0)
      const productsArr = filtCategories.map((item) => item.products).flat()
      setProducts([...products, ...productsArr]);
    } catch (error) {
      throw error;
    }
  };

  const viewMore = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    getCategoriesData();
  }, [page]);

  if(products.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between text-center">
        <h1 className="mb-4 text-center">Products</h1>
        <Link className="btn btn-dark" to="/addproduct">Add</Link>
      </div>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Item</th>
            <th>Cat Id</th>
            <th>Product</th>
            <th>Id</th>
            <th>Type</th>
            <th>Sizes</th>
            <th>Colors</th>
            <th>Price</th>
            <th>Topic</th>
            <th>Designer</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>          
        </thead>
        <tbody>
          {products.map((item, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{item.categoryId}</td>
              <td>{item.prod_name}</td>
              <td>{item.prod_id}</td>
              <td>{item.prod_type}</td>
              <td>
                {item.prod_size.map((size, i) => (
                  <span key={i}>  {size}</span>
                ))}
              </td>
              <td>
                {item.prod_color.map((color, i) => (
                  <span key={i}>  {color}</span>
                ))}
              </td>
              <td>{item.prod_price}</td>
              <td>{item.prod_topic}</td>
              <td>{item.prod_designer}</td>
              <td><img className="table-img" src={item.prod_img}></img></td>
              <td>
                <Link to={`/editproduct/${item.categoryId}/${item.prod_id}`} className="me-2">Edit</Link>
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