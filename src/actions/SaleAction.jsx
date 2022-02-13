import { v4 as uuidv4 } from 'uuid'

export const ADD_CUSTOMER = "ADD_CUSTOMER"
export const DEL_CUSTOMER = "DEL_CUSTOMER"
export const ADD_ORDER = "ADD_ORDER"
export const REV_ORDER = "REV_ORDER"
export const DEL_ORDER = "DEL_ORDER"


export function AddCustomer(customer){
    return {
        type: ADD_CUSTOMER,
        payload: {...customer, id:uuidv4()}
    }
}

export function DelCustomer(customerId){
    return {
        type: DEL_CUSTOMER,
        payload: customerId
    }
}

export function AddOrder(order){
    const formatedItem = order.items.map(item=>{
        return {itemId:item.itemId, quantity:item.quantity}
    })

    return {
        type: ADD_ORDER,
        payload: {
            id: uuidv4(),
            ...order,
            status: "pending",
            items:formatedItem
        }
    }
}

export function DelOrder(orderId){
    return {
        type: DEL_ORDER,
        payload: orderId
    }
}

export function RevOrder(orderId){
    return {
        type: REV_ORDER,
        payload: orderId
    }
}