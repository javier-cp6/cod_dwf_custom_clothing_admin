import axios from "axios";
import Swal from "sweetalert2";

const URL = process.env.REACT_APP_API;

const getCategories = async (page = 1, limit = 10) => {
  try {
    const { data, status } = await axios.get(
      `${URL}/categories?page=${page}&limit=${limit}`
    );
    if (status === 200) return data;
    throw Error("Failed to get data");
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const { data, status } = await axios.get(`${URL}/categories/${id}`);
    if (status === 200) return data;
    throw Error("Failed to get data");
  } catch (error) {
    throw error;
  }
};

const addCategory = async (category) => {
  try {
    const headers = {
      "Content-type": "application/json",
    };
    const endpoint = `${URL}/categories`;
    const { data, status } = await axios.post(endpoint, category, { headers });
    if (status === 201) {
      Swal.fire({
        icon: "success",
        title: "Category added!",
      });
      return data;
    } else {
      throw Error("Failed to add category");
    }
  } catch (error) {
    throw error;
  }
};

const editCategory = async (catId, category) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const endpoint = `${URL}/categories/${catId}`;
    const { data, status } = await axios.put(endpoint, category, { headers });
    if (status === 200) {
      Swal.fire({
        icon: "success",
        title: "Category updated!",
      });
      return data;
    } else {
      throw Error("Failed to update category");
    }
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (catId) => {
  try {
    const endpoint = `${URL}/categories/${catId}`;
    const { status } = await axios.delete(endpoint);
    if (status === 200) {
      return "ok";
    } else {
      return Error("Failed to delete category");
    }
  } catch (error) {
    return error;
  }
};

export {
  getCategories,
  getCategoryById,
  addCategory,
  editCategory,
  deleteCategory,
};
