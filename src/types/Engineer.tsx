import * as EngineerConstant from "../constants/Engineer";

export type ProductModel = {
  id: string;
  name: string;
};

export type MaterialModel = {
  id: string;
  name: string;
};

export type AddMaterial = {
  type: typeof EngineerConstant.ADD_MATERIAL;
  payload: MaterialModel;
};

export type DelMaterial = {
  type: typeof EngineerConstant.DEL_MATERIAL;
  payload: string;
};

export type ProcessModel = {
  id: string;
  name: string;
};

export type ProcessCode = { id: string; code: string; name?: string };

export type AddProcess = {
  type: typeof EngineerConstant.ADD_PROCESS;
  payload: ProcessModel;
};

export type DelProcess = {
  type: typeof EngineerConstant.DEL_PROCESS;
  payload: string;
};

export type Procedure = {
  name: string;
  material: string;
  processes: Array<ProcessCode>;
};

export type ProcedureModel = {
  id: string;
  name: string;
  material: string;
  processes: Array<ProcessCode>;
};

export type AddProcedure = {
  type: typeof EngineerConstant.ADD_PROCEDURE;
  payload: ProcedureModel;
};

export type DelProcedure = {
  type: typeof EngineerConstant.DEL_PROCEDURE;
  payload: string;
};

export type EngineerState = {
  products: Array<ProductModel>;
  processes: Array<ProcessModel>;
  materials: Array<MaterialModel>;
  procedures: Array<ProcedureModel>;
};

export type EngineerAction =
  | AddMaterial
  | DelMaterial
  | AddProcess
  | DelProcess
  | AddProcedure
  | DelProcedure;
