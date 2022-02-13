import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function MenuCol({ route, title }) {

    const Department = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        borderRadius: 50,
        backgroundColor: title == "Back" ? "#EEC989": "#33B1F9" 
    }));

    return (
        <Grid item xs={4}>
            <Link to={route} style={{ textDecoration: "none" }}>
                <Department>{title}</Department>
            </Link>
        </Grid>
    );
}
