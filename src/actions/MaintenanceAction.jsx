import { v4 as uuidv4 } from 'uuid'

export const ADD_MRequest = "ADD_MRequest"
export const REV_MRequest = "REV_MRequest"
export const COM_MRequest = "COM_MRequest"
export const ADD_SRequest = "ADD_SRequest"
export const DEL_SRequest = "DEL_SRequest"
export const COM_SRequest = "COM_SRequest"
export const ADD_INV = "ADD_INV"
export const ADJ_INV = "ADJ_INV"

export function ReviewMRequest(requestId){
    return {
        type: REV_MRequest,
        payload: requestId
    }
}
export function CompleteMRequest(completeInfo){
    return {
        type: COM_MRequest,
        payload: completeInfo
    }
}
export function AddSRequest(request){
    return {
        type: ADD_SRequest,
        payload: request
    }
}
export function DelSRequest(requestId){
    return {
        type: DEL_SRequest,
        payload: requestId
    }
}
export function CompleteSRequest(requestId){
    return {
        type: COM_SRequest,
        payload: requestId
    }
}

export function AddItem(itemName){

    const item = {
        id:uuidv4(),
        name: itemName,
        stock: 0
    }

    return {
        type: ADD_INV,
        payload: item
    }
}

export function AdjustItem(itemId, quantity){
    const profile = {
        itemId,
        quantity
    }

    return {
        type: ADJ_INV,
        payload:profile
    }
}

export function AddMRequest(incoming){
    const request = {
        id: uuidv4(),
        status:"pending",
        section: incoming.sectionId,
        issue: incoming.issue,
        remark: ""
    }

    return {
        type: ADD_MRequest,
        payload: request
    }
}