import { useState } from "react";
import * as maintenance from "../actions/MaintenanceAction";
import store from "../store";
import * as MaintenanceTypes from "../types/Maintenance";
import * as ProductionTypes from "../types/Production";

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
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";

import ModalMainRequest from "../components/ModalMainRequest";

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

function MainRequestPen({
  requests,
  sections,
}: {
  requests: Array<MaintenanceTypes.MRequest>;
  sections: Array<ProductionTypes.SectionModel>;
}) {
  const PendingRequests = requests
    .filter((request) => request.status === "reviewed")
    .map((request) => {
      const idComp = request.id.split("-");
      const sectionProfile = sections.find(
        (section) => section.id === request.section
      );

      return {
        ...request,
        no: idComp[0],
        section: sectionProfile!.name,
      };
    });

  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [activeRequest, setActiveRequest] = useState<
    (MaintenanceTypes.MRequest & { no: string }) | undefined
  >(undefined);
  const [remark, setRemark] = useState("");

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    const req = PendingRequests.find((request) => request.id === requestId);

    setActiveRequest(req);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const openComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    const req = PendingRequests.find((request) => request.id === requestId);
    setActiveRequest(req);
    setComplete(true);
  };
  const closeComplete = () => setComplete(false);

  const handleRemark = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemark(e.target.value);
  };

  const comRequest = () => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) {
      return;
    }

    const completeInfo = {
      requestId: activeRequest!.id,
      remark,
    };
    store.dispatch(maintenance.CompleteMRequest(completeInfo));
    setComplete(false);
    setRemark("");
    setActiveRequest(undefined);
  };

  return (
    <Box my={1}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Pending Maintenance Requests
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （Requests from production for maintenance issue that reviewed by
          maintenance)
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Request No</TableCell>
              <TableCell align="right">Section</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PendingRequests.map((request, index) => (
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
                <TableCell align="right">{request.section}</TableCell>
                <TableCell align="right">{`${index} day ago`}</TableCell>
                <TableCell align="right">
                  {request.status !== "received" && (
                    <IconButton
                      edge="end"
                      aria-label="receive"
                      value={request.id}
                      onClick={openComplete}
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
      <ModalMainRequest
        mode="complete"
        request={activeRequest}
        open={open}
        handleClose={handleClose}
        requests={[]}
      />
      <Modal
        open={complete}
        onClose={closeComplete}
        aria-labelledby="issue-modal-title"
        aria-describedby="issue-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Complete Details
          </Typography>
          <TextField
            fullWidth
            sx={{ my: 2 }}
            id="outlined-disabled"
            label="Action"
            value={remark}
            onInput={handleRemark}
          />
          <Button sx={{ mx: 1 }} variant="contained" onClick={comRequest}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default MainRequestPen;
