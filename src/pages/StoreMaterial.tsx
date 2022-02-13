import { useState } from "react";
import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as StoreTypes from "../types/Store";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import StoreMatDashBoard from "./StoreMatDashBoard";
import StoreMatProdRequest from "./StoreMatProdRequest";
import StoreMatPurRequest from "./StoreMatPurRequest";
import StoreMatPurReceive from "./StoreMatPurReceive";

const drawerWidth = 240;

function MaterialStore({
  requests,
  matstore,
}: {
  requests: Array<StoreTypes.MatRequestModel>;
  matstore: Array<StoreTypes.MaterialModel>;
}) {
  //hook
  const match = useRouteMatch();
  const purchasing = useSelector((state: RootState) => state.purchasing);
  const production = useSelector((state: RootState) => state.production);
  //data process
  const toolRequests = purchasing.requests.filter(
    (request) => request.from == "Material Store"
  );

  const materialRequest = requests.map((request) => {
    const sectionProfile = production.sections.find(
      (section) => section.id == request.section
    );
    const itemProfile = purchasing.items.find(
      (item) => item.id == request.item
    );

    return {
      ...request,
      section: sectionProfile!.name,
      sectionId: sectionProfile!.id,
      item: itemProfile!.name,
      itemId: itemProfile!.id,
    };
  });
  //state
  const [purchseOption, setPurchseOption] = useState(true);
  //function
  const handlePurchaseOption = () => setPurchseOption(!purchseOption);

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
            Material Store
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
              <ListItemText primary="DashBoard" />
            </ListItemButton>
          </Link>
          <Link
            to={`${match.url}/production/request`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <ListItemButton>
              <ListItemText primary="Material Request" />
            </ListItemButton>
          </Link>
          <ListItemButton onClick={handlePurchaseOption}>
            <ListItemText primary="Purchasing" />
            {purchseOption ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={purchseOption} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to={`${match.url}/purchase/request`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Request" />
                </ListItemButton>
              </Link>
              <Link
                to={`${match.url}/purchase/receive`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Receive" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <Link to={""} style={{ textDecoration: "none", width: "100%" }}>
            <ListItemButton sx={{ backgroundColor: "#EEC989" }}>
              <ListItemText primary="Back" />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />

        <Switch>
          <Route exact path={`${match.path}/purchase/request`}>
            <StoreMatPurRequest
              allRequests={toolRequests}
              items={purchasing.items}
            />
          </Route>
          <Route exact path={`${match.path}/purchase/receive`}>
            <StoreMatPurReceive allRequests={toolRequests} />
          </Route>
          <Route exact path={`${match.path}/production/request`}>
            <StoreMatProdRequest requests={materialRequest} />
          </Route>
          <Route exact path={`${match.path}`}>
            <StoreMatDashBoard inventory={matstore} />
          </Route>
          <Route exact path={""}>
            <Redirect to="" />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default MaterialStore;
