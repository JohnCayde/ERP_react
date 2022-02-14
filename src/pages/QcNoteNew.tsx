import { useState } from "react";
import * as qc from "../actions/QcAction";
import store from "../store";
import * as QcTypes from "../types/Qc";
import * as ProductionTypes from "../types/Production";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function QcNoteNew({
  sections,
}: {
  sections: Array<ProductionTypes.SectionModel>;
}) {
  const [section, setSection] = useState("");
  const [component, setComponent] = useState("");
  const [action, setAction] = useState("");
  const [details, setDetails] = useState("");

  const handleSection = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setSection(e.target.value);
  };

  const handleComponent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComponent(e.target.value);
  };

  const handleAction = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
  ) => {
    setAction(e.target.value);
  };

  const handleDetail: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    setDetails((e.target as HTMLInputElement).value);
  };

  const addIssueNote = () => {
    const note: QcTypes.Note = {
      section,
      status: "pending",
      component,
      details,
      action,
    };

    store.dispatch(qc.AddNote(note));
    setSection("");
    setComponent("");
    setAction("");
    setDetails("");
  };

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 15 }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              align="center"
            >
              New Issue Note
            </Typography>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              align="center"
            >
              （Open new issue note)
            </Typography>
          </Box>
          <Box width="100%" padding={1}>
            <FormControl fullWidth>
              <InputLabel id="SectionLabel">Section</InputLabel>
              <Select
                labelId="SectionLabel"
                id="section-select"
                value={section}
                label="Section"
                onChange={handleSection}
              >
                {sections.map((sct, idx) => {
                  return (
                    <MenuItem value={sct.id} key={idx}>
                      {sct.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box width="100%" padding={1} display="flex">
            <TextField
              fullWidth
              id="componentno"
              label={`Component No`}
              variant="outlined"
              type="text"
              onInput={handleComponent}
              value={component}
            />
          </Box>
          <Box width="100%" padding={1}>
            <FormControl fullWidth>
              <InputLabel id="ActionLabel">Action</InputLabel>
              <Select
                labelId="ActionLabel"
                id="action-select"
                value={action}
                label="Action"
                onChange={handleAction}
              >
                <MenuItem value="downgrade">{"Downgrade"}</MenuItem>
                <MenuItem value="repair">{"Repair"}</MenuItem>
                <MenuItem value="decompose">{"Decompose"}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box marginTop={12} display="flex" justifyContent="flex-end" p={1}>
            <Button sx={{ mx: 1 }} variant="contained" onClick={addIssueNote}>
              Submit
            </Button>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ mt: 7, mb: 2 }} variant="h6" component="div">
            Issue Details
          </Typography>
          <TextareaAutosize
            aria-label="Issue Details"
            minRows={10}
            style={{ width: 200 }}
            value={details}
            onInput={handleDetail}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default QcNoteNew;
