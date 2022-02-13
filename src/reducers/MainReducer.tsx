
// import { ADD_GROUP, DEL_GROUP, FTC_GROUP, SEL_GROUP, OPEN_ADDGROUP_MODAL, CLOSE_ADDGROUP_MODAL } from '../actions/GroupAction'
import * as maintenance from "../actions/MaintenanceAction";

const initialState = {
    inventory:[{
        id:"f157e395-4d14-4edf-91d0-812d6680fff9",
        name:"Spare tool A",
        stock: 100
    },{
        id:"d42f5580-0a9c-444d-846b-0bc1446685f4",
        name:"Spare tool B",
        stock: 100
    }],
    requests:[{
        id:"624b8129-e1b3-472e-a2ec-01391beb46a6",
        status:"pending",
        section: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
        issue: "maintenance service",
        remark: ""
    },{
        id:"986db3e6-16ab-4ef8-a3bc-df08e76b86fe",
        status:"pending",
        section: "ff774a8c-c409-4443-8da9-dab69c95743a",
        issue: "Machine Repair",
        remark: ""
    }]
}

export default function(state = initialState, action){
    switch (action.type) {
        case maintenance.REV_MRequest:
            const rMaintenanceRequests = state.requests.map(request => {
                if (request.id == action.payload) {
                    request.status = "reviewed";
                }
                return request;
            });

            return {
                ...state,
                requests:rMaintenanceRequests
            };
        case maintenance.COM_MRequest:
            const cMaintenanceRequests = state.requests.map(request => {
                if (request.id == action.payload.requestId) {
                    request.status = "completed";
                    request.remark = action.payload.remark;
                }
                return request;
            });

            return {
                ...state,
                requests:cMaintenanceRequests
            };
        case maintenance.ADD_INV:
            return {
                ...state,
                inventory: [...state.inventory, action.payload]
            }
        case maintenance.ADJ_INV:
            const newItem = state.inventory.map(item => {
                if (item.id == action.payload.itemId) {
                    item.stock = action.payload.quantity;
                }
                return item;
            });

            return {
                ...state,
                inventory: newItem
            };
        case maintenance.ADD_MRequest:
            return {
                ...state,
                requests: [...state.requests, action.payload]
            }
        default:
            return state
    }
}
