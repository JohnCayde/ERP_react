import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import MoreVertIcon from "@mui/icons-material/MoreVert";

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
type rowType = {
  id: string;
  orderNo: string;
  secondary: {};
  status: "pending" | "reviewed" | "received";
  items: Array<{ itemName: string; quantity: number }>;
};

function DataTable({
  title,
  description,
  rows,
  columns,
}: {
  title: string;
  description: string;
  rows: Array<rowType>;
  columns: Array<string>;
}) {
  const [open, setOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<rowType | undefined>(undefined);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const orderId = e.currentTarget.value;
    const purchaseOrder = rows.find((order) => order.id === orderId);
    setActiveRow(purchaseOrder);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box my={1}>
      <Box my={2}>
        <Typography variant="h4" gutterBottom component="div">
          {title}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {description}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                if (index === 0) {
                  return <TableCell key={index}>{column}</TableCell>;
                } else {
                  return (
                    <TableCell key={index} align="right">
                      {column}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((order, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {order.orderNo}
                </TableCell>
                <TableCell align="right">{order.secondary}</TableCell>
                <TableCell align="right">{`${index} day ago`}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="details"
                    value={order.id}
                    onClick={handleOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Purchase Ordre Detail
          </Typography>
          <List>
            {activeRow?.items &&
              activeRow?.items.map((itm, idx) => {
                return (
                  <ListItem sx={{ border: "solid 2px" }} key={idx}>
                    <ListItemText
                      primary={itm.itemName}
                      secondary={itm.quantity}
                    />
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </Modal>
    </Box>
  );
}

export default DataTable;
