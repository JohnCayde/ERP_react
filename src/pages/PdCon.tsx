import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

import ProdConDashBoard from "./ProdConDashBoard";
import ProdConSales from "./ProdConSales";
import ProdConPlanning from "./ProdConPlanning";
import ProdConMonitor from "./ProdConMonitor";

const drawerWidth = 240;

function PdCon() {
  const match = useRouteMatch();
  const store = useSelector((state: RootState) => state.store);
  const production = useSelector((state: RootState) => state.production);
  const engineer = useSelector((state: RootState) => state.engineer);

  const productionComponent = production.components.filter(
    (component) => component.status == "pending"
  );
  const completedComponent = production.components.filter(
    (component) => component.status == "completed"
  );

  const processing = completedComponent.filter((component) => {
    const processed = component.process.some((prs) => prs.complete == true);
    const completelyNew = component.process.every(
      (prs) => prs.complete == false
    );
    return processed && !completelyNew;
  });

  const pending = completedComponent.filter((component) => {
    return component.process.every((prs) => prs.complete == false);
  });
  const prodStock = store.transaction.filter(
    (component) => component.status == "pending"
  );
  const stock = store.transaction.filter(
    (component) => component.status == "received"
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h4" gutterBottom component="div" align="center">
            Production Control
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <Link
            to={`${match.url}`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <ListItemButton>
              <ListItemText primary="Sales Order" />
            </ListItemButton>
          </Link>
          <Link
            to={`${match.url}/planning`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <ListItemButton>
              <ListItemText primary="Planning" />
            </ListItemButton>
          </Link>
          <Link
            to={`${match.url}/monitor`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <ListItemButton>
              <ListItemText primary="Monitor" />
            </ListItemButton>
          </Link>
          <Link to={""} style={{ textDecoration: "none", width: "100%" }}>
            <ListItemButton sx={{ backgroundColor: "#EEC989" }}>
              <ListItemText primary="Back" />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          pt: 12,
        }}
      >
        <ProdConDashBoard
          products={engineer.products}
          pending={pending}
          processing={[...productionComponent, ...processing]}
          prodStock={prodStock}
          stock={stock}
        />
        <Toolbar />

        <Switch>
          <Route exact path={`${match.path}/monitor`}>
            <ProdConMonitor
              sections={production.sections}
              components={production.components}
            />
          </Route>
          <Route exact path={`${match.path}/planning`}>
            <ProdConPlanning sections={production.sections} />
          </Route>
          <Route exact path={`${match.path}`}>
            <ProdConSales />
          </Route>
          <Route exact path={""}>
            <Redirect to="" />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default PdCon;
