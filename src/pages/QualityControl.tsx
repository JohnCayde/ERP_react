import { useState } from "react";
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
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import QcDashBoard from "./QcDashBoard";
import QcNoteNew from "./QcNoteNew";
import QcNotePending from "./QcNotePending";

const drawerWidth = 240;

function QuantityControl() {
    const match = useRouteMatch();
    const production = useSelector(state => state.production);
    const qc = useSelector(state => state.qc);
    const issueNotes = qc.notes.map(nt => {
        const idComp = nt.id.split("-");
        const sectionProfile = production.sections.find(
            section => section.id == nt.section
        );
        return {
            ...nt,
            no: idComp[0],
            section: sectionProfile.name
        };
    });

    const [note, setNote] = useState(true);

    const handleNote = e => {
        setNote(!note);
    };

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
                        Quantity Control
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
                    <ListItemButton onClick={handleNote}>
                        <ListItemText primary="Issue Note" />
                        {note ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={note} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link
                                to={`${match.url}/notes/new`}
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
                                to={`${match.url}/notes/pending`}
                                style={{
                                    textDecoration: "none",
                                    width: "100%"
                                }}
                            >
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="Pending / Solve" />
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
                    <Route path={`${match.path}/notes/new`}>
                        <QcNoteNew sections={production.sections} />
                    </Route>
                    <Route path={`${match.path}/notes/pending`}>
                        <QcNotePending notes={issueNotes} />
                    </Route>
                    <Route path={`${match.path}`}>
                        <QcDashBoard notes={issueNotes} />
                    </Route>
                    <Route exact path={""}>
                        <Redirect to="" />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

export default QuantityControl;
