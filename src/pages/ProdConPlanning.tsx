import * as prod from "../actions/ProductionAction";
import store from "../store";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function ProdConPlanning({ sections }) {

    const handleChangePlan = (e)=>{
        const index = e.currentTarget.value
        const sectionId = sections[index].id
        const quantity = document.getElementById(`input_${index}`).value

        store.dispatch(prod.HandlePlanning(sectionId, quantity))
    }

    return (
        <Box>
            <Box>
                <Typography variant="h4" gutterBottom component="div">
                    Production Planning
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    （Provide planning/instruction to production whether what they need to be done)
                </Typography>
            </Box>
            {sections.map((section, index) => {
                return (
                    <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        my={4}
                    >
                        <Typography  sx={{ width: "95px" }} variant="h6" gutterBottom component="div">
                            {section.name}
                        </Typography>
                        <TextField
                            sx={{ width: "350px" }}
                            id={`input_${index}`}
                            label="Component No"
                            variant="filled"
                            defaultValue={section.planning}
                        />
                        <Button
                            variant="contained"
                            sx={{ width: "110px" }}
                            value={index}
                            onClick={handleChangePlan}
                        >
                            Confirm
                        </Button>
                    </Box>
                );
            })}
        </Box>
    );
}

export default ProdConPlanning;
