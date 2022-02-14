import { useState } from "react";
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

import ModalItemRequest from "../components/ModalItemRequest";
import ModalRequestDetails from "../components/ModalRequestDetails";

function MainInvRequest({
  allRequests,
  items,
}: {
  allRequests: Array<PurchaseTypes.RequestModel>;
  items: Array<PurchaseTypes.Item>;
}) {
  //data processing
  const requests = allRequests
    .filter((request) => request.status === "pending")
    .map((request) => {
      const idComp = request.id.split("-");
      return {
        ...request,
        no: idComp[0],
      };
    });

  //state
  const [open, setOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<
    (PurchaseTypes.RequestModel & { no: string }) | undefined
  >(undefined);
  const [openRequest, setOpenRequest] = useState(false);
  //function
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    const req = requests.find((request) => request.id === requestId);
    setActiveRequest(req);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenRequest = () => setOpenRequest(true);

  const handleCloseRequest = () => setOpenRequest(false);

  return (
    <Box my={1}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Request to Purchasing Department
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （Process new requests to purchasing department for tools)
        </Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Button sx={{ mr: 2 }} variant="contained" onClick={handleOpenRequest}>
          New Request
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Request No</TableCell>
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
                <TableCell align="right">{`${index} day ago`}</TableCell>
                <TableCell align="right">
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
      <ModalItemRequest
        department={"Maintenance"}
        items={items}
        open={openRequest}
        handleClose={handleCloseRequest}
      />
    </Box>
  );
}

export default MainInvRequest;
