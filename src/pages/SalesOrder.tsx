import { useHistory } from "react-router-dom";
import { useState } from "react";
import * as Sale from "../actions/SaleAction";
import store from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as SaleTypes from "../types/Sale";
import { SelectChangeEvent } from "@mui/material";

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalSaleOrder from "../components/ModalSaleOrder";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function SalesOrder({ Assets }: { Assets: SaleTypes.SaleState }) {
  const history = useHistory();
  const products = useSelector((state: RootState) => state.engineer.products);
  const orders = Assets.salesOrder.map((order) => {
    const idComps = order.id.split("-");
    const customer = Assets.customers.find(
      (cust) => cust.id === order.customerId
    );
    const salesItems = order.items.map((item) => {
      const product = products.find((pdct) => pdct.id === item.itemId);
      return { name: product!.name, quantity: item.quantity };
    });

    return {
      id: order.id,
      orderNo: idComps[0],
      customer: customer!.name,
      items: salesItems,
    };
  });

  const [cust, setCust] = useState("");
  const [saleItemId, setSaleItemId] = useState("");
  const [saleItemName, setSaleItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [saleItems, setSaleItems] = useState<
    Array<{ itemId: string; name: string; quantity: number }>
  >([]);
  const [activeOrder, setActiveOrder] = useState<
    SaleTypes.DisplayOrder | undefined
  >(undefined);
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const orderId = e.currentTarget.value;
    const odr = orders.find((order) => order.id === orderId);
    if (!odr) {
      alert("No Order Found");
      return;
    }
    console.log("Hi2");
    setActiveOrder(odr);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveOrder(undefined);
  };

  const handleCustomer = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setCust(e.target.value);
  };

  const handleSaleItem = (e: SelectChangeEvent<string>) => {
    setSaleItemId(e.target.value);
    setSaleItemName(e.target.value);
    // setSaleItemName(e.target.text);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const addSaleItems = () => {
    const item = {
      itemId: saleItemId,
      name: saleItemName,
      quantity: quantity,
    };

    setSaleItems([...saleItems, item]);
    setSaleItemId("");
    setSaleItemName("");
    setQuantity(0);
  };

  const delSaleItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemId = e.currentTarget.value;
    const remainItems = saleItems.filter((item) => item.itemId !== itemId);
    setSaleItems(remainItems);
  };

  const addOrder = () => {
    const order = {
      customerId: cust,
      items: saleItems,
    };

    store.dispatch(Sale.AddOrder(order));
  };

  const delOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    store.dispatch(Sale.DelOrder(e.currentTarget.value));
  };

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 15 }}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Order list
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （To create sales order for each respective customer)
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Orders
          </Typography>
          <Demo>
            <List>
              {orders.map((order, idx) => {
                return (
                  <ListItem
                    sx={{ border: "solid 2px" }}
                    key={idx}
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          value={order.id}
                          onClick={handleOpen}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          value={order.id}
                          onClick={delOrder}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText primary={order.orderNo} />
                  </ListItem>
                );
              })}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={7}>
          <Box width="100%" padding={1}>
            <FormControl fullWidth>
              <InputLabel id="CustomerLabel">Customer</InputLabel>
              <Select
                labelId="CustomerLabel"
                id="demo-simple-select"
                value={cust}
                label="Customer"
                onChange={handleCustomer}
              >
                {Assets.customers.map((customer, idx) => {
                  return (
                    <MenuItem value={customer.id} key={idx}>
                      {customer.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box width="100%" padding={1}>
            <FormControl fullWidth>
              <InputLabel id="ItemLabel">Product</InputLabel>
              <Select
                labelId="ItemLabel"
                id="demo-simple-select"
                value={saleItemId}
                label="Item"
                onChange={handleSaleItem}
              >
                {products.map((product, idx) => {
                  return (
                    <MenuItem value={product.id} key={idx}>
                      {product.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box width="100%" padding={1} display="flex">
            <TextField
              sx={{ width: "80%" }}
              id="quantity"
              label={`Quantity`}
              variant="outlined"
              type="number"
              onInput={handleQuantity}
              value={quantity}
            />
            <Button
              sx={{ ml: 1, width: "20%" }}
              variant="contained"
              onClick={addSaleItems}
            >
              Add
            </Button>
          </Box>
          <Box width="100%" padding={1}>
            <List>
              {saleItems.map((item, idx) => {
                return (
                  <ListItem
                    sx={{ border: "solid 2px" }}
                    key={idx}
                    secondaryAction={
                      <Box>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          value={item.itemId}
                          onClick={delSaleItems}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={item.quantity}
                    />
                  </ListItem>
                );
              })}
            </List>
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
            <Button sx={{ mx: 1 }} variant="contained" onClick={addOrder}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ModalSaleOrder
        order={activeOrder}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}

export default SalesOrder;
