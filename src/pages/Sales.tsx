import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Grid from "@mui/material/Grid";

import MenuCol from "../components/MenuCol";
import SalesCustomer from "./SalesCustomer";
import SalesOrder from "./SalesOrder";

function Sales() {
  const match = useRouteMatch();
  const sales = useSelector((state: RootState) => state.sales);

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/customer`}>
          <SalesCustomer customers={sales.customers} />
        </Route>
        <Route path={`${match.path}/order`}>
          <SalesOrder Assets={sales} />
        </Route>
        <Route path={match.path}>
          <Grid sx={{ marginTop: "100px" }} container spacing={2}>
            <MenuCol route={`${match.url}/customer`} title="Customer" />
            <MenuCol route={`${match.url}/order`} title="Order" />
            <MenuCol route={""} title="Back" />
          </Grid>
        </Route>
      </Switch>
    </div>
  );
}

export default Sales;
