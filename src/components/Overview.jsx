import React, { useState, useEffect } from "react";
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
  TextField,
  Box,
} from "@mui/material";
import { getAllColleges } from "../services/collegeService";
import { getAllDepartments } from "../services/departmentService";
import { getAllBatches } from "../services/batchService";
import { getAllStudents } from "../services/studentService";

const Overview = () => {
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesData, departmentsData, batchesData, studentsData] =
          await Promise.all([
            getAllColleges(),
            getAllDepartments(),
            getAllBatches(),
            getAllStudents(),
          ]);

        setColleges(collegesData);
        setDepartments(departmentsData);
        setBatches(batchesData);
        setStudents(studentsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredColleges = () => {
    return colleges.filter((college) =>
      college.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredDepartments = () => {
    return departments.filter((department) =>
      department.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredBatches = () => {
    return batches.filter((batch) =>
      batch.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredStudents = () => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Box sx={{ mt: 4 }}>
        {/* Colleges Table */}
        <Typography variant="h5" gutterBottom>
          Colleges
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.dark" }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>College Name</TableCell>
                <TableCell sx={{ color: "white" }}>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredColleges().map((college) => (
                <TableRow key={college.id}>
                  <TableCell>{college.id}</TableCell>
                  <TableCell>{college.name}</TableCell>
                  <TableCell>{college.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Departments Table */}
        <Typography variant="h5" gutterBottom>
          Departments
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.dark" }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Department Name</TableCell>
                <TableCell sx={{ color: "white" }}>HOD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDepartments().map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.hod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Batches Table */}
        <Typography variant="h5" gutterBottom>
          Batches
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.dark" }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Batch Name</TableCell>
                <TableCell sx={{ color: "white" }}>Staff Name</TableCell>
                <TableCell sx={{ color: "white" }}>Capacity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBatches().map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>{batch.id}</TableCell>
                  <TableCell>{batch.name}</TableCell>
                  <TableCell>{batch.staffName}</TableCell>
                  <TableCell>{batch.capacity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Students Table */}
        <Typography variant="h5" gutterBottom>
          Students
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.dark" }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Student Name</TableCell>
                <TableCell sx={{ color: "white" }}>Date of Birth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents().map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.dateOfBirth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Overview;
