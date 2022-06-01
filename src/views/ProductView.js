import { useState, useEffect } from "react"
import { getCategories } from "../services/categoryService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProduct } from "../services/productService";

export default function ProductView() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

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

  const manageDelete = async (catId, prodId, prodName) => {
    try {
      const confirmation = await Swal.fire({
        title: `Click ok to permanently delete the "${prodName}" product?`,
        showCancelButton: true,
        confirmButtonText: 'Ok, delete',
        cancelButtonText: `No, cancel`,
      })
      if(confirmation.isConfirmed){
        setProducts([])
        await deleteProduct(catId, prodId)
        setPage(1)
        Swal.fire({
          icon: "success",
          title: "Product deleted!",
        });
      }
    } catch (error) {
      throw error
    }
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
                <button className="btn btn-danger btn-sm ms-2" onClick={() => {manageDelete(item.categoryId, item.prod_id, item.prod_name)}}>Delete</button>
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