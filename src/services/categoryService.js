import axios from "axios"

const URL = process.env.REACT_APP_API;

const getCategories = async (page = 1, limit = 10) => {
    try {
        const { data, status } = await axios.get(`${URL}/categories?page=${page}&limit=${limit}`)
        if(status === 200) return data
        throw Error("Failed to get data")
        
    } catch (error) {
        throw error
    }
}

const getCategoryById = async (id) => {
    try {
        const { data, status } = await axios.get(`${URL}/categories/${id}`)
        if(status === 200) return data
        throw Error ("Failed to get data")
    } catch (error) {
        throw error
    }
}

export {
    getCategories,
    getCategoryById
}