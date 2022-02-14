import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Engineer from "../actions/EngineerAction";
import store from "../store";
import { RootState } from "../store";

import Grid from "@mui/material/Grid";
import MenuCol from "../components/MenuCol";
import RndProduct from "./RndProduct";
import PrimaryAdd from "../components/PrimaryAdd";

function Engineering() {
  const match = useRouteMatch();

  return (
    <Grid sx={{ marginTop: "100px" }} container spacing={2}>
      <MenuCol route={`${match.url}/material`} title="Material" />
      <MenuCol route={`${match.url}/process`} title="Process" />
      <MenuCol route={`${match.url}/product`} title="Product" />
      <MenuCol route={""} title="Back" />
    </Grid>
  );
}

function Rnd() {
  const match = useRouteMatch();
  const EngineerAsset = useSelector((state: RootState) => state.engineer);

  const AddMaterial = () => {
    const ContentName = document.getElementById(
      "ContentName"
    ) as HTMLInputElement;
    store.dispatch(Engineer.AddMaterial(ContentName!.value));
    ContentName.value = "";
  };

  const DelMaterial = (e: React.MouseEvent<HTMLButtonElement>) => {
    const code = e.currentTarget.value;
    store.dispatch(Engineer.DelMaterial(code));
  };

  const AddProcess = () => {
    const ContentName = document.getElementById(
      "ContentName"
    ) as HTMLInputElement;
    store.dispatch(Engineer.AddProcess(ContentName.value));
    ContentName.value = "";
  };

  const DelProcess = (e: React.MouseEvent<HTMLButtonElement>) => {
    const code = e.currentTarget.value;
    store.dispatch(Engineer.DelProcess(code));
  };

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/material`}>
          <PrimaryAdd
            title="Material"
            Assets={EngineerAsset.materials}
            AddAsset={AddMaterial}
            DelAsset={DelMaterial}
          />
        </Route>
        <Route path={`${match.path}/process`}>
          <PrimaryAdd
            title="Process"
            Assets={EngineerAsset.processes}
            AddAsset={AddProcess}
            DelAsset={DelProcess}
          />
        </Route>
        <Route path={`${match.path}/product`}>
          <RndProduct Assets={EngineerAsset} />
        </Route>
        <Route path={match.path} component={Engineering} />
      </Switch>
    </div>
  );
}

export default Rnd;
