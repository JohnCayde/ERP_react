import { useState } from "react";
import { useSelector } from "react-redux";
import * as Sale from "../actions/SaleAction";
import * as production from "../actions/ProductionAction";
import store from "../store";
import { RootState } from "../store";
import * as ProductionTypes from "../types/Production";

import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";

import ModalSaleOrder from "../components/ModalSaleOrder";

function ProdConSales() {
  const engineer = useSelector((state: RootState) => state.engineer);
  const sales = useSelector((state: RootState) => state.sales);

  const products = engineer.products;
  const newSalesOrder = sales.salesOrder
    .filter((order) => order.status === "pending")
    .map((order) => {
      const code = order.id.split("-");
      const customerProfile = sales.customers.find(
        (customer) => customer.id === order.customerId
      );
      const items = order.items.map((item) => {
        const itemProfile = products.find(
          (product) => product.id === item.itemId
        );
        return {
          ...item,
          name: itemProfile!.name,
        };
      });

      return {
        ...order,
        code: code[0],
        customer: customerProfile?.name,
        items,
      };
    });

  const reviewedSalesOrder = sales.salesOrder
    .filter((order) => order.status === "reviewed")
    .map((order) => {
      const code = order.id.split("-");
      const customerProfile = sales.customers.find(
        (customer) => customer.id === order.customerId
      );
      const items = order.items.map((item) => {
        const itemProfile = products.find(
          (product) => product.id === item.itemId
        );
        return {
          ...item,
          name: itemProfile!.name,
        };
      });

      return {
        ...order,
        code: code[0],
        customer: customerProfile?.name,
        items,
      };
    });

  const [activeOrder, setActiveOrder] = useState<
    | {
        code: string;
        customer: string | undefined;
        items: {
          name: string;
          itemId: string;
          quantity: number;
        }[];
        customerId: string;
        id: string;
        status: "pending" | "reviewed";
      }
    | undefined
  >(undefined);
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const orderId = e.currentTarget.value;
    const index = newSalesOrder.findIndex((order) => order.id === orderId);
    const odr =
      index === -1
        ? reviewedSalesOrder.find((order) => order.id === orderId)
        : newSalesOrder[index];
    if (!odr) {
      alert("No Order Found");
      return;
    }
    console.log("Hi1");
    setActiveOrder(odr);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveOrder(undefined);
  };

  const revOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    const orderId = e.currentTarget.value;
    store.dispatch(Sale.RevOrder(orderId));

    const order = newSalesOrder.find((odr) => odr.id === orderId);

    const components: Array<ProductionTypes.NewComponent> = order!.items.map(
      (item) => {
        const procedure = engineer.procedures.find(
          (procdure) => procdure.name === item.name
        );
        const process = procedure!.processes.map((prs) => {
          return {
            process: prs.id,
            complete: false,
            machine: "",
          };
        });
        return {
          quantity: item.quantity,
          productId: item.itemId,
          name: item.name!,
          status: "completed",
          process,
        };
      }
    );

    store.dispatch(production.AddComponent(components));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Sales Order
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （Convert sales order into component that require based on the
          production status or product stock level)
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                New Sales Orders
              </ListSubheader>
            }
          >
            {newSalesOrder.map((order, index) => {
              return (
                <ListItem
                  sx={{ border: "solid 1px" }}
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        value={order.id}
                        onClick={revOrder}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        value={order.id}
                        onClick={handleOpen}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={order.code}
                    secondary={order.customer}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Reviewed Sales Orders
              </ListSubheader>
            }
          >
            {reviewedSalesOrder.map((order, index) => {
              return (
                <ListItem
                  sx={{ border: "solid 1px" }}
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      value={order.id}
                      onClick={handleOpen}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={order.code}
                    secondary={order.customer}
                  />
                </ListItem>
              );
            })}
          </List>
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

export default ProdConSales;
