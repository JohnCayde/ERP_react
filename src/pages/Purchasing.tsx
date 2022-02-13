import { useState } from "react";
import {
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import PurchaseDashBoard from "./PurchaseDashBoard";
import PurchaseRequestPen from "./PurchaseRequestPen";
import PurchaseNew from "./PurchaseNew";
import PurchasePending from "./PurchasePending";
import DataTable from "../components/DataTable";

const drawerWidth = 240;

function Purchasing() {
    const match = useRouteMatch();
    const location = useLocation();
    const purchasing = useSelector(state => state.purchasing);
    const [openRequest, setOpenRequest] = useState(true);
    const [openPurchase, setOpenPurchase] = useState(true);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const handleRequest = () => {
        setOpenRequest(!openRequest);
    };

    const handlePurchase = () => {
        setOpenPurchase(!openPurchase);
    };

    const handleRequestOverview = () => {
        const clms = ["Order No", "From", "Date", "Status", "Details"];
        const purchaseOrder = purchasing.requests.map(order => {
            const idComp = order.id.split("-");
            const items = order.items.map(item => {
                return {
                    itemName: item.name,
                    quantity: item.quantity
                };
            });

            return {
                id: order.id,
                orderNo: idComp[0],
                secondary: order.from,
                status: order.status,
                items
            };
        });

        setColumns(clms);
        setRows(purchaseOrder);
    };

    const handlePurchaseOverview = () => {
        const clms = ["Order No", "Vendor", "Date", "Status", "Details"];
        const purchaseOrder = purchasing.purchaseOrders.map(order => {
            const idComp = order.id.split("-");
            const vendorProfile = purchasing.vendors.find(
                vendor => vendor.id == order.vendor
            );
            const items = order.items.map(item => {
                const itemProfile = purchasing.items.find(
                    itm => itm.id == item.id
                );
                return {
                    itemName: itemProfile.name,
                    quantity: item.quantity
                };
            });

            return {
                id: order.id,
                orderNo: idComp[0],
                secondary: vendorProfile.name,
                status: order.status,
                items
            };
        });

        setColumns(clms);
        setRows(purchaseOrder);
    };

    if (rows.length == 0) {
        if (location.pathname == "/purchase/request/overview") {
            handleRequestOverview();
        } else if (location.pathname == "/purchase/purchase/overview") {
            handlePurchaseOverview();
        }
    }

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
                        Purchasing
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
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </Link>
                    <ListItemButton onClick={handleRequest}>
                        <ListItemText primary="Request" />
                        {openRequest ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openRequest} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link
                                to={`${match.url}/request/pending`}
                                style={{
                                    textDecoration: "none",
                                    width: "100%"
                                }}
                            >
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="Pending / Receive" />
                                </ListItemButton>
                            </Link>
                            <Link
                                to={`${match.url}/request/overview`}
                                style={{
                                    textDecoration: "none",
                                    width: "100%"
                                }}
                            >
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={handleRequestOverview}
                                >
                                    <ListItemText primary="Overview" />
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={handlePurchase}>
                        <ListItemText primary="Purchase" />
                        {openPurchase ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openPurchase} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link
                                to={`${match.url}/purchase/new`}
                                style={{
                                    textDecoration: "none",
                                    width: "100%"
                                }}
                            >
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="New" />
                                </ListItemButton>
                            </Link>
                            <Link
                                to={`${match.url}/purchase/pending`}
                                style={{
                                    textDecoration: "none",
                                    width: "100%"
                                }}
                            >
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="Pending / Receive" />
                                </ListItemButton>
                            </Link>
                            <Link
                                to={`${match.url}/purchase/overview`}
                                style={{
                                    textDecoration: "none",
                                    width: "100%"
                                }}
                            >
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={handlePurchaseOverview}
                                >
                                    <ListItemText primary="Overview" />
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>
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
                    <Route path={`${match.path}/request/pending`}>
                        <PurchaseRequestPen requests={purchasing.requests} />
                    </Route>
                    <Route path={`${match.path}/request/overview`}>
                        <DataTable
                            title={"Production Purchasing Request (Overall)"}
                            description={
                                "(All the purchasing request from production and maintenance department)"
                            }
                            rows={rows}
                            columns={columns}
                        />
                    </Route>
                    <Route path={`${match.path}/purchase/new`}>
                        <PurchaseNew
                            vendors={purchasing.vendors}
                            items={purchasing.items}
                        />
                    </Route>
                    <Route path={`${match.path}/purchase/pending`}>
                        <PurchasePending assets={purchasing} />
                    </Route>
                    <Route path={`${match.path}/purchase/overview`}>
                        <DataTable
                            title={"Purchasing Request (Overall)"}
                            description={
                                "(All the available purchasing request)"
                            }
                            rows={rows}
                            columns={columns}
                        />
                    </Route>
                    <Route path={`${match.path}`}>
                        <PurchaseDashBoard items={purchasing.items} />
                    </Route>
                    <Route exact path={""}>
                        <Redirect to="" />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

export default Purchasing;
