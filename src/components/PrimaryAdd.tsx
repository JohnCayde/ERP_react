import { useHistory } from "react-router-dom";
import * as EngineerTypes from "../types/Engineer";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function PrimaryAdd({
  title,
  Assets,
  AddAsset,
  DelAsset,
}: {
  title: string;
  Assets: Array<EngineerTypes.MaterialModel>;
  AddAsset: () => void;
  DelAsset: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const history = useHistory();

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 15 }}>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          {`${title} List`}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {`(To add/remove ${title} from the list)`}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Available {title}
          </Typography>
          <Demo>
            <List>
              {Assets.map((asset, idx) => {
                return (
                  <ListItem
                    sx={{ border: "solid 2px" }}
                    key={idx}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={DelAsset}
                        value={asset.id}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={asset.name} />
                  </ListItem>
                );
              })}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={7}>
          <Box width="100%" marginTop={12} padding={1}>
            <TextField
              sx={{ width: "100%" }}
              id="ContentName"
              label={`${title} Name`}
              variant="outlined"
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" p={1}>
            <Button
              sx={{ mx: 1 }}
              variant="contained"
              color="warning"
              onClick={() => history.goBack()}
            >
              Back
            </Button>
            <Button sx={{ mx: 1 }} variant="contained" onClick={AddAsset}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PrimaryAdd;
