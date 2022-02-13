import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function PurchaseDashBoard({ items }) {
    const columns = ["ID", "Name", "Stock", "Request"].map(field => {
        return {
            field: field.toLowerCase(),
            headerName: field,
            width: 150,
            type: ["Stock", "Request"].includes(field) ? "number" : "string",
            editable: true
        };
    });

    const rows = items.map(item => {
        const idComp = item.id.split("-");

        return {
            id: idComp[0],
            name: item.name,
            stock: item.stock,
            request: 10
        };
    });

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            <Box my={2}>
                <Typography variant="h4" gutterBottom component="div">
                    Item List
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    （A list contain all the item that available for purchase)
                </Typography>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </Box>
    );
}

export default PurchaseDashBoard;
