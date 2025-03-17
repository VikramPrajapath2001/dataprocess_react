import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import { updateStudentName, deleteStudent } from "../services/studentService";
import {
  getAllBatches,
  getBatchesByDepartment,
} from "../services/batchService";

const BatchList = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: departmentId } = useParams();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        let data;
        if (departmentId) {
          data = await getBatchesByDepartment(departmentId);
        } else {
          data = await getAllBatches();
        }
        setBatches(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch batches");
        setLoading(false);
      }
    };

    fetchBatches();
  }, [departmentId]);

  const handleUpdateStudent = async (studentId) => {
    const newName = prompt("Enter new name for the student:");
    if (newName) {
      try {
        await updateStudentName(studentId, newName);
        alert("Student name updated successfully");
        refreshBatches();
      } catch (err) {
        alert("Failed to update student name.");
      }
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(studentId);
        alert("Student deleted successfully");
        refreshBatches();
      } catch (err) {
        alert("Failed to delete student.");
      }
    }
  };

  const refreshBatches = async () => {
    try {
      setLoading(true);
      let data;
      if (departmentId) {
        data = await getBatchesByDepartment(departmentId);
      } else {
        data = await getAllBatches();
      }
      setBatches(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to refresh batches");
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      {batches.length > 0 ? (
        batches.map((batch) => (
          <Card key={batch.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Batch: {batch.name}
              </Typography>
              <Typography variant="body1">
                Staff Name: {batch.staffName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Capacity: {batch.capacity}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {batch.students && batch.students.length > 0 ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Students:
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.dark" }}>
                          <TableCell sx={{ color: "white" }}>
                            Student ID
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            Student Name
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {batch.students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleUpdateStudent(student.id)}
                                sx={{ mr: 1 }}
                              >
                                Update
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <Typography>No students in this batch.</Typography>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No batches available.</Typography>
      )}
    </Container>
  );
};

export default BatchList;
