import { v4 as uuidv4 } from 'uuid'

export const ADD_SECTION = "ADD_SECTION"
export const DEL_SECTION = "DEL_SECTION"
export const ADD_MACHINE = "ADD_MACHINE"
export const DEL_MACHINE = "DEL_MACHINE"
export const START_PROCESS = "START_PROCESS"
export const COMPLETE_PROCESS = "COMPLETE_PROCESS"
export const ADD_COMPONENT = "ADD_COMPONENT"
export const HANDLE_PLANNING = "HANDLE_PLANNING"

export function AddSection(section){
    const sec = {
        ...section,
        id: uuidv4(),
        planning: 0
    }

    return {
        type: ADD_SECTION,
        payload: sec
    }
}

export function DelSection(sectionId){
    return {
        type: DEL_SECTION,
        payload: sectionId
    }
}

export function AddMachine(machine){
    const mac = {
        ...machine,
        id: uuidv4()
    }

    return {
        type: ADD_MACHINE,
        payload: mac
    }
}

export function DelMachine(machineId){
    return {
        type: DEL_MACHINE,
        payload: machineId
    }
}

export function StartProcess(profile){

    const process = profile.component.process.map((prs)=>{
        if (prs.process == profile.processId) {
            return {
                ...prs,
                machine: profile.machine.id
            }
        }
        return prs
    })

    const component = {
        ...profile.component,
        status: "pending",
        process
    }

    return {
        type: START_PROCESS,
        payload: component
    }
}

export function CompleteProcess(profile){

    const process = profile.component.process.map((prs)=>{
        if (prs.process == profile.processId) {
            prs.complete = true
            prs.machine = profile.machine.id
        }
        return prs
    })

    const component = {
        ...profile.component,
        status: "completed",
        process
    }


    return {
        type: COMPLETE_PROCESS,
        payload: component
    }
}

export function AddComponent(newComponent){

    const components = newComponent.flatMap((newCom)=>{
        const quantity = newCom.quantity
        delete newCom.quantity
        const coms = []
        for (let i = 0; i < quantity; i++) {
            coms.push({
                id:uuidv4(),
                ...newCom
            })
        }
        return coms
    })

    return {
        type: ADD_COMPONENT,
        payload: components
    }
}

export function HandlePlanning(sectionId, quantity){
    return {
        type: HANDLE_PLANNING,
        payload: {
            sectionId,
            quantity
        }
    }
}