import * as sale from "../actions/SaleAction";

const initialState = {
    customers:[{
        id:"34f7e21b-1ea1-4725-8dc7-eb4c69aa34d2",
        name: "Customer A",
        phone: "phone customr A",
        email: "email customer A"
    },{
        id:"403303f4-2275-42f4-8540-cc051145a909",
        name: "Customer B",
        phone: "phone customr B",
        email: "email customer B"
    },{
        id:"200a08db-1aab-40d1-b625-11a38c13d988",
        name: "Customer C",
        phone: "phone customr C",
        email: "email customer C"
    },{
        id:"81f10a7b-705f-49ef-9eda-cab3cb09840e",
        name: "Customer D",
        phone: "phone customr D",
        email: "email customer D"
    }],
    salesOrder:[{
        id:"8260f380-8060-42af-892a-ae7ad6f7694a",
        customerId: "403303f4-2275-42f4-8540-cc051145a909",
        status: "pending",
        items:[{
            itemId:"496ea0bd-5f67-4e1e-b2f2-173426fe876d",
            quantity:100
        }]
    },{
        id:"49b241dc-b996-47df-8be2-050800edf416",
        customerId: "200a08db-1aab-40d1-b625-11a38c13d988",
        status: "pending",
        items:[{
            itemId:"496ea0bd-5f67-4e1e-b2f2-173426fe876d",
            quantity:100
        }]
    },{
        id:"c544e79d-1152-4220-93c6-14d9e19456e2",
        customerId: "81f10a7b-705f-49ef-9eda-cab3cb09840e",
        status: "pending",
        items:[{
            itemId:"496ea0bd-5f67-4e1e-b2f2-173426fe876d",
            quantity:100
        }]
    }]
}

export default function(state = initialState, action){
    switch (action.type) {
        case sale.ADD_CUSTOMER:
            return {
                ...state,
                customers:[...state.customers, action.payload]
            }
        case sale.DEL_CUSTOMER:
            const customers = state.customers.filter(customer=>customer.id != action.payload)
            return {
                ...state,
                customers: customers
            }
        case sale.ADD_ORDER:
            return {
                ...state,
                salesOrder:[...state.salesOrder, action.payload]
            }
        case sale.DEL_ORDER:
            const salesOrder = state.salesOrder.filter(order=>order.id != action.payload)
            return{
                ...state,
                salesOrder
            }
        case sale.REV_ORDER:
            const revSalesOrder = state.salesOrder.map((order)=>{
                if (order.id == action.payload) {
                    order.status = "reviewed"
                }
                return order
            })
            
            return {
                ...state,
                salesOrder:revSalesOrder
            }
        default:
            return state
    }
}
