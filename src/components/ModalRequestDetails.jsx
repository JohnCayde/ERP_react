import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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

function ModalRequestDetails({ request, open, handleClose }) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Request Details
                </Typography>
                <List>
                    {request.items &&
                        request.items.map((itm, idx) => {
                            return (
                                <ListItem
                                    sx={{ border: "solid 2px" }}
                                    key={idx}
                                >
                                    <ListItemText
                                        primary={itm.name}
                                        secondary={itm.quantity}
                                    />
                                </ListItem>
                            );
                        })}
                </List>
            </Box>
        </Modal>
    );
}

export default ModalRequestDetails;
