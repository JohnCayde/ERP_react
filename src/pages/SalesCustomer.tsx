import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as Sale from "../actions/SaleAction";
import store from "../store";
import * as SaleTypes from "../types/Sale";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

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

function SalesCustomer({
  customers,
}: {
  customers: Array<SaleTypes.CustomerModel>;
}) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [activeCustomer, setActiveCustomer] = useState<
    SaleTypes.CustomerModel | undefined
  >(undefined);
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const customerId = e.currentTarget.value;
    const cust = customers.find((customer) => customer.id === customerId);
    setActiveCustomer(cust);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveCustomer(undefined);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const addCustomer = () => {
    const customer = {
      name,
      phone,
      email,
    };
    store.dispatch(Sale.AddCustomer(customer));
  };

  const delCustomer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const customerId = e.currentTarget.value;
    store.dispatch(Sale.DelCustomer(customerId));
  };

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 15 }}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Customer List
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （To add/remove customer profile from the list)
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Available Customer
          </Typography>
          <Demo>
            <List>
              {customers.map((customer, idx) => {
                return (
                  <ListItem
                    sx={{ border: "solid 2px" }}
                    key={idx}
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          value={customer.id}
                          onClick={handleOpen}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          value={customer.id}
                          onClick={delCustomer}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText primary={customer.name} />
                  </ListItem>
                );
              })}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={7}>
          <Box width="100%" marginTop={12} padding={1}>
            <TextField
              fullWidth
              id="CustomerName"
              label={`Customer Name`}
              variant="outlined"
              onInput={handleName}
              value={name}
            />
          </Box>
          <Box width="100%" marginTop={1} padding={1}>
            <TextField
              fullWidth
              id="CustomerPhone"
              label={`Phone`}
              variant="outlined"
              onInput={handlePhone}
              value={phone}
            />
          </Box>
          <Box width="100%" marginTop={1} padding={1}>
            <TextField
              fullWidth
              id="CustomerEmail"
              label={`Email`}
              variant="outlined"
              onInput={handleEmail}
              value={email}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" p={1}>
            <Button
              sx={{ mx: 1 }}
              variant="contained"
              color="warning"
              onClick={() => history.goBack()}
            >
              Back
            </Button>
            <Button sx={{ mx: 1 }} variant="contained" onClick={addCustomer}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ my: 1 }} variant="h6" component="div">
            Customer Details
          </Typography>
          <List>
            <ListItem sx={{ border: "solid 2px" }}>
              <ListItemText primary={`Name : ${activeCustomer?.name}`} />
            </ListItem>
            <ListItem sx={{ border: "solid 2px" }}>
              <ListItemText primary={`Phone : ${activeCustomer?.phone}`} />
            </ListItem>
            <ListItem sx={{ border: "solid 2px" }}>
              <ListItemText primary={`Email : ${activeCustomer?.email}`} />
            </ListItem>
          </List>
        </Box>
      </Modal>
    </Box>
  );
}

export default SalesCustomer;
