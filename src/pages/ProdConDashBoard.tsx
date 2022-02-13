import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ProdConDashBoard({ products, pending, processing, prodStock, stock }) {
    let components = products.map(product => {
        return {
            ...product,
            pending: 0,
            processing: 0,
            prodStock: 0,
            stock: 0
        };
    });

    for (let i = 0; i < pending.length; i++) {
        const idx = components.findIndex(
            component => component.id == pending[i].productId
        );
        components[idx].pending += 1;
    }

    for (let i = 0; i < processing.length; i++) {
        const idx = components.findIndex(
            component => component.id == processing[i].productId
        );
        components[idx].processing += 1;
    }

    for (let i = 0; i < prodStock.length; i++) {
        const idx = components.findIndex(
            component => component.id == prodStock[i].productId
        );
        components[idx].prodStock += 1;
    }

    for (let i = 0; i < stock.length; i++) {
        const idx = components.findIndex(
            component => component.id == stock[i].productId
        );
        components[idx].stock += 1;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Pending</TableCell>
                        <TableCell align="right">Processing</TableCell>
                        <TableCell align="right">Production Stock</TableCell>
                        <TableCell align="right">Store Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {components.map((component, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0
                                }
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {component.name}
                            </TableCell>
                            <TableCell align="right">
                                {component.pending}
                            </TableCell>
                            <TableCell align="right">
                                {component.processing}
                            </TableCell>
                            <TableCell align="right">
                                {component.prodStock}
                            </TableCell>
                            <TableCell align="right">
                                {component.stock}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProdConDashBoard;
