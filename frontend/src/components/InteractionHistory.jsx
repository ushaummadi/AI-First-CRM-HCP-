import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../api/api";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
export default function InteractionHistory() {
  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/interactions/");
      setRows(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteInteraction = async (id) => {
    if (!window.confirm("Delete this interaction?")) return;

    try {
      await api.delete(`/interactions/${id}`);
      loadHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (row) => {
    setSelectedId(row.id);
    setSummary(row.summary || "");
    setOpen(true);
  };

  const updateInteraction = async () => {
    try {
      await api.put(`/interactions/${selectedId}`, {
        summary: summary,
      });

      setOpen(false);
      loadHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "created_at", // or "date"
      headerName: "Date",
      width: 140,
      renderCell: (params) => (
        <span>
          {new Date(params.row.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      field: "interaction_type",
      headerName: "Type",
      width: 120,
    },
    {
      field: "summary",
      headerName: "Summary",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Product",
      width: 150,
    },
    {
      field: "sentiment",
      headerName: "Sentiment",
      width: 120,
    },
    {
      field: "next_action",
      headerName: "Next Action",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleEdit(params.row)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => deleteInteraction(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div style={{ height: 300, width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{ mb: 2 }}
          href="http://localhost:8000/interactions/export"
        >
          Export CSV
        </Button>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
                page: 0,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Interaction Summary</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={updateInteraction}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}