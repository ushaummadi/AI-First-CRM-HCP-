import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import api from "../api/api";

const products = [
  "CardioPlus",
  "NeuroCare",
  "OrthoMax",
  "PediaSafe",
];

const types = [
  "Visit",
  "Phone Call",
  "Video Meeting",
  "Conference",
];

export default function InteractionForm() {
  const [doctors, setDoctors] = useState([]);

  const [doctor, setDoctor] = useState("");
  const [product, setProduct] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await api.get("/hcp");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveInteraction = async () => {
    if (!doctor || !product || !type || !date || !summary) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // Find selected doctor
      const selectedDoctor = doctors.find(
        (d) => d.name === doctor
      );

      await api.post("/interactions", {
        hcp_id: selectedDoctor.id,
        interaction_type: type,
        summary: summary,
        products: product,
        sentiment: "Positive",
        next_action: "",
      });

      toast.success("Interaction Saved");

      setDoctor("");
      setProduct("");
      setType("");
      setDate("");
      setSummary("");

      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Failed to save interaction");
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Log Interaction
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            size="small"
            label="Doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            {doctors.map((d) => (
              <MenuItem key={d.id} value={d.name}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            size="small"
            label="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            {products.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            size="small"
            label="Interaction Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            label="Interaction Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            size="small"
            onClick={saveInteraction}
          >
            Save Interaction
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}