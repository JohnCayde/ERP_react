import { v4 as uuidv4 } from 'uuid'

export const ADD_PURCHASE_ORDER = "ADD_PURCHASE_ORDER"
export const DEL_PURCHASE_ORDER = "DEL_PURCHASE_ORDER"
export const REV_PURCHASE_ORDER = "REV_PURCHASE_ORDER"
export const ADD_REQUEST = "ADD_REQUEST"
export const REV_REQUEST = "REV_REQUEST"
export const COM_REQUEST = "COM_REQUEST"

export function AddPurchaseOrder(purchaseOrder){
    purchaseOrder.id = uuidv4()
    return {
        type: ADD_PURCHASE_ORDER,
        payload: purchaseOrder
    }
}

export function DelPurchaseOrder(orderId){
    return {
        type: DEL_PURCHASE_ORDER,
        payload: orderId
    }
}

export function RevPurchaseOrder(orderId){
    return {
        type: REV_PURCHASE_ORDER,
        payload: orderId
    }
}

export function AddRequest(request){
    const tagRequest = {
        ...request,
        id:uuidv4()
    }

    return {
        type: ADD_REQUEST,
        payload: tagRequest
    }
}

export function RevRequest(requestId){
    return {
        type: REV_REQUEST,
        payload: requestId
    }
}

export function ComRequest(requestId){
    return {
        type: COM_REQUEST,
        payload: requestId
    }
}