import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import HowTo from "./pages/HowTo";
import Production from "./pages/Prod";
import ProductionControl from "./pages/PdCon";
import Purchasing from "./pages/Purchasing";
import QualityControl from "./pages/QualityControl";
import Rnd from "./pages/Rnd";
import Store from "./pages/Store";
import Maintenance from "./pages/Maintenance";
import Sales from "./pages/Sales";
import MenuCol from "./components/MenuCol";
import Fab from "@mui/material/Fab";
import HomeIcon from "@mui/icons-material/Home";

export default function Main() {
  const backHome = () => {
    window.location.href = "/";
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        <CssBaseline />
        <Fab color="primary" aria-label="add" onClick={backHome}>
          <HomeIcon />
        </Fab>
        <Container>
          <Router>
            <Switch>
              <Route path="/howto" component={HowTo} />
              <Route path="/store" component={Store} />
              <Route path="/rnd" component={Rnd} />
              <Route path="/prodcon" component={ProductionControl} />
              <Route path="/prod" component={Production} />
              <Route path="/purchase" component={Purchasing} />
              <Route path="/qc" component={QualityControl} />
              <Route path="/maintenance" component={Maintenance} />
              <Route path="/sales" component={Sales} />
              <Route path="/">
                <Grid sx={{ marginTop: "100px" }} container spacing={2}>
                  <MenuCol route="/howto" title="How to" />
                  <MenuCol route="/store" title="Store" />
                  <MenuCol route="/rnd" title="R&D" />
                  <MenuCol route="/prodcon" title="Production Control" />
                  <MenuCol route="/prod" title="Production" />
                  <MenuCol route="/purchase" title="Purchasing" />
                  <MenuCol route="/qc" title="Quanlity Control" />
                  <MenuCol route="/maintenance" title="Maintenance" />
                  <MenuCol route="/sales" title="Sales" />
                </Grid>
              </Route>
            </Switch>
          </Router>
        </Container>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
