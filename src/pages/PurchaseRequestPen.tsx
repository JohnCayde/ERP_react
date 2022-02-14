import { useState } from "react";
import * as Purchaser from "../actions/PurchaseAction";
import store from "../store";
import * as PurchaseTypes from "../types/Purchase";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";

import ModalRequestDetails from "../components/ModalRequestDetails";

function PurchaseRequestPen({
  requests,
}: {
  requests: Array<PurchaseTypes.RequestModel>;
}) {
  //state
  const [open, setOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<
    PurchaseTypes.RequestModel | undefined
  >(undefined);

  //function
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    const req = requests.find((request) => request.id === requestId);
    setActiveRequest(req);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const reviewRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    store.dispatch(Purchaser.RevRequest(requestId));
  };

  return (
    <Box my={1}>
      <Box my={2}>
        <Typography variant="h4" gutterBottom component="div">
          Production Service Request (New)
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （Production request for variety of maintenance services that just
          sent in)
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Request Id</TableCell>
              <TableCell align="right">From</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index, origin) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {request.id.split("-")[0]}
                </TableCell>
                <TableCell align="right">{request.from}</TableCell>
                <TableCell align="right">
                  {`${origin.length - index} day ago`}
                </TableCell>
                <TableCell align="right">{request.status}</TableCell>
                <TableCell align="right">
                  {["received", "pending"].includes(request.status) && (
                    <IconButton
                      edge="end"
                      aria-label="review"
                      value={request.id}
                      onClick={reviewRequest}
                    >
                      <AssignmentReturnedIcon />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    aria-label="details"
                    value={request.id}
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
      <ModalRequestDetails
        request={activeRequest}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}

export default PurchaseRequestPen;
