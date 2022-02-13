import { useState } from "react";
import * as matStore from "../actions/StoreAction";
import store from "../store";
import * as PurchaseTypes from "../types/Purchase";
import * as StoreTypes from "../types/Store";

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ModalMatRequest({
  mode,
  request,
  open,
  handleClose,
  requests = [],
  materials,
}: {
  mode: "new";
  request: {
    no?: string;
    section: string;
    sectionId: string;
    item: string;
    quantity: number;
  };
  open: boolean;
  handleClose: () => void;
  requests: Array<StoreTypes.MatRequestModel & { issue?: string }>;
  materials: Array<PurchaseTypes.Item>;
}) {
  //state
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState(0);
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
  const handleMaterial = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setMaterial(e.target.value);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const AddRequest = () => {
    const confirmation = confirm("Are you sure?");
    if (!confirmation) {
      handleClose();
      return;
    }

    if (material == "") {
      alert("Please select the material");
      return;
    }

    if (quantity == 0) {
      alert("Please fill in the quantity");
      return;
    }

    const req = {
      ...request,
      item: material,
      quantity: quantity,
    };

    store.dispatch(matStore.AddMatRequest(req));
    handleClose();
  };

  const completeRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmation = confirm("Are you sure?");
    if (!confirmation) {
      handleClose();
      return;
    }

    const requestId = (e.target as HTMLInputElement).value;
    store.dispatch(matStore.CompleteMatRequest(requestId));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <List>
              {requests.map((req, index) => {
                return (
                  <ListItem
                    key={index}
                    secondaryAction={
                      req.status != "reviewed" ? (
                        <Typography variant="button" gutterBottom>
                          {req.status}
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          value={req.id}
                          onClick={completeRequest}
                        >
                          Receive
                        </Button>
                      )
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
            <Typography variant="h6" component="h2" gutterBottom>
              {mode == "new"
                ? "New Material Request"
                : "Material Request Details"}
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
            {mode == "new" && (
              <FormControl sx={{ my: 2 }} fullWidth>
                <InputLabel id="demo-simple-select-label">Material</InputLabel>
                <Select
                  value={material}
                  label="Material"
                  onChange={handleMaterial}
                >
                  {materials.map((mat, index) => (
                    <MenuItem key={index} value={mat.id}>
                      {mat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {mode == "new" ? (
              <TextField
                fullWidth
                sx={{ my: 2 }}
                type="number"
                label="Quantity"
                value={quantity}
                onChange={handleQuantity}
              />
            ) : (
              <TextField
                fullWidth
                disabled
                sx={{ my: 2 }}
                type="number"
                label="Quantity"
                defaultValue={request.quantity}
              />
            )}
            {mode == "new" && (
              <Box sx={{ my: 2 }}>
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

export default ModalMatRequest;
