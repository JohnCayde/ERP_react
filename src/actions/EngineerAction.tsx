import { v4 as uuidv4 } from "uuid";
import * as EngineerConstant from "../constants/Engineer";
import * as EngineerTypes from "../types/Engineer";

export function AddMaterial(materialName: string): EngineerTypes.AddMaterial {
  const material: EngineerTypes.MaterialModel = {
    id: uuidv4(),
    name: materialName,
  };

  return {
    type: EngineerConstant.ADD_MATERIAL,
    payload: material,
  };
}

export function DelMaterial(materialId: string): EngineerTypes.DelMaterial {
  return {
    type: EngineerConstant.DEL_MATERIAL,
    payload: materialId,
  };
}

export function AddProcess(processName: string): EngineerTypes.AddProcess {
  const process: EngineerTypes.ProcessModel = {
    id: uuidv4(),
    name: processName,
  };

  return {
    type: EngineerConstant.ADD_PROCESS,
    payload: process,
  };
}

export function DelProcess(processId: string): EngineerTypes.DelProcess {
  return {
    type: EngineerConstant.DEL_PROCESS,
    payload: processId,
  };
}

export function AddProcedure(
  procedure: EngineerTypes.Procedure
): EngineerTypes.AddProcedure {
  const newProcedure = {
    ...procedure,
    id: uuidv4(),
  };

  return {
    type: EngineerConstant.ADD_PROCEDURE,
    payload: newProcedure,
  };
}

export function DelProcedure(procedureId: string): EngineerTypes.DelProcedure {
  return {
    type: EngineerConstant.DEL_PROCEDURE,
    payload: procedureId,
  };
}
