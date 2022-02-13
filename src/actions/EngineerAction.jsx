import { v4 as uuidv4 } from 'uuid'

export const ADD_MATERIAL = "ADD_MATERIAL"
export const DEL_MATERIAL = "DEL_MATERIAL"
export const ADD_PROCESS = "ADD_PROCESS"
export const DEL_PROCESS = "DEL_PROCESS"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const DEL_PRODUCT = "DEL_PRODUCT"
export const ADD_PROCEDURE = "ADD_PROCEDURE"
export const DEL_PROCEDURE = "DEL_PROCEDURE"

export function AddMaterial(materialName){
    const material = {
        id: uuidv4(),
        name: materialName
    }

    return {
        type: ADD_MATERIAL,
        payload: material
    }
}

export function DelMaterial(materialId){
    return {
        type: DEL_MATERIAL,
        payload: materialId
    }
}

export function AddProcess(processName){
    const process = {
        id: uuidv4(),
        name: processName
    }

    return {
        type: ADD_PROCESS,
        payload: process
    }
}

export function DelProcess(processId){
    return {
        type: DEL_PROCESS,
        payload: processId
    }
}

export function AddProcedure(procedure){
    const newProcedure ={
        ...procedure,
        id: uuidv4()
    }

    return {
        type: ADD_PROCEDURE,
        payload: newProcedure
    }
}

export function DelProcedure(procedureId){
    return {
        type: DEL_PROCEDURE,
        payload: procedureId
    }
}