import * as QcTypes from "../types/Qc";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
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

function ModalIssueNote({
  note,
  open,
  handleClose,
}: {
  note: (QcTypes.NoteModel & { no: string }) | undefined;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
          Issue Note Details
        </Typography>
        <TextField
          fullWidth
          disabled
          sx={{ my: 2 }}
          id="outlined-disabled"
          label="Section"
          defaultValue={note && note.section}
        />
        <TextField
          fullWidth
          disabled
          sx={{ my: 2 }}
          id="outlined-disabled"
          label="Component"
          defaultValue={note && note.component}
        />
        <TextField
          fullWidth
          disabled
          sx={{ my: 2 }}
          id="outlined-disabled"
          label="Component"
          defaultValue={note && note.action}
        />
        <TextField
          fullWidth
          disabled
          sx={{ my: 2 }}
          id="outlined-disabled"
          label="Status"
          defaultValue={note && note.status}
        />
        <TextField
          fullWidth
          disabled
          sx={{ my: 2 }}
          id="outlined-disabled"
          label="Status"
          defaultValue={note && note.details}
        />
      </Box>
    </Modal>
  );
}

export default ModalIssueNote;
