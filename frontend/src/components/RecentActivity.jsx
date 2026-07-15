import { useEffect, useState } from "react";
import api from "../api/api";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await api.get("/interactions/recent");
      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper sx={{ p: 1, mt: 1 }}>
      <Typography variant="h9" gutterBottom>
        Recent Activity
      </Typography>

      <List>
        {activities.map((item, index) => (
          <div key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.summary}
                secondary={`${item.interaction_type} • ${item.products}`}
              />
            </ListItem>

            {index !== activities.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
}