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

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";

import ModalMainRequest from "../components/ModalMainRequest";

function MainRequest({
  requests,
  sections,
}: {
  requests: Array<MaintenanceTypes.MRequest>;
  sections: Array<ProductionTypes.SectionModel>;
}) {
  const NewRequests = requests
    .filter((request) => request.status === "pending")
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
  const [activeRequest, setActiveRequest] = useState<
    (MaintenanceTypes.MRequest & { no: string }) | undefined
  >(undefined);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const requestId = e.currentTarget.value;
    const req = NewRequests.find((request) => request.id === requestId);
    setActiveRequest(req);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const revRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) {
      return;
    }
    const requestId = e.currentTarget.value;
    store.dispatch(maintenance.ReviewMRequest(requestId));
  };

  return (
    <Box my={1}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Incoming Maintenance Requests
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （Requests from production for maintenance issue that are not yet
          review by maintenance)
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
            {NewRequests.map((request, index) => (
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
                      onClick={revRequest}
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
        mode="review"
        request={activeRequest}
        open={open}
        handleClose={handleClose}
        requests={[]}
      />
    </Box>
  );
}

export default MainRequest;
