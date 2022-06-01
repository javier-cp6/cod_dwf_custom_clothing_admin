import axios from "axios"

const URL = process.env.REACT_APP_API

const getProduct = async (catId, prodId) => {
    try {
        const endpoint = `${URL}/categories/${catId}/products/${prodId}`
        const { data, status } = await axios.get(endpoint)
        if(status === 200) return data
        throw Error("Failed to get data")
    } catch (error) {
        throw error
    }
}

const addProduct = async (product) => {
    try {
      const headers = {
        "Content-type": "application/json",
      };
      const endpoint = `${URL}/categories/${product.categoryId}/products`;
      const { data, status } = await axios.post(endpoint, product, { headers });
      if (status === 201) {
        return data;
      } else {
        throw Error("Failed to add product");
      }
    } catch (error) {
      throw error;
    }
  };
  
  const editProduct = async (catId, prodId, product) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const endpoint = `${URL}/categories/${catId}/products/${prodId}`;
      const { data, status } = await axios.put(endpoint, product, { headers });
      if (status === 200) {
        return data;
      } else {
        throw Error("Failed to update product");
      }
    } catch (error) {
      throw error;
    }
  };
  
  const deleteProduct = async (catId, prodId) => {
    try {
      const endpoint = `${URL}/categories/${catId}/products/${prodId}`;
      const { status } = await axios.delete(endpoint);
      if (status === 200) {
        return "ok";
      } else {
        return Error("Failed to delete product");
      }
    } catch (error) {
      return error;
    }
  };

export {
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
}