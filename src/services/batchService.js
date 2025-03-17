import axios from "axios";

const API_URL = "http://localhost:9001/api/batches";

export const getAllBatches = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching batches:", error);
    throw error;
  }
};

export const getBatchById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching batch with ID ${id}:`, error);
    throw error;
  }
};

export const getBatchesByDepartment = async (departmentId) => {
  try {
    const response = await axios.get(
      `${API_URL}/departments/${departmentId}/batches`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching batches for department with ID ${departmentId}:`,
      error
    );
    throw error;
  }
};

export const updateBatchStaffName = async (id, name) => {
  try {
    const response = await axios.put(`${API_URL}/staff/${id}`, { name });
    return response.data;
  } catch (error) {
    console.error(`Error updating batch staff name with ID ${id}:`, error);
    throw error;
  }
};

export const deleteStudentFromBatch = async (studentId, batchId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/batches/${batchId}/students/${studentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting student ${studentId} from batch ${batchId}:`,
      error
    );
    throw error;
  }
};

export const deleteBatch = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting batch with ID ${id}:`, error);
    throw error;
  }
};
