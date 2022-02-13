import { v4 as uuidv4 } from 'uuid'

export const ADD_MATERIAL = "ADD_MATERIAL"
export const ADJ_MATERIAL = "ADJ_MATERIAL"
export const ADJ_FINISH_GOOD = "ADJ_FINISH_GOOD"
export const ADD_MAT_REQUEST = "ADD_MAT_REQUEST"
export const REV_MAT_REQUEST = "REV_MAT_REQUEST"
export const COM_MAT_REQUEST = "COM_MAT_REQUEST"
export const ADD_TRANSACTION = "ADD_TRANSACTION"
export const COM_TRANSACTION = "COM_TRANSACTION"

export function AddMaterial(materialName){
    const item = {
        id: uuidv4(),
        name: materialName,
        stock: 0,
        stockLevel: 1
    }

    return {
        type: ADD_MATERIAL,
        payload: item
    }
}

export function AdjustMaterial(materialId, quantity){
    const profile = {
        materialId,
        quantity
    }

    return {
        type: ADJ_MATERIAL,
        payload: profile
    }
}

export function AdjustFinishGood(fgId, quantity){
    const profile = {
        fgId,
        quantity
    }

    return {
        type: ADJ_FINISH_GOOD,
        payload: profile
    }
}

export function AddMatRequest(req){
    const request = {
        id: uuidv4(),
        status: "pending",
        section: req.sectionId,
        item: req.item,
        quantity: req.quantity
    }
    
    return {
        type: ADD_MAT_REQUEST,
        payload: request
    }
}

export function ReviewMatRequest(reqId){
    return {
        type: REV_MAT_REQUEST,
        payload: reqId
    }
}

export function CompleteMatRequest(reqId){
    return {
        type: COM_MAT_REQUEST,
        payload: reqId
    }
}

export function AddTransaction(component){
    const item = {
        id: uuidv4(),
        productId: component.productId,
        name: component.name,
        status: "pending"
    }

    return {
        type: ADD_TRANSACTION,
        payload: item
    }
}

export function ComTransaction(itemId){
    return {
        type: COM_TRANSACTION,
        payload: itemId
    }
}