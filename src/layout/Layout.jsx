import React from "react";
import { Container } from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;
