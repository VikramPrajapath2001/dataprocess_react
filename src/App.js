import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import CollegeList from "./components/CollegeList";
import DepartmentList from "./components/DepartmentList";
import BatchList from "./components/BatchList";
import StudentList from "./components/StudentList";
import FileUpload from "./components/FileUpload";
import Overview from "./components/Overview";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default route to Overview */}
          <Route path="/" element={<Overview />} />

          {/* Routes for individual components */}
          <Route path="/colleges" element={<CollegeList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/batches" element={<BatchList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/overview" element={<Overview />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
