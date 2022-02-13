import { useState } from "react";
import * as Purchaser from "../actions/PurchaseAction";
import store from "../store";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import ModalRequestDetails from "../components/ModalRequestDetails";


function PurchasePending({ assets }) {
    const PurchaseOrders = assets.purchaseOrders.filter(order=>order.status == "pending").map(order => {
        const idComp = order.id.split("-");
        const vendorProfile = assets.vendors.find(
            vendor => vendor.id == order.vendor
        );
        const items = order.items.map(item => {
            const itemProfile = assets.items.find(itm => itm.id == item.id);
            return {
                name: itemProfile.name,
                quantity: item.quantity
            };
        });

        return {
            id: order.id,
            orderNo: idComp[0],
            vendor: vendorProfile.name,
            status: order.status,
            items
        };
    });

    const [open, setOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState({});

    const handleOpen = e => {
        const orderId = e.currentTarget.value;
        const purchaseOrder = PurchaseOrders.find(order => order.id == orderId);
        setActiveOrder(purchaseOrder);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const delOrder = e => {
        const confirmation = confirm("Are you sure?");
        if (!confirmation) {
            return;
        }

        const orderId = e.currentTarget.value;
        store.dispatch(Purchaser.DelPurchaseOrder(orderId));
    };

    const revOrder = e => {
        const confirmation = confirm("Are you sure?");
        if (!confirmation) {
            return;
        }

        const orderId = e.currentTarget.value;
        store.dispatch(Purchaser.RevPurchaseOrder(orderId));
    };

    return (
        <Box my={1}>
            <Box my={2}>
                <Typography variant="h4" gutterBottom component="div">
                    Production Service Request (New)
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    （Production request for variety of maintenance services that just sent in)
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order No</TableCell>
                            <TableCell align="right">Vendor</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {PurchaseOrders.map((order, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.orderNo}
                                </TableCell>
                                <TableCell align="right">
                                    {order.vendor}
                                </TableCell>
                                <TableCell align="right">
                                    {`${index} day ago`}
                                </TableCell>
                                <TableCell align="right">
                                    {order.status}
                                </TableCell>
                                <TableCell align="right">
                                    {order.status != "received" && (
                                        <IconButton
                                            edge="end"
                                            aria-label="receive"
                                            value={order.id}
                                            onClick={revOrder}
                                        >
                                            <AssignmentReturnedIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        edge="end"
                                        aria-label="details"
                                        value={order.id}
                                        onClick={handleOpen}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        value={order.id}
                                        onClick={delOrder}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalRequestDetails
                request={activeOrder}
                open={open}
                handleClose={handleClose}
            />
        </Box>
    );
}

export default PurchasePending;
