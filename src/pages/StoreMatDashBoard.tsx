import { useState } from "react";
import * as matstore from "../actions/StoreAction";
import store from "../store";

import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};


function StoreMatDashBoard({inventory}) {

    const columns = ["ID", "Name", "Stock", "StockLevel"].map(field => {
        return {
            field: field.toLowerCase(),
            headerName: field,
            flex: 0.3,
            type: ["Stock", "StockLevel"].includes(field) ? "number" : "string",
            editable: false
        };
    });

    const rows = inventory.map(item => {
        const idcomp = item.id.split("-");
        return {
            ...item,
            id: idcomp[0]
        };
    });


    const [mat, setMat] = useState(false);
    const [quantity, setQuantity] = useState(false);
    const [newMatName, setNewMatName] = useState("");
    const [material, setMaterial] = useState("");
    const [qty, setQty] = useState(0);

    const openMaterial = () => setMat(true);
    const closeMaterial = () => setMat(false);
    const openQuantity = () => setQuantity(true);
    const closeQuantity = () => setQuantity(false);

    const handleMatName = e => {
        setNewMatName(e.target.value);
    };

    const addMaterial = e => {
        // store.dispatch(maintenance.AddItem(newItemName));
        store.dispatch(matstore.AddMaterial(newMatName))
        setNewMatName("");
        setMat(false);
    };

    const handleMaterial = e => {
        setMaterial(e.target.value);
    };

    const handleQty = e => {
        setQty(e.target.value);
    };

    const adjMaterial = () => {
        store.dispatch(matstore.AdjustMaterial(material, qty))
        setQuantity(false);
        setMaterial("");
        setQty(0);
    };

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            <Box>
                <Typography variant="h4" gutterBottom component="div">
                    Material Store
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    （Material warehouse)
                </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
                <Button sx={{ mr: 2 }} variant="contained" onClick={openMaterial}>
                    New Material
                </Button>
                <Button
                    sx={{ mx: 2 }}
                    variant="contained"
                    onClick={openQuantity}
                >
                    Adjust Quantity
                </Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
            <Modal
                open={mat}
                onClose={closeMaterial}
                aria-labelledby="new-modal-title"
                aria-describedby="new-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography
                            id="new-modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                        >
                            New Material
                        </Typography>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Item Name"
                            variant="outlined"
                            value={newMatName}
                            onInput={handleMatName}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end">
                        <Button
                            sx={{ my: 2 }}
                            variant="contained"
                            onClick={addMaterial}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={quantity}
                onClose={closeQuantity}
                aria-labelledby="quantity-modal-title"
                aria-describedby="quantity-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography
                            id="quantity-modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                        >
                            Adjust Material Stock Quantity
                        </Typography>
                    </Box>
                    <Box sx={{ my: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="MaterialLabel">Material</InputLabel>
                            <Select
                                labelId="MaterialLabel"
                                id="demo-simple-select"
                                value={material}
                                label="Material"
                                onChange={handleMaterial}
                            >
                                {inventory.map((mt, idx) => {
                                    return (
                                        <MenuItem value={mt.id} key={idx}>
                                            {mt.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ my: 3 }}>
                        <TextField
                            fullWidth
                            id="quantity-basic"
                            label="Quantity"
                            variant="outlined"
                            value={qty}
                            onInput={handleQty}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end">
                        <Button
                            sx={{ mx: 2 }}
                            variant="contained"
                            onClick={adjMaterial}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default StoreMatDashBoard
