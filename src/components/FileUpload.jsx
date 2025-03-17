import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Alert,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      setUploadStatus(null);
      setError(null);
    } else {
      setError("Please select a valid JSON file.");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post(
        "http://localhost:9001/api/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      setUploadStatus("File uploaded successfully!");
      setError(null);
      console.log("File uploaded successfully", response.data);
    } catch (err) {
      setError("Error uploading file. Please try again.");
      setUploadStatus(null);
      console.error("Error uploading file", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Upload JSON File
      </Typography>

      <Card sx={{ maxWidth: 500, width: "100%", p: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Choose File
              <input
                type="file"
                hidden
                accept=".json"
                onChange={handleFileChange}
              />
            </Button>

            {selectedFile && (
              <Typography variant="body1" sx={{ mb: 2 }}>
                Selected File: <strong>{selectedFile.name}</strong>
              </Typography>
            )}

            {isUploading && (
              <Box sx={{ width: "100%", mb: 2 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  Uploading: {uploadProgress}%
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              fullWidth
              sx={{ mb: 2 }}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>

            {uploadStatus && (
              <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
                {uploadStatus}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FileUpload;
