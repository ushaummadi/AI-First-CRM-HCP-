import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <Box display="flex">
      <Sidebar />

      <Box sx={{ flex: 1 }}>

        <Navbar />

        <Box p={4}>
          {children}
        </Box>

      </Box>

    </Box>
  );
}