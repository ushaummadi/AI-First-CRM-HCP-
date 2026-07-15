import HCPList from "../components/HCPList";
import { Typography, Container } from "@mui/material";

export default function Doctors() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Doctors
      </Typography>

      <HCPList />
    </Container>
  );
}