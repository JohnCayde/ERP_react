import { useState } from "react";
import * as maintenance from "../actions/MaintenanceAction";
import store from "../store";
import * as MaintenanceTypes from "../types/Maintenance";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type NewMode = {
  mode: "new";
  request: MaintenanceTypes.MRequest & {
    no: string;
    sectionId: string;
  };
  open: boolean;
  handleClose: () => void;
  requests: Array<MaintenanceTypes.MRequest>;
};

type ReviewMode = {
  mode: "review";
  request: MaintenanceTypes.MRequest & {
    no: string;
  };
  open: boolean;
  handleClose: () => void;
  requests: Array<MaintenanceTypes.MRequest>;
};

type CompleteMode = {
  mode: "complete";
  request: MaintenanceTypes.MRequest & {
    no: string;
  };
  open: boolean;
  handleClose: () => void;
  requests: Array<MaintenanceTypes.MRequest>;
};

function ModalMainRequest({
  mode,
  request,
  open,
  handleClose,
  requests = [],
}: NewMode | ReviewMode | CompleteMode) {
  //state
  const [issue, setIssue] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: mode == "new" ? 800 : 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //function
  const handleIssue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssue(e.target.value);
  };

  const AddRequest = () => {
    const confirmation = confirm("Are you sure?");
    if (!confirmation) {
      handleClose();
      return;
    }

    const req: MaintenanceTypes.IncomingMRequest = {
      ...(request as NewMode["request"]),
      issue,
    };

    store.dispatch(maintenance.AddMRequest(req));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="issue-modal-title"
      aria-describedby="issue-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <List>
              {requests.map((req, index) => {
                return (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Typography variant="button" gutterBottom>
                        {req.status}
                      </Typography>
                    }
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={req.id.split("-")[0]}
                        secondary={req.issue}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={mode == "new" ? 6 : 12}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {mode == "new" ? "New Maintenance" : "Maintenance Details"}
            </Typography>
            {mode != "new" && (
              <TextField
                fullWidth
                disabled
                sx={{ my: 2 }}
                id="no-disabled"
                label="No"
                defaultValue={request.no}
              />
            )}
            <TextField
              fullWidth
              disabled
              sx={{ my: 2 }}
              id="section-disabled"
              label="Section"
              defaultValue={request.section}
            />
            {mode == "new" ? (
              <TextField
                fullWidth
                sx={{ my: 2 }}
                id="issue-disabled"
                label="Issue"
                value={issue}
                onChange={handleIssue}
              />
            ) : (
              <TextField
                fullWidth
                disabled={true}
                sx={{ my: 2 }}
                id="issue-disabled"
                label="Issue"
                defaultValue={request.issue}
              />
            )}

            {request.remark && (
              <TextField
                fullWidth
                disabled
                sx={{ my: 2 }}
                id="remark-disabled"
                label="Remark"
                defaultValue={request.remark}
              />
            )}
            {mode == "new" && (
              <Box>
                <Button variant="contained" onClick={AddRequest}>
                  Submit
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalMainRequest;
