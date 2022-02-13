import React, { useState } from "react";
import * as fgStore from "../actions/StoreAction";
import store from "../store";
import { useHistory } from "react-router-dom";
import * as StoreTypes from "../types/Store";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function StoreFG2({
  transaction,
  finsihGoodStore,
}: {
  transaction: Array<StoreTypes.TransactionModel>;
  finsihGoodStore: Array<StoreTypes.FinishGoodModel>;
}) {
  const pendingTransaction = transaction.filter(
    (item) => item.status == "pending"
  );
  const history = useHistory();

  const columns = ["ID", "Name", "Stock"].map((field) => {
    return {
      field: field.toLowerCase(),
      headerName: field,
      flex: 0.3,
      type: ["Stock"].includes(field) ? "number" : "string",
      editable: false,
    };
  });
  const rows = finsihGoodStore.map((item) => {
    const idcomp = item.id.split("-");
    return {
      id: idcomp[0],
      name: item.name,
      stock: item.stock,
    };
  });

  const [quantity, setQuantity] = useState(false);
  const [finishGood, setFinishGood] = useState("");
  const [qty, setQty] = useState(0);

  const openQuantity = () => setQuantity(true);
  const closeQuantity = () => setQuantity(false);

  const handleFinishGood = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setFinishGood(e.target.value);
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(parseInt(e.target.value));
  };

  const adjFinishGood = () => {
    store.dispatch(fgStore.AdjustFinishGood(finishGood, qty));
    setQuantity(false);
    setFinishGood("");
    setQty(0);
  };

  const receiveFG = (e: React.MouseEvent<HTMLButtonElement>) => {
    const reqId = e.currentTarget.value;
    store.dispatch(fgStore.ComTransaction(reqId));
  };

  return (
    <Box sx={{ mt: 20, flexGrow: 1 }}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Finish Good Store
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          (Monitor and receive finish good store)
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            fullWidth
            color="warning"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </Button>
          <List>
            {pendingTransaction.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Button
                      variant="contained"
                      value={item.id}
                      onClick={receiveFG}
                    >
                      Receive
                    </Button>
                  }
                >
                  <ListItemButton>
                    <ListItemText
                      primary={item.id.split("-")[0]}
                      secondary={item.name}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={6} sx={{ minHeight: "500px" }}>
          <Button
            sx={{ mb: 2 }}
            fullWidth
            variant="contained"
            onClick={openQuantity}
          >
            Adjust Quantity
          </Button>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
          <Modal
            open={quantity}
            onClose={closeQuantity}
            aria-labelledby="quantity-modal-title"
            aria-describedby="quantity-modal-description"
          >
            <Box sx={style}>
              <Box>
                <Typography
                  id="quantity-modal-title"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Adjust Material Stock Quantity
                </Typography>
              </Box>
              <Box sx={{ my: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="MaterialLabel">Material</InputLabel>
                  <Select
                    labelId="MaterialLabel"
                    id="demo-simple-select"
                    value={finishGood}
                    label="Material"
                    onChange={handleFinishGood}
                  >
                    {finsihGoodStore.map((item, idx) => {
                      return (
                        <MenuItem value={item.id} key={idx}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ my: 3 }}>
                <TextField
                  fullWidth
                  id="quantity-basic"
                  label="Quantity"
                  variant="outlined"
                  value={qty}
                  onInput={handleQty}
                />
              </Box>
              <Box display="flex" justifyContent="end">
                <Button
                  sx={{ mx: 2 }}
                  variant="contained"
                  onClick={adjFinishGood}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StoreFG2;
