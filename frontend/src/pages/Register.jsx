import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = {
      username,
      password,
    };

    localStorage.setItem("crmUser", JSON.stringify(user));

    alert("Account Created Successfully!");

    navigate("/");
  };

  return (
    <Paper
      sx={{
        width: 400,
        margin: "80px auto",
        padding: 4,
      }}
    >
      <Typography variant="h4" mb={3}>
        Create Account
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
        onClick={register}
      >
        Create Account
      </Button>

      <Typography mt={2}>
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </Typography>
    </Paper>
  );
}