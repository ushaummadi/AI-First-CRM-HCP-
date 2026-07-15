import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";

import { NavLink } from "react-router-dom";

const drawerWidth = 260;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#0f172a",
          color: "#fff",
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton
          component={NavLink}
          to="/dashboard"
        >
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/doctors"
        >
          <ListItemIcon sx={{ color: "white" }}>
            <PeopleIcon />
          </ListItemIcon>

          <ListItemText primary="Doctors" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/interactions"
        >
          <ListItemIcon sx={{ color: "white" }}>
            <ChatIcon />
          </ListItemIcon>

          <ListItemText primary="Interactions" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}