import { Typography, Container } from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import InteractionChart from "../components/InteractionChart";
import RecentActivity from "../components/RecentActivity";
import HCPList from "../components/HCPList";
import InteractionHistory from "../components/InteractionHistory";
import InteractionForm from "../components/InteractionForm";
import AIChat from "../components/AIChat";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <Container maxWidth="xl" sx={{ py: 2 }}>

          {/* Statistics */}
          <StatsCards />

          {/* Analytics */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontWeight: 600 }}
          >
            Interaction Analytics
          </Typography>

          <InteractionChart />

          {/* Recent Activity */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontWeight: 600 }}
          >
            Recent Activity
          </Typography>

          <RecentActivity />

          {/* Healthcare Professionals */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontWeight: 600 }}
          >
            Healthcare Professionals
          </Typography>

          <HCPList />

          {/* Previous Interactions */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontWeight: 600 }}
          >
            Previous Interactions
          </Typography>

          <InteractionHistory />

          {/* Log Interaction */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontWeight: 600 }}
          >
            Log Interaction
          </Typography>

          <InteractionForm />

          {/* AI Assistant */}
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 1, fontWeight: 600 }}
          >
            AI Assistant
          </Typography>

          <AIChat />

        </Container>
      </div>
    </div> 
  );
}