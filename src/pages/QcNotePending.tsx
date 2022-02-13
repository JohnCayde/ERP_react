import { useState } from "react";
import * as qc from "../actions/QcAction";
import store from "../store";
import * as QcTypes from "../types/Qc";

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

import ModalIssueNote from "../components/ModalIssueNote";

function QcNotePending({
  notes,
}: {
  notes: Array<QcTypes.NoteModel & { no: string }>;
}) {
  const pendingNotes = notes.filter((note) => note.status == "pending");

  const [open, setOpen] = useState(false);
  const [activeNote, setActiveNote] = useState<
    (QcTypes.NoteModel & { no: string }) | undefined
  >(undefined);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const noteId = e.currentTarget.value;
    const issueNote = notes.find((note) => note.id == noteId);
    setActiveNote(issueNote);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const delNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmation = confirm("Are you sure?");
    if (!confirmation) {
      return;
    }

    const noteId = e.currentTarget.value;
    store.dispatch(qc.DelNote(noteId));
  };

  const comNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmation = confirm("Are you sure?");
    if (!confirmation) {
      return;
    }

    const noteId = e.currentTarget.value;
    store.dispatch(qc.ComNote(noteId));
  };

  return (
    <Box my={1}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Pending Issue Note
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （All the issue notes that are pending for resolve)
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Note Id</TableCell>
              <TableCell align="right">Section</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Component</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingNotes.map((note, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {note?.no}
                </TableCell>
                <TableCell align="right">{note.section}</TableCell>
                <TableCell align="right">{`${index} day ago`}</TableCell>
                <TableCell align="right">{note.component}</TableCell>
                <TableCell align="right">{note.action}</TableCell>
                <TableCell align="right">{note.status}</TableCell>
                <TableCell align="right">
                  {note.status != "received" && (
                    <IconButton
                      edge="end"
                      aria-label="receive"
                      value={note.id}
                      onClick={comNote}
                    >
                      <AssignmentReturnedIcon />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    aria-label="details"
                    value={note.id}
                    onClick={handleOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    value={note.id}
                    onClick={delNote}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalIssueNote
        note={activeNote!}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}

export default QcNotePending;
