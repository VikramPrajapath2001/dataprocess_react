import axios from "axios";

const API_URL = "http://localhost:9001/api/colleges";

export const getAllColleges = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    throw error;
  }
};

export const getCollegeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching college with ID ${id}:`, error);
    throw error;
  }
};

export const createCollege = async (college) => {
  try {
    const response = await axios.post(API_URL, college);
    return response.data;
  } catch (error) {
    console.error("Error creating college:", error);
    throw error;
  }
};

export const updateCollegeName = async (id, name) => {
  try {
    const response = await axios.put(`${API_URL}/name/${id}`, { name });
    return response.data;
  } catch (error) {
    console.error(`Error updating college name with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCollege = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting college with ID ${id}:`, error);
    throw error;
  }
};
