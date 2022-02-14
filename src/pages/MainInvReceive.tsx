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
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalRequestDetails from "../components/ModalRequestDetails";

function MainInvReceive({
  allRequests,
}: {
  allRequests: Array<PurchaseTypes.RequestModel>;
}) {
  const requests = allRequests.map((request) => {
    const idComp = request.id.split("-");
    return {
      ...request,
      no: idComp[0],
    };
  });

  const [open, setOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<
    (PurchaseTypes.RequestModel & { no: string }) | undefined
  >(undefined);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    const req = requests.find((request) => request.id === requestId);
    setActiveRequest(req);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const comRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    store.dispatch(Purchaser.ComRequest(requestId));
  };

  return (
    <Box my={1}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Request to Purchasing Department
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （tool request that already reviewed by purchasing department and wait
          for receive)
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Request No</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {request.no}
                </TableCell>
                <TableCell align="right">{request.status}</TableCell>
                <TableCell align="right">{`${index} day ago`}</TableCell>
                <TableCell align="right">
                  {request.status === "reviewed" && (
                    <Button
                      variant="contained"
                      value={request.id}
                      onClick={comRequest}
                    >
                      Received
                    </Button>
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

export default MainInvReceive;
