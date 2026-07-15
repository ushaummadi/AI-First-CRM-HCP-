import { useEffect, useState } from "react";
import api from "../api/api";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  TextField,
} from "@mui/material";

export default function HCPList() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await api.get("/hcp");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TextField
        fullWidth
        label="Search Doctor"
        variant="outlined"
        sx={{ mb: 1 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={2}>
        {filteredDoctors.map((doctor) => (
          <Grid item xs={12} md={6} lg={3} key={doctor.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h9">
                    {doctor.name}
                </Typography>

                <Typography color="text.secondary">
                  {doctor.speciality}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  {doctor.hospital}
                </Typography>

                <Typography color="text.secondary">
                  {doctor.city}
                </Typography>

                <Chip
                  label="Active"
                  color="success"
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}