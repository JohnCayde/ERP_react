import { useState } from "react";
import * as prod from "../actions/ProductionAction";
import store from "../store";
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

function ProdClerkMachine({
  machines,
  sections,
}: {
  machines: Array<ProductionTypes.MachienModel>;
  sections: Array<ProductionTypes.SectionModel>;
}) {
  //state
  const [open, setOpen] = useState(false);
  const [machineName, setMachineName] = useState("");
  const [section, setSection] = useState("");
  //function
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMachineName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMachineName(e.target.value);
  };

  const handleSection = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setSection(e.target.value);
  };

  const addMachine = () => {
    const machine = {
      name: machineName,
      section: section,
    };

    store.dispatch(prod.AddMachine(machine));
  };

  const delMachine = (e: React.MouseEvent<HTMLButtonElement>) => {
    const machineId = (e.target as HTMLInputElement).value;
    store.dispatch(prod.DelMachine(machineId));
  };

  return (
    <Box>
      <Box my={2}>
        <Typography variant="h4" gutterBottom component="div">
          Production Machine List
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          （Place to add/remove production machine from the list)
        </Typography>
      </Box>
      <Box>
        <Button sx={{ mr: 2 }} variant="contained" onClick={handleOpen}>
          New Machine
        </Button>
      </Box>
      <Box my={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Machine Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Section</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {machines.map((machine, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {machine.id.split("-")[0]}
                  </TableCell>
                  <TableCell align="right">{machine.name}</TableCell>
                  <TableCell align="right">{machine.section}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      edge="end"
                      aria-label="details"
                      value={machine.id}
                      onClick={delMachine}
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
              value={machineName}
              onInput={handleMachineName}
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="SectionLabel">Section</InputLabel>
              <Select
                labelId="SectionLabel"
                id="demo-simple-select"
                value={section}
                label="Section"
                onChange={handleSection}
              >
                {sections.map((section, idx) => {
                  return (
                    <MenuItem value={section.id} key={idx}>
                      {section.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button variant="contained" onClick={addMachine}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ProdClerkMachine;
