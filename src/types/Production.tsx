import * as ProductionConstant from "../constants/Production";

export type Section = {
  name: string;
  process: string;
};

export type SectionModel = Section & {
  id: string;
  planning: number;
};

export type AddSection = {
  type: typeof ProductionConstant.ADD_SECTION;
  payload: SectionModel;
};

export type DelSection = {
  type: typeof ProductionConstant.DEL_SECTION;
  payload: string;
};

export type Machine = {
  name: string;
  section: string;
};

export type MachienModel = Machine & {
  id: string;
};

export type AddMachine = {
  type: typeof ProductionConstant.ADD_MACHINE;
  payload: MachienModel;
};

export type DelMachine = {
  type: typeof ProductionConstant.DEL_MACHINE;
  payload: string;
};

// export type ComponentProfile = {
//   id: string;
//   process: Array<ProcessCode>;
// };

export type MachineProfile = {
  id: string;
};

export type ProcessProfile = {
  component: Component;
  machine: MachineProfile;
  processId: string;
};

// export type ComponentProcessInfo = {
//   id: string;
//   status: "completed" | "pending";
//   process: Array<ProcessCode>;
// };

export type StartProcess = {
  type: typeof ProductionConstant.START_PROCESS;
  payload: Component;
};

export type CompleteProcess = {
  type: typeof ProductionConstant.COMPLETE_PROCESS;
  payload: Component;
};

export type ProcessCode = {
  process: string;
  complete: boolean;
  machine: string;
};

export type NewComponent = {
  quantity?: number;
  productId: string;
  name: string;
  status: "completed" | "pending";
  process: Array<ProcessCode>;
};

export type Component = Omit<NewComponent, "quantity"> & {
  id: string;
};

export type AddComponent = {
  type: typeof ProductionConstant.ADD_COMPONENT;
  payload: Array<Component>;
};

export type Planing = {
  sectionId: string;
  quantity: number;
};

export type HandlePlanning = {
  type: typeof ProductionConstant.HANDLE_PLANNING;
  payload: Planing;
};

export type ProductionState = {
  sections: Array<SectionModel>;
  machines: Array<MachienModel>;
  components: Array<Component>;
};

export type ProductionAction =
  | AddSection
  | DelSection
  | AddMachine
  | DelMachine
  | StartProcess
  | CompleteProcess
  | AddComponent
  | HandlePlanning;
