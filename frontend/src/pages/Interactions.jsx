import { Typography, Container } from "@mui/material";
import InteractionHistory from "../components/InteractionHistory";
import InteractionForm from "../components/InteractionForm";

export default function Interactions() {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Interactions
      </Typography>

      <InteractionHistory />

      <br />

      <InteractionForm />
    </Container>
  );
}