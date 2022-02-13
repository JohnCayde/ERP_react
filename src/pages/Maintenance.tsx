import { useState } from "react";
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
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import MainRequest from "./MainRequest";
import MainRequestPen from "./MainRequestPen";
import MainRequestOvr from "./MainRequestOvr";
import MainInventory from "./MainInventory";
import MainInvRequest from "./MainInvRequest";
import MainInvReceive from "./MainInvReceive";

const drawerWidth = 240;

function Maintenance() {
  //store
  const match = useRouteMatch();
  const purchasing = useSelector((state: RootState) => state.purchasing);
  const production = useSelector((state: RootState) => state.production);
  const assets = useSelector((state: RootState) => state.maintenance);

  //data process
  const toolRequests = purchasing.requests.filter(
    (request) => request.from == "Maintenance"
  );

  //state
  const [main, setMain] = useState(true);
  const [spare, setSpare] = useState(true);

  //function
  const handleMain = () => {
    setMain(!main);
  };

  const handleSpare = () => {
    setSpare(!spare);
  };

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
            Maintenance
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
          <ListItemButton onClick={handleMain}>
            <ListItemText primary="Maintenance" />
            {main ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={main} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to={`${match.url}`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Overview" />
                </ListItemButton>
              </Link>
              <Link
                to={`${match.url}/request/new`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Review" />
                </ListItemButton>
              </Link>
              <Link
                to={`${match.url}/request/pending`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Complete" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton onClick={handleSpare}>
            <ListItemText primary="Spare tools" />
            {spare ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={spare} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to={`${match.url}/spare/inventory`}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Inventory" />
                </ListItemButton>
              </Link>
              <Link
                to={`${match.url}/spare/request`}
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
                to={`${match.url}/spare/receive`}
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
          <Route path={`${match.path}/request/new`}>
            <MainRequest
              requests={assets.requests}
              sections={production.sections}
            />
          </Route>
          <Route path={`${match.path}/request/pending`}>
            <MainRequestPen
              requests={assets.requests}
              sections={production.sections}
            />
          </Route>
          <Route path={`${match.path}/spare/inventory`}>
            <MainInventory inventory={assets.inventory} />
          </Route>
          <Route path={`${match.path}/spare/request`}>
            <MainInvRequest
              allRequests={toolRequests}
              items={purchasing.items}
            />
          </Route>
          <Route path={`${match.path}/spare/receive`}>
            <MainInvReceive allRequests={toolRequests} />
          </Route>

          <Route path={`${match.path}`}>
            <MainRequestOvr
              requests={assets.requests}
              sections={production.sections}
            />
          </Route>
          <Route exact path={""}>
            <Redirect to="" />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default Maintenance;
