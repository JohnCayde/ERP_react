import { useState } from "react";
import * as maintenance from "../actions/MaintenanceAction";
import store from "../store";
import * as MaintenanceTypes from "../types/Maintenance";

import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

function MainInventory({
  inventory,
}: {
  inventory: Array<MaintenanceTypes.Item>;
}) {
  const columns = ["ID", "Name", "Stock"].map((field) => {
    return {
      field: field.toLowerCase(),
      headerName: field,
      flex: 0.3,
      type: ["Stock"].includes(field) ? "number" : "string",
      editable: false,
    };
  });

  const rows = inventory.map((item) => {
    const idcomp = item.id.split("-");
    return {
      ...item,
      id: idcomp[0],
    };
  });

  const [item, setItem] = useState(false);
  const [quantity, setQuantity] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [inv, setInv] = useState("");
  const [qty, setQty] = useState(0);

  const openItem = () => setItem(true);
  const closeItem = () => setItem(false);
  const openQuantity = () => setQuantity(true);
  const closeQuantity = () => setQuantity(false);

  const handleNewItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  };

  const addItem = () => {
    store.dispatch(maintenance.AddItem(newItemName));
    setNewItemName("");
    setItem(false);
  };

  const handleInv = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setInv(e.target.value);
  };

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(parseInt(e.target.value));
  };

  const adjItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    store.dispatch(maintenance.AdjustItem(inv, qty));
    setQuantity(false);
    setInv("");
    setQty(0);
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Inventory
        </Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Button sx={{ mr: 2 }} variant="contained" onClick={openItem}>
          New Item
        </Button>
        <Button sx={{ mx: 2 }} variant="contained" onClick={openQuantity}>
          Adjust Quantity
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      <Modal
        open={item}
        onClose={closeItem}
        aria-labelledby="new-modal-title"
        aria-describedby="new-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography
              id="new-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              New Item
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              （Maintenance personal store)
            </Typography>
          </Box>
          <Box>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              value={newItemName}
              onInput={handleNewItemName}
            />
          </Box>
          <Box display="flex" justifyContent="end">
            <Button sx={{ my: 2 }} variant="contained" onClick={addItem}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
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
              Adjust Stock Quantity
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              （Maintenance personal store to keep tools)
            </Typography>
          </Box>
          <Box sx={{ my: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="ItemLabel">Item</InputLabel>
              <Select
                labelId="ItemLabel"
                id="demo-simple-select"
                value={inv}
                label="Item"
                onChange={handleInv}
              >
                {inventory.map((itm, idx) => {
                  return (
                    <MenuItem value={itm.id} key={idx}>
                      {itm.name}
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
            <Button sx={{ mx: 2 }} variant="contained" onClick={adjItem}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default MainInventory;
