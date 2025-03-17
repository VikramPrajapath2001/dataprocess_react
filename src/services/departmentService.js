import axios from "axios";

const API_URL = "http://localhost:9001/api/departments";

export const getAllDepartments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const getDepartmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department with ID ${id}:`, error);
    throw error;
  }
};

export const getDepartmentByNameAndCollegeId = async (name, collegeId) => {
  try {
    const response = await axios.get(`${API_URL}/${collegeId}/${name}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching department with name ${name} and college ID ${collegeId}:`,
      error
    );
    throw error;
  }
};

export const updateDepartmentName = async (id, name) => {
  try {
    const response = await axios.put(`${API_URL}/name/${id}`, { name });
    return response.data;
  } catch (error) {
    console.error(`Error updating department name with ID ${id}:`, error);
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting department with ID ${id}:`, error);
    throw error;
  }
};
