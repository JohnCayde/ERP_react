import { Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

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

import ProdClerkSection from "./ProdClerkSection";
import ProdClerkMachine from "./ProdClerkMachine";

const drawerWidth = 240;

function ProdClerk({ sections, machines, processes }) {
    const match = useRouteMatch();

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h4"
                        gutterBottom
                        component="div"
                        align="center"
                    >
                        Production Clerk
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
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
                        to={`${match.url}/section`}
                        style={{ textDecoration: "none", width: "100%" }}
                    >
                        <ListItemButton>
                            <ListItemText primary="Section" />
                        </ListItemButton>
                    </Link>
                    <Link
                        to={`${match.url}/machine`}
                        style={{ textDecoration: "none", width: "100%" }}
                    >
                        <ListItemButton>
                            <ListItemText primary="Machine" />
                        </ListItemButton>
                    </Link>
                    <Link
                        to={""}
                        style={{ textDecoration: "none", width: "100%" }}
                    >
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
                    <Route exact path={`${match.path}/section`}>
                        <ProdClerkSection
                            sections={sections}
                            processes={processes}
                        />
                    </Route>
                    <Route exact path={`${match.path}/machine`}>
                        <ProdClerkMachine
                            machines={machines}
                            sections={sections}
                        />
                    </Route>
                    <Route exact path={`${match.path}`}>
                        <h1>Welcome</h1>
                    </Route>
                    <Route exact path={""}>
                        <Redirect to="" />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

export default ProdClerk;
