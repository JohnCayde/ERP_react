import { useHistory } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Engineer from "../actions/EngineerAction";
import store from "../store";

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
import ListSubheader from "@mui/material/ListSubheader";
import Modal from "@mui/material/Modal";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function RndProduct({ Assets }) {
    const history = useHistory();

    const [name, setName] = useState("");
    const [material, setMaterial] = useState("");
    const [process, setProcess] = useState("");
    const [processes, setProcesses] = useState([]);
    const [activeProcedure, setActiveProcedure] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = e => {
        const procedureId = e.currentTarget.value;
        let rawProcedure = Assets.procedures.find(
            pcdr => pcdr.id == procedureId
        );
        const procedureMaterial = Assets.materials.find(
            mtrl => mtrl.id == rawProcedure.material
        );
        const procedureProcess = rawProcedure.processes.map(process => {
            const prcs = Assets.processes.find(prs => prs.id == process.id);
            return prcs.name;
        });

        const procedure = {
            name: rawProcedure.name,
            material: procedureMaterial.name,
            process: procedureProcess
        };
        setActiveProcedure(procedure);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setActiveProcedure({});
    };

    const handleName = e => {
        setName(e.target.value);
    };

    const handleMaterial = e => {
        setMaterial(e.target.value);
    };

    const handleProcess = e => {
        setProcess(e.target.value);
    };

    const addProcess = e => {

        if (process == "") {
            alert("Please select your process")
            return
        }
        const prcs = Assets.processes.find(ps => ps.id == process);
        setProcesses([...processes, { ...prcs, code: uuidv4() }]);
    };

    const delProcess = e => {
        const newPrcs = processes.filter(
            prcs => prcs.code != e.currentTarget.value
        );
        setProcesses(newPrcs);
    };

    const addProcedure = () => {
        if (name == "") {
            alert("Please fill in product name")
            return
        }

        if (material == "") {
            alert("Please fill in material name")
            return
        }

        if (processes.length == 0) {
            alert("Please fill in product process")
            return
        }

        const prcs = processes.map((prs)=>{
            return {
                id:prs.id,
                code:prs.code,
            }
        })

        const procedure = {
            name,
            material,
            processes:prcs
        };

        store.dispatch(Engineer.AddProcedure(procedure));
        setName("");
        setMaterial("")
        setProcess("")
        setProcesses([]);
    };

    const delProcedure = (e) => {
        store.dispatch(Engineer.DelProcedure(e.currentTarget.value));
    };

    return (
        <Box sx={{ maxWidth: "800px", mx: "auto", mt: 15 }}>
            <Box>
                <Typography variant="h4" gutterBottom component="div">
                    Product Process Flow
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    (Arrange the process flow for product)
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Typography
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Available Product
                    </Typography>
                    <Demo>
                        <List>
                            {Assets.procedures.map((procedure, idx) => {
                                return (
                                    <ListItem
                                        sx={{ border: "solid 2px" }}
                                        key={idx}
                                        secondaryAction={
                                            <Box>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    value={procedure.id}
                                                    onClick={handleOpen}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    value={procedure.id}
                                                    onClick={delProcedure}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        }
                                    >
                                        <ListItemText primary={procedure.name} />
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
                            id="ContentName"
                            label={`Product Name`}
                            variant="outlined"
                            onInput={handleName}
                            value={name}
                        />
                    </Box>
                    <Box width="100%" padding={1}>
                        <FormControl fullWidth>
                            <InputLabel id="MaterialLabel">Material</InputLabel>
                            <Select
                                labelId="MaterialLabel"
                                id="demo-simple-select"
                                value={material}
                                label="Age"
                                onChange={handleMaterial}
                            >
                                {Assets.materials.map((material, idx) => {
                                    return (
                                        <MenuItem value={material.id} key={idx}>
                                            {material.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box width="100%" padding={1}>
                        <FormControl fullWidth>
                            <InputLabel id="ProcessLabel">Process</InputLabel>
                            <Select
                                labelId="ProcessLabel"
                                id="demo-simple-select"
                                value={process}
                                label="Age"
                                onChange={handleProcess}
                            >
                                {Assets.processes.map((prcs, idx) => {
                                    return (
                                        <MenuItem value={prcs.id} key={idx}>
                                            {prcs.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box my={2} sx={{ display: "flex" }}>
                        <IconButton
                            sx={{ mx: "auto" }}
                            variant="contained"
                            size="large"
                            onClick={addProcess}
                        >
                            <ArrowCircleDownIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <List
                            subheader={<ListSubheader>Process Flow</ListSubheader>}
                        >
                            {processes.map((prcs, idx) => {
                                return (
                                    <ListItem
                                        sx={{ border: "solid 1px" }}
                                        key={idx}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                value={prcs.code}
                                                onClick={delProcess}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText primary={prcs.name} />
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
                        <Button
                            sx={{ mx: 1 }}
                            variant="contained"
                            onClick={addProcedure}
                        >
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
                    <TextField
                        fullWidth 
                        disabled
                        sx={{ my: 1 }}
                        label="Name"
                        defaultValue={activeProcedure.name}
                    />
                    <TextField
                        fullWidth 
                        disabled
                        sx={{ my: 1 }}
                        label="Material"
                        defaultValue={activeProcedure.material}
                    />
                    <Typography
                        sx={{ my: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Process Flow
                    </Typography>
                    <List>
                        {activeProcedure.process && activeProcedure.process.map((prcs, idx) => {
                            return (
                                <ListItem key={idx} sx={{ border: "solid 2px" }}>
                                    <ListItemText primary={`${idx+1}. ${prcs}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
}

export default RndProduct;
