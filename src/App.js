import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css"

import NavigationBar from "./components/NavigationBar";
import DashboardView from "./views/DashboardView";
import CategoryView from "./views/CategoryView";
import AddCategoryView from "./views/AddCategoryView";
import EditCategoryView from "./views/EditCategoryView";
import ProductView from "./views/ProductView";
import AddProductView from "./views/AddProductView";
import EditProductView from "./views/EditProductView";


export default function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/categories" element={<CategoryView />} />
          <Route path="/addcategory" element={<AddCategoryView />} />
          <Route path="/editcategory/:catId" element={<EditCategoryView />} />
          <Route path="/products" element={<ProductView />} />
          <Route path="/addproduct" element={<AddProductView />} />
          <Route path="/editproduct/:idCat/:idProduct" element={<EditProductView />} />
          {/* <Route path="/login" element={<LoginView />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

