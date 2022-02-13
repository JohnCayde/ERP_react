import { useState } from "react";
import * as prod from "../actions/ProductionAction";
import store from "../store";
import * as ProductionTypes from "../types/Production";
import * as EngineerTypes from "../types/Engineer";

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

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

function ProdClerkSection({
  sections,
  processes,
}: {
  sections: Array<ProductionTypes.SectionModel>;
  processes: Array<EngineerTypes.ProcessModel>;
}) {
  //state
  const [open, setOpen] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [process, setProcess] = useState("");
  //function
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSectionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value);
  };

  const handleProcess = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setProcess(e.target.value);
  };

  const addSection = () => {
    const section = {
      name: sectionName,
      process: process,
    };

    store.dispatch(prod.AddSection(section));
  };

  const delSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const sectionId = (e.target as HTMLInputElement).value;
    store.dispatch(prod.DelSection(sectionId));
  };

  return (
    <Box>
      <Box my={2}>
        <Typography variant="h4" gutterBottom component="div">
          Production Section List
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （Place to add/remove production section from the list)
        </Typography>
      </Box>
      <Box>
        <Button sx={{ mr: 2 }} variant="contained" onClick={handleOpen}>
          New Section
        </Button>
      </Box>
      <Box my={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Section Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Process</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sections.map((section, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {section.id.split("-")[0]}
                  </TableCell>
                  <TableCell align="right">{section.name}</TableCell>
                  <TableCell align="right">{section.process}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="details"
                      value={section.id}
                      onClick={delSection}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="new-modal-title"
        aria-describedby="new-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography
              id="new-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              New Section
            </Typography>
          </Box>
          <Box>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              value={sectionName}
              onInput={handleSectionName}
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="ProcessLabel">Process</InputLabel>
              <Select
                labelId="ProcessLabel"
                id="demo-simple-select"
                value={process}
                label="Process"
                onChange={handleProcess}
              >
                {processes.map((process, idx) => {
                  return (
                    <MenuItem value={process.id} key={idx}>
                      {process.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button variant="contained" onClick={addSection}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ProdClerkSection;
