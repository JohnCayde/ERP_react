import { useState } from "react";
import * as prod from "../actions/ProductionAction";
import * as fgStore from "../actions/StoreAction";
import store from "../store";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ModalCompList from "../components/ModalCompList";
import ModalMainRequest from "../components/ModalMainRequest";
import ModalMatRequest from "../components/ModalMatRequest";

function ProdWork({
    section,
    components,
    machines,
    maintenance,
    matstore,
    items
}) {
    //hool
    const history = useHistory();

    //data process
    const sectionComponent = components.filter(component => {
        //component that exist in the section
        const processIndex = component.process.findIndex(
            comp => comp.process == section.processId
        );
        if (processIndex == -1) {
            return false;
        }

        if (processIndex == 0) {
            if (!component.process[processIndex + 1].complete) {
                return true;
            }
        } else {
            if (component.process[processIndex - 1].complete) {
                return true;
            }
        }
    });

    const completedComponent = sectionComponent.filter(
        //component that is complete process, no matter previous process or current process
        component => component.status == "completed"
    );

    const pendingComponent = completedComponent.filter(component => {
        //component that is complete previous process
        const processIndex = component.process.findIndex(
            prs => prs.process == section.processId
        );

        return !component.process[processIndex].complete;
    });

    const stockComponent = completedComponent.filter(component => {
        //componen that is complete current process
        const processIndex = component.process.findIndex(
            prs => prs.process == section.processId
        );

        return component.process[processIndex].complete;
    });

    const processingComponent = sectionComponent.filter(
        //component that is currently processing
        component => component.status == "pending"
    );

    const sectionMachine = machines //machine that is locate in the current section
        .filter(machine => machine.sectionId == section.id)
        .map(machine => {
            const componentInMachine = processingComponent.find(component => {
                const processIndex = component.process.findIndex(
                    prs => prs.process == section.processId
                );
                return component.process[processIndex].machine == machine.id;
            });

            const componentId = componentInMachine ? componentInMachine.id : "";
            return {
                ...machine,
                componentId
            };
        });

    const maintenanceRequests = maintenance.filter(
        record => record.section == section.id
    );
    const matStoreRequests = matstore.filter(
        record => record.section == section.id
    );
    const materials = items.filter(item => item.type == "material");
    //state
    const [open, setOpen] = useState(false);
    const [openRequest, setOpenRequest] = useState(false);
    const [service, setService] = useState({});
    const [openMaterial, setOpenMaterial] = useState(false);
    const [material, setMaterial] = useState({});
    const [active, setActive] = useState([]);

    //function
    const startProcessing = e => {
        const index = e.currentTarget.value;
        const componentNo = document.getElementById(`input_${index}`).value;

        if (componentNo == "") {
            alert(
                "Fill in the component no first. If you didn't have, refer to the pending stock list"
            );
            return;
        }

        const componentProfile = pendingComponent.find(
            component => component.id == componentNo
        );
        if (!componentProfile) {
            alert("Component No invalid");
            document.getElementById(`input_${index}`).value = "";
            document.getElementById(`input_${index}`).readOnly = false;
            return;
        }

        const profile = {
            component: componentProfile,
            machine: sectionMachine[index],
            processId: section.processId
        };

        store.dispatch(prod.StartProcess(profile));

        document.getElementById(`input_${index}`).value = componentNo;
        document.getElementById(`input_${index}`).readOnly = true;
    };

    const completeProcessing = e => {
        //complete process at production store
        const index = e.currentTarget.value;
        const componentNo = document.getElementById(`input_${index}`).value;
        if (componentNo == "") {
            alert(
                "Fill in the component no first. If you didn't have, refer to the pending stock list"
            );
            return;
        }

        const completeComponent = processingComponent.find(
            component => component.id == componentNo
        );
        if (!completeComponent) {
            alert("Component No invalid");
            document.getElementById(`input_${index}`).value = "";
            document.getElementById(`input_${index}`).readOnly = false;
            return;
        }

        const profile = {
            component: completeComponent,
            machine: sectionMachine[index],
            processId: section.processId
        };
        console.log(profile)
        store.dispatch(prod.CompleteProcess(profile));

        //if all process complete need send to production store
        const done = completeComponent.process.every((prs)=>prs.complete==true)
        if (done) {
            store.dispatch(fgStore.AddTransaction(completeComponent))
        }

        //reset HTML DOM
        document.getElementById(`input_${index}`).value = "";
        document.getElementById(`input_${index}`).readOnly = false;
    };

    const handleOpen = e => {
        const mode = e.currentTarget.value;
        switch (mode) {
            case "pending":
                setActive(pendingComponent);
                break;
            case "processing":
                setActive(processingComponent);
                break;
            case "stock":
                setActive(stockComponent);
                break;
            default:
                setActive([]);
                break;
        }
        setOpen(true);
    };

    const handleClose = e => {
        setOpen(false);
        setActive([]);
    };

    const handleOpenRequest = e => {
        console.log(section);
        setService({
            section: section.name,
            sectionId: section.id,
            issue: "test"
        });
        setOpenRequest(true);
    };

    const closeRequest = e => {
        setOpenRequest(false);
        setService({});
    };

    const handleOpenMaterial = e => {
        setMaterial({
            section: section.name,
            sectionId: section.id,
            item: "",
            quantity: 0
        });
        setOpenMaterial(true);
    };

    const closeMaterial = e => {
        setOpenMaterial(false);
    };

    return (
        <Grid sx={{ marginTop: "100px" }} container spacing={2}>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    fullWidth
                    color="warning"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    Back
                </Button>
                <List>
                    <ListItem sx={{ border: "solid 2px" }}>
                        <ListItemText
                            primary={"Planning"}
                            secondary={section.planning}
                        />
                    </ListItem>
                </List>
                <List>
                    <ListItem
                        sx={{ border: "solid 2px" }}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                value="pending"
                                onClick={handleOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={"Pending"}
                            secondary={pendingComponent.length}
                        />
                    </ListItem>
                </List>
                <List>
                    <ListItem
                        sx={{ border: "solid 2px" }}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                value="processing"
                                onClick={handleOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={"Processing"}
                            secondary={processingComponent.length}
                        />
                    </ListItem>
                </List>
                <List>
                    <ListItem
                        sx={{ border: "solid 2px" }}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                value="stock"
                                onClick={handleOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={"Stock"}
                            secondary={stockComponent.length}
                        />
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {section.name} Working Area
                        </Typography>
                        <Button
                            sx={{ mx: 1 }}
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenMaterial}
                        >
                            Material
                        </Button>
                        <Button
                            sx={{ mx: 1 }}
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenRequest}
                        >
                            Services
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box py={5}>
                    <Box>
                        {sectionMachine.map((machine, index) => {
                            if (machine.componentId == "") {
                                return (
                                    <Box
                                        key={index}
                                        display="flex"
                                        justifyContent="space-between"
                                        my={4}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            component="div"
                                        >
                                            {machine.name}
                                        </Typography>
                                        <TextField
                                            sx={{ width: "350px" }}
                                            id={`input_${index}`}
                                            label="Component No"
                                            variant="filled"
                                        />
                                        <Button
                                            variant="contained"
                                            sx={{ width: "110px" }}
                                            value={index}
                                            onClick={startProcessing}
                                        >
                                            Process
                                        </Button>
                                    </Box>
                                );
                            } else {
                                return (
                                    <Box
                                        key={index}
                                        display="flex"
                                        justifyContent="space-between"
                                        my={4}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            component="div"
                                        >
                                            {machine.name}
                                        </Typography>
                                        <TextField
                                            sx={{ width: "350px" }}
                                            id={`input_${index}`}
                                            label="Component No"
                                            variant="filled"
                                            defaultValue={
                                                machine.componentId || ""
                                            }
                                            readOnly
                                        />
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ width: "110px" }}
                                            value={index}
                                            onClick={completeProcessing}
                                        >
                                            Complete
                                        </Button>
                                    </Box>
                                );
                            }
                        })}
                    </Box>
                    <Divider />
                    <Box>
                        <Typography variant="h6" gutterBottom component="div">
                            {"Pending Stock"}
                        </Typography>
                        {pendingComponent.map((component, index) => {
                            return (
                                <Typography
                                    key={index}
                                    variant="caption"
                                    gutterBottom
                                    component="div"
                                >
                                    {component.id}
                                </Typography>
                            );
                        })}
                    </Box>
                </Box>
            </Grid>
            <ModalCompList
                components={active}
                open={open}
                handleClose={handleClose}
            />
            <ModalMainRequest
                mode="new"
                request={service}
                open={openRequest}
                handleClose={closeRequest}
                requests={maintenanceRequests}
            />
            <ModalMatRequest
                mode="new"
                request={material}
                open={openMaterial}
                handleClose={closeMaterial}
                requests={matStoreRequests}
                materials={materials}
            />
        </Grid>
    );
}

export default ProdWork;
