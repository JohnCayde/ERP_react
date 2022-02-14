// import * as store from "../actions/StoreAction";
import { v4 as uuidv4 } from "uuid";
import * as StoreConstants from "../constants/Store";
import * as StoreTypes from "../types/Store";

const initialState: StoreTypes.StoreState = {
  transaction: [
    {
      id: "4ff33a40-1693-4b8c-90a0-36c98b13106d",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      status: "pending",
    },
  ],
  matstore: [
    {
      id: "00e357ce-391a-4aca-bde5-31a3041e5f79",
      name: "Material A",
      stock: 100,
      stockLevel: 1,
    },
  ],
  fgstore: [
    {
      id: "42a65953-a24c-4a46-8307-818e8cb4845c",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      stock: 100,
    },
  ],
  requests: [
    {
      id: "624b8129-e1b3-472e-a2ec-01391beb46a6",
      status: "reviewed",
      section: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      item: "c8af7c63-0033-4bd2-86cf-93713a87c57c",
      quantity: 10,
    },
  ],
};

export default function StoreReducer(
  state = initialState,
  action: StoreTypes.StoreAction
): StoreTypes.StoreState {
  switch (action.type) {
    case StoreConstants.ADD_MATERIAL:
      return {
        ...state,
        matstore: [...state.matstore, action.payload],
      };
    case StoreConstants.ADJ_MATERIAL:
      const newMaterials = state.matstore.map((material) => {
        if (material.id === action.payload.materialId) {
          material.stock = action.payload.quantity;
        }
        return material;
      });

      return {
        ...state,
        matstore: newMaterials,
      };
    case StoreConstants.ADJ_FINISH_GOOD:
      const newFinishGoods = state.fgstore.map((fg) => {
        if (fg.id === action.payload.fgId) {
          fg.stock = action.payload.quantity;
        }
        return fg;
      });

      return {
        ...state,
        fgstore: newFinishGoods,
      };
    case StoreConstants.ADD_MAT_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    case StoreConstants.REV_MAT_REQUEST:
      const revReq: Array<StoreTypes.MatRequestModel> = state.requests.map(
        (request) => {
          if (request.id === action.payload) {
            return {
              ...request,
              status: "reviewed",
            };
          }
          return request;
        }
      );

      return {
        ...state,
        requests: revReq,
      };
    case StoreConstants.COM_MAT_REQUEST:
      const comReq: Array<StoreTypes.MatRequestModel> = state.requests.map(
        (request) => {
          if (request.id === action.payload) {
            return {
              ...request,
              status: "completed",
            };
          }
          return request;
        }
      );

      return {
        ...state,
        requests: comReq,
      };
    case StoreConstants.ADD_TRANSACTION:
      return {
        ...state,
        transaction: [...state.transaction, action.payload],
      };
    case StoreConstants.COM_TRANSACTION:
      const comTrans: Array<StoreTypes.TransactionModel> =
        state.transaction.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              status: "completed",
            };
          }
          return item;
        });

      const transaction = state.transaction.find(
        (item) => item.id === action.payload
      );
      const index = state.fgstore.findIndex(
        (item) => item.productId === transaction!.productId
      );
      if (index === -1) {
        const newRecord = {
          id: uuidv4(),
          productId: transaction!.productId,
          name: transaction!.name,
          stock: 1,
        };

        return {
          ...state,
          transaction: comTrans,
          fgstore: [...state.fgstore, newRecord],
        };
      } else {
        const newFgList = state.fgstore.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              stock: item.stock + 1,
            };
          }
          return item;
        });

        return {
          ...state,
          transaction: comTrans,
          fgstore: newFgList,
        };
      }
    default:
      return state;
  }
}
