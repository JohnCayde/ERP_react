import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ProdConMonitor({ sections, components }) {
    const sectionStatistic = sections.map(section => {
        const sectionComponent = components.filter(component => {
            //component that exist in the section
            const processIndex = component.process.findIndex(
                comp => comp.process == section.process
            );
            if (processIndex == -1) {
                return false;
            }

            if (processIndex == 0) {
                if (!component.process[processIndex + 1].complete) {
                    return true;
                }
            } else {
                if (component.process[processIndex - 1].complete) {
                    return true;
                }
            }
        });

        const completedComponent = sectionComponent.filter(
            //component that is complete process, no matter previous process or current process
            component => component.status == "completed"
        );

        const pendingComponent = completedComponent.filter(component => {
            //component that is complete previous process
            const processIndex = component.process.findIndex(
                prs => prs.process == section.process
            );

            return !component.process[processIndex].complete;
        });

        const processingComponent = sectionComponent.filter(
            //component that is currently processing
            component => component.status == "pending"
        );

        return {
            ...section,
            pending: pendingComponent,
            processing: processingComponent
        };
    });

    return (
        <Box>
            <Box>
                <Typography variant="h4" gutterBottom component="div">
                    Production Monitoring
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    （To monitor production status/progress)
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Section</TableCell>
                            <TableCell align="right">Planning</TableCell>
                            <TableCell align="right">Pending</TableCell>
                            <TableCell align="right">Process</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sectionStatistic.map((section, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {section.name}
                                </TableCell>
                                <TableCell align="right">
                                    {section.planning}
                                </TableCell>
                                <TableCell align="right">
                                    {section.pending.length}
                                </TableCell>
                                <TableCell align="right">
                                    {section.processing.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProdConMonitor;
