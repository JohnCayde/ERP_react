import * as store from "../actions/StoreAction";
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    transaction:[{
        id: "4ff33a40-1693-4b8c-90a0-36c98b13106d",
        productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
        name: "Product A",
        status: "pending"
    }],
    matstore:[{
        id: "00e357ce-391a-4aca-bde5-31a3041e5f79",
        name: "Material A",
        stock: 100,
        stockLevel: 1
    }],
    fgstore:[{
        id: "42a65953-a24c-4a46-8307-818e8cb4845c",
        productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
        name: "Product A",
        stock: 100
    }],
    requests:[{
        id:"624b8129-e1b3-472e-a2ec-01391beb46a6",
        status:"reviewed",
        section: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
        item: "c8af7c63-0033-4bd2-86cf-93713a87c57c",
        quantity: 10,
    }]
}

export default function(state = initialState, action){
    switch (action.type) {
        case store.ADD_MATERIAL:
            return {
                ...state,
                matstore: [...state.matstore, action.payload]
            }
        case store.ADJ_MATERIAL:
            const newMaterials = state.matstore.map(material => {
                if (material.id == action.payload.materialId) {
                    material.stock = action.payload.quantity;
                }
                return material;
            });

            return {
                ...state,
                matstore: newMaterials
            };
        case store.ADJ_FINISH_GOOD:
            const newFinishGoods = state.fgstore.map(fg => {
                if (fg.id == action.payload.fgId) {
                    fg.stock = action.payload.quantity;
                }
                return fg;
            });

            return {
                ...state,
                fgstore: newFinishGoods
            };
        case store.ADD_MAT_REQUEST:
            return {
                ...state,
                requests: [...state.requests, action.payload]
            }
        case store.REV_MAT_REQUEST:
            const revReq = state.requests.map((request)=>{
                if (request.id == action.payload) {
                    return {
                        ...request,
                        status: "reviewed"
                    }
                }
                return request
            })

            return {
                ...state,
                requests: revReq
            }
        case store.COM_MAT_REQUEST:
            const comReq = state.requests.map((request)=>{
                if (request.id == action.payload) {
                    return {
                        ...request,
                        status: "completed"
                    }
                }
                return request
            })

            return {
                ...state,
                requests: comReq
            }
        case store.ADD_TRANSACTION:
            return {
                ...state,
                transaction: [...state.transaction, action.payload]
            }
        case store.COM_TRANSACTION:
            const comTrans = state.transaction.map((item)=>{
                if (item.id == action.payload) {
                    return {
                        ...item,
                        status: "completed"
                    }
                }
                return item
            })

            const transaction = state.transaction.find((item)=>item.id == action.payload)
            const index = state.fgstore.findIndex((item)=>item.productId == transaction.productId)
            if (index == -1) {
                const newRecord = {
                    id: uuidv4(),
                    productId: transaction.productId,
                    name: transaction.name,
                    stock: 1
                }

                return {
                    ...state,
                    transaction: comTrans,
                    fgstore: [...state.fgstore, newRecord]
                }
            } else {
                const newFgList = state.fgstore.map((item, idx)=>{
                    if (idx == index) {
                        return {
                            ...item,
                            stock: item.stock+1
                        }
                    }
                    return item
                })

                return {
                    ...state,
                    transaction: comTrans,
                    fgstore: newFgList
                }
            }
        default:
            return state
    }
}
