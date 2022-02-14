import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ModalSaleOrder({
  order,
  open,
  handleClose,
}: {
  order: { items: Array<{ name: string; quantity: number }> } | undefined;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{ my: 1 }} variant="h6" component="div">
          Order Details
        </Typography>
        <List>
          {order &&
            order.items.map((item, idx) => {
              return (
                <ListItem key={idx} sx={{ border: "solid 2px" }}>
                  <ListItemText
                    primary={`${idx + 1}. ${item.name}`}
                    secondary={item.quantity}
                  />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Modal>
  );
}

export default ModalSaleOrder;
