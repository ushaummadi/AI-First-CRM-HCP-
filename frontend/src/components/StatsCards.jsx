import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function StatsCards() {

  const [stats, setStats] = useState({
    total_hcps: 0,
    total_interactions: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/stats/");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container spacing={1} mb={3}>
      <Grid item xs={6} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              👨‍⚕️ Total HCPs
            </Typography>

            <Typography variant="h6">
              {stats.total_hcps}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              📝 Total Interactions
            </Typography>

            <Typography variant="h6">
              {stats.total_interactions}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}