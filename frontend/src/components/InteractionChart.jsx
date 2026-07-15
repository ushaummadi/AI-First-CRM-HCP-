import { useEffect, useState } from "react";
import api from "../api/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function InteractionChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/interactions/history");

      const count = {};

      res.data.forEach((item) => {
        count[item.interaction_type] =
          (count[item.interaction_type] || 0) + 1;
      });

      setChartData({
        labels: Object.keys(count),
        datasets: [
          {
            label: "Interactions",
            data: Object.values(count),
            backgroundColor: [
              "#1976d2",
              "#2e7d32",
              "#f57c00",
              "#9c27b0",
            ],
            borderRadius: 6,
            maxBarThickness: 45,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 1, fontWeight: 600 }}
      >
        Interaction Analytics
      </Typography>

      <div
        style={{
          height: "120px",
        }}
      >
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </Paper>
  );
}