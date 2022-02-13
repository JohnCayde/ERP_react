import { useState } from "react";
import * as Purchaser from "../actions/PurchaseAction";
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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import DeleteIcon from "@mui/icons-material/Delete";

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

function PurchaseNew({ vendors, items }) {
    const [vendor, setVendor] = useState("");
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [bucket, setBucket] = useState([]);

    const handleVendor = e => {
        setVendor(e.target.value);
    };

    const handleItem = e => {
        setItem(e.target.value);
    };

    const handleQuantity = e => {
        setQuantity(e.target.value);
    };

    const addItem = e => {
        if (quantity == 0) {
            alert("The quantity can nit be 0");
            return;
        }

        const product = items.find(itm => itm.id == item);
        const dupIndex = bucket.findIndex(itm => itm.id == item);
        if (dupIndex == -1) {
            product.quantity = quantity;
            setBucket([...bucket, product]);
        } else {
            const nwBucket = bucket.map((itm, idx) => {
                if (idx == dupIndex) {
                    itm.quantity = parseInt(quantity);
                }
                return itm;
            });
            setBucket(nwBucket);
        }

        setItem("");
        setQuantity(0);
    };

    const delItem = e => {
        const itemId = e.currentTarget.value;
        const nwBucket = bucket.filter(itm => itm.id != itemId);
        setBucket(nwBucket);
    };

    const submitBucket = e => {
        const purchaseOrder = {
            vendor,
            status: "pending",
            items: bucket
        };

        store.dispatch(Purchaser.AddPurchaseOrder(purchaseOrder));
        setVendor("");
        setItem("");
        setQuantity(0);
        setBucket([]);
    };

    return (
        <Box sx={{ maxWidth: "800px", mx: "auto", mt: 15 }}>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Box>
                        <Typography
                            variant="h4"
                            gutterBottom
                            component="div"
                            align="center"
                        >
                            New Purchase Order
                        </Typography>
                        <Typography
                            variant="caption"
                            display="block"
                            align="center"
                            gutterBottom
                        >
                            （Create new purchasing order to vendor outside)
                        </Typography>
                    </Box>
                    <Box width="100%" padding={1}>
                        <FormControl fullWidth>
                            <InputLabel id="VendorLabel">Vendor</InputLabel>
                            <Select
                                labelId="VendorLabel"
                                id="vendor-select"
                                value={vendor}
                                label="Item"
                                onChange={handleVendor}
                            >
                                {vendors.map((vd, idx) => {
                                    return (
                                        <MenuItem value={vd.id} key={idx}>
                                            {vd.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box width="100%" padding={1}>
                        <FormControl fullWidth>
                            <InputLabel id="ItemLabel">Item</InputLabel>
                            <Select
                                labelId="ItemLabel"
                                id="item-select"
                                value={item}
                                label="Item"
                                onChange={handleItem}
                            >
                                {items.map((itm, idx) => {
                                    return (
                                        <MenuItem value={itm.id} key={idx}>
                                            {itm.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box width="100%" padding={1} display="flex">
                        <TextField
                            sx={{ width: "80%" }}
                            id="quantity"
                            label={`Quantity`}
                            variant="outlined"
                            type="number"
                            onInput={handleQuantity}
                            value={quantity}
                        />
                        <Button
                            sx={{ ml: 1, width: "20%" }}
                            variant="contained"
                            onClick={addItem}
                        >
                            Add
                        </Button>
                    </Box>
                    <Box
                        marginTop={12}
                        display="flex"
                        justifyContent="flex-end"
                        p={1}
                    >
                        <Button
                            sx={{ mx: 1 }}
                            variant="contained"
                            onClick={submitBucket}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Typography
                        sx={{ mt: 7, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Bucket List
                    </Typography>
                    <Demo>
                        <List>
                            {bucket.map((itm, idx) => {
                                return (
                                    <ListItem
                                        sx={{ border: "solid 2px" }}
                                        key={idx}
                                        secondaryAction={
                                            <Box>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    value={itm.id}
                                                    onClick={delItem}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        }
                                    >
                                        <ListItemText
                                            primary={itm.name}
                                            secondary={itm.quantity}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PurchaseNew;
