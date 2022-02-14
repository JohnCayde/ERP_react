import { v4 as uuidv4 } from "uuid";
import * as ProductionConstant from "../constants/Production";
import * as ProductionTypes from "../types/Production";

export function AddSection(
  section: ProductionTypes.Section
): ProductionTypes.AddSection {
  const sec: ProductionTypes.SectionModel = {
    ...section,
    id: uuidv4(),
    planning: 0,
  };

  return {
    type: ProductionConstant.ADD_SECTION,
    payload: sec,
  };
}

export function DelSection(sectionId: string): ProductionTypes.DelSection {
  return {
    type: ProductionConstant.DEL_SECTION,
    payload: sectionId,
  };
}

export function AddMachine(
  machine: ProductionTypes.Machine
): ProductionTypes.AddMachine {
  const mac: ProductionTypes.MachienModel = {
    ...machine,
    id: uuidv4(),
  };

  return {
    type: ProductionConstant.ADD_MACHINE,
    payload: mac,
  };
}

export function DelMachine(machineId: string): ProductionTypes.DelMachine {
  return {
    type: ProductionConstant.DEL_MACHINE,
    payload: machineId,
  };
}

export function StartProcess(
  profile: ProductionTypes.ProcessProfile
): ProductionTypes.StartProcess {
  const process = profile.component.process.map((prs) => {
    if (prs.process === profile.processId) {
      return {
        ...prs,
        machine: profile.machine.id,
      };
    }
    return prs;
  });

  const component: ProductionTypes.Component = {
    ...profile.component,
    status: "pending",
    process,
  };

  return {
    type: ProductionConstant.START_PROCESS,
    payload: component,
  };
}

export function CompleteProcess(
  profile: ProductionTypes.ProcessProfile
): ProductionTypes.CompleteProcess {
  const process = profile.component.process.map((prs) => {
    if (prs.process === profile.processId) {
      prs.complete = true;
      prs.machine = profile.machine.id;
    }
    return prs;
  });

  const component: ProductionTypes.Component = {
    ...profile.component,
    status: "completed",
    process,
  };

  return {
    type: ProductionConstant.COMPLETE_PROCESS,
    payload: component,
  };
}

export function AddComponent(
  newComponent: Array<ProductionTypes.NewComponent>
): ProductionTypes.AddComponent {
  const components = newComponent.flatMap((newCom) => {
    const quantity = newCom.quantity!;
    delete newCom.quantity;
    const coms = [];
    for (let i = 0; i < quantity; i++) {
      coms.push({
        id: uuidv4(),
        ...newCom,
      });
    }
    return coms;
  });

  return {
    type: ProductionConstant.ADD_COMPONENT,
    payload: components,
  };
}

export function HandlePlanning(
  sectionId: string,
  quantity: number
): ProductionTypes.HandlePlanning {
  return {
    type: ProductionConstant.HANDLE_PLANNING,
    payload: {
      sectionId,
      quantity,
    },
  };
}
