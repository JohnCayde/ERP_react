import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Grid from "@mui/material/Grid";
import MenuCol from "../components/MenuCol";
import MaterialStore from "./StoreMaterial";
import StoreFG from "./StoreFG";

function Store() {
  const match = useRouteMatch();
  const storeAssets = useSelector((state: RootState) => state.store);

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/material`}>
          <MaterialStore
            requests={storeAssets.requests}
            matstore={storeAssets.matstore}
          />
        </Route>
        <Route path={`${match.path}/finishgood`}>
          <StoreFG
            transaction={storeAssets.transaction}
            finsihGoodStore={storeAssets.fgstore}
          />
        </Route>
        <Route path={match.path}>
          <Grid sx={{ marginTop: "100px" }} container spacing={2}>
            <MenuCol route={`${match.url}/material`} title="Material" />
            <MenuCol route={`${match.url}/finishgood`} title="Finish Good" />
            <MenuCol route={""} title="Back" />
          </Grid>
        </Route>
      </Switch>
    </div>
  );
}

export default Store;
