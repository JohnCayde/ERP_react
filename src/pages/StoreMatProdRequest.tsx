import { useState } from "react";
import * as matStore from "../actions/StoreAction";
import store from "../store";

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

import ModalRequestDetails from "../components/ModalRequestDetails";

function StoreMatProdRequest({requests}) {

     //state
     const [open, setOpen] = useState(false);
     const [activeRequest, setActiveRequest] = useState({});
 
     //function
     const handleOpen = e => {
         const requestId = e.currentTarget.value;
         const req = requests.find(request => request.id == requestId);
         setActiveRequest({items:[{name:req.item, quantity:req.quantity}]});
         setOpen(true);
     };
     const handleClose = e => setOpen(false);
 
     const reviewRequest = e => {
         const requestId = e.currentTarget.value;
         store.dispatch(matStore.ReviewMatRequest(requestId))
     };
 
     return (
         <Box my={1}>
             <Box>
                <Typography variant="h4" gutterBottom component="div">
                    Material Request
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    （Material request from production)
                </Typography>
            </Box>
             <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                         <TableRow>
                             <TableCell>Request Id</TableCell>
                             <TableCell align="right">Section</TableCell>
                             <TableCell align="right">Date</TableCell>
                             <TableCell align="right">Status</TableCell>
                             <TableCell align="right">Details</TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>
                         {requests.map((request, index, origin) => (
                             <TableRow
                                 key={index}
                                 sx={{
                                     "&:last-child td, &:last-child th": {
                                         border: 0
                                     }
                                 }}
                             >
                                 <TableCell component="th" scope="row">
                                     {request.id.split("-")[0]}
                                 </TableCell>
                                 <TableCell align="right">
                                     {request.section}
                                 </TableCell>
                                 <TableCell align="right">
                                     {`${origin.length - index} day ago`}
                                 </TableCell>
                                 <TableCell align="right">
                                     {request.status}
                                 </TableCell>
                                 <TableCell align="right">
                                     {request.status =="pending"  && <IconButton
                                         edge="end"
                                         aria-label="review"
                                         value={request.id}
                                         onClick={reviewRequest}
                                     >
                                         <AssignmentReturnedIcon />
                                     </IconButton>}
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
             <ModalRequestDetails
                 request={activeRequest}
                 open={open}
                 handleClose={handleClose}
             />
         </Box>
     );
}

export default StoreMatProdRequest
