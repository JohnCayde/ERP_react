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
import Typography from "@mui/material/Typography";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalIssueNote from "../components/ModalIssueNote";

function QcDashBoard({notes}) {

    const [open, setOpen] = useState(false);
    const [activeNote, setActiveNote] = useState({});

    const handleOpen = e => {
        const noteId = e.currentTarget.value;
        const issueNote = notes.find(note => note.id == noteId);
        setActiveNote(issueNote);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    return (
        <Box my={1}>
            <Box>
                <Typography variant="h4" gutterBottom component="div">
                    QC Issue Note
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    （All the available issue notes)
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
                    {notes.map((note, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {note.no}
                                </TableCell>
                                <TableCell align="right">
                                    {note.section}
                                </TableCell>
                                <TableCell align="right">
                                    {`${index} day ago`}
                                </TableCell>
                                <TableCell align="right">
                                    {note.component}
                                </TableCell>
                                <TableCell align="right">
                                    {note.action}
                                </TableCell>
                                <TableCell align="right">
                                    {note.status}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        edge="end"
                                        aria-label="details"
                                        value={note.id}
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
            <ModalIssueNote note={activeNote} open={open} handleClose={handleClose}/>
        </Box>
    )
}

export default QcDashBoard
