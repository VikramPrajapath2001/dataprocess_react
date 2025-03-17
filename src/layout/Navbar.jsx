import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #FF5722, #808080)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Data Processor
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button color="inherit" component={RouterLink} to="/colleges">
            Colleges
          </Button>
          <Button color="inherit" component={RouterLink} to="/upload">
            Upload JSON
          </Button>
          <Button color="inherit" component={RouterLink} to="/overview">
            Overview
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
