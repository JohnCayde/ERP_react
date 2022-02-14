import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Grid from "@mui/material/Grid";
import MenuCol from "../components/MenuCol";
import ProdClerk from "./ProdClerk";
import ProdWork from "../components/ProdWork";

function Production() {
  const match = useRouteMatch();
  const production = useSelector((state: RootState) => state.production);
  const engineer = useSelector((state: RootState) => state.engineer);
  const maintenance = useSelector((state: RootState) => state.maintenance);
  const store = useSelector((state: RootState) => state.store);
  const purchasing = useSelector((state: RootState) => state.purchasing);

  const sections = production.sections.map((section) => {
    const processProfile = engineer.processes.find(
      (process) => process.id === section.process
    );
    return {
      ...section,
      process: processProfile!.name,
      processId: processProfile!.id,
    };
  });

  const machines = production.machines.map((machine) => {
    const sectionProfile = sections.find(
      (section) => section.id === machine.section
    );
    return {
      ...machine,
      section: sectionProfile!.name,
      sectionId: sectionProfile!.id,
    };
  });

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/clerk`}>
          <ProdClerk
            sections={sections}
            machines={machines}
            processes={engineer.processes}
          />
        </Route>
        {sections.map((section, index) => {
          return (
            <Route path={`${match.path}/${section.name}`} key={index}>
              <ProdWork
                section={section}
                components={production.components}
                machines={machines}
                maintenance={maintenance.requests}
                matstore={store.requests}
                items={purchasing.items}
              />
            </Route>
          );
        })}
        <Route path={match.path}>
          <Grid sx={{ marginTop: "100px" }} container spacing={2}>
            <MenuCol route={`${match.url}/clerk`} title="Clerk" />
            {sections.map((section, index) => {
              return (
                <MenuCol
                  route={`${match.url}/${section.name}`}
                  title={section.name}
                  key={index}
                />
              );
            })}
            <MenuCol route={""} title="Back" />
          </Grid>
        </Route>
      </Switch>
    </div>
  );
}

export default Production;
