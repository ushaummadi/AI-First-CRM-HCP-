import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const storedUser = JSON.parse(localStorage.getItem("crmUser"));

    if (
      storedUser &&
      username === storedUser.username &&
      password === storedUser.password
    ) {
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Paper
      sx={{
        width: 350,
        margin: "80px auto",
        padding: 4,
      }}
    >
      <Typography variant="h5" mb={2}>
        AI First CRM
      </Typography>

      <TextField
        fullWidth
        label="Username"
        margin="normal"
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={login}
      >
        Sign In
      </Button>

      <Typography mt={2}>
        Don't have an account?{" "}
        <Link to="/register">Create Account</Link>
      </Typography>
    </Paper>
  );
}