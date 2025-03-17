import axios from "axios";

const API_URL = "http://localhost:9001/api/students";

export const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    throw error;
  }
};

export const updateStudentName = async (id, name) => {
  try {
    const headers = { "Content-Type": "application/json" };
    const response = await axios.put(
      `${API_URL}/name/${id}`,
      { name },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating student name with ID ${id}:`, error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with ID ${id}:`, error);
    throw error;
  }
};
