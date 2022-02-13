import * as Purchaser from "../actions/PurchaseAction";
import * as PurchaseConstants from "../constants/Purchase";
import * as PurchaseTypes from "../types/Purchase";

const initialState: PurchaseTypes.PurchaseState = {
  vendors: [
    {
      id: "92d4506b-3161-4936-90ec-74767f981fb2",
      name: "Vendor A",
    },
    {
      id: "279a8a7c-a8a3-4a36-b8a0-f2d80195be2f",
      name: "Vendor B",
    },
    {
      id: "e20f52c9-5e46-4584-84fb-8ce64a9eb6fb",
      name: "Vendor C",
    },
    {
      id: "71bebf26-8827-47dc-ab37-00c1fc2d739e",
      name: "Vendor D",
    },
  ],
  items: [
    {
      id: "3d7f4fa5-715e-4e12-b2bd-03eba61741c5",
      name: "Material A",
      type: "material",
      stock: 100,
    },
    {
      id: "c8af7c63-0033-4bd2-86cf-93713a87c57c",
      name: "Material B",
      type: "material",
      stock: 100,
    },
    {
      id: "0135f1e8-0adb-43e4-bc3a-933a77d86acd",
      name: "Material C",
      type: "material",
      stock: 100,
    },
    {
      id: "3f572b75-312f-4daf-bb76-8f5dd48e94b9",
      name: "Material D",
      type: "material",
      stock: 100,
    },
    {
      id: "6efec22b-f931-4c7f-a90b-0724c102272c",
      name: "Spare tool A",
      type: "tool",
      stock: 100,
    },
    {
      id: "fea0dc9d-67a3-44a5-8caa-5f55a2ab3572",
      name: "Spare tool B",
      type: "tool",
      stock: 100,
    },
    {
      id: "8c236a39-b86b-47f4-acfc-fcbc319e4b9c",
      name: "Item A",
      type: "item",
      stock: 100,
    },
    {
      id: "593ff27f-b194-45a4-aed7-587ca4f8cde9",
      name: "Item B",
      type: "item",
      stock: 100,
    },
  ],
  requests: [
    {
      id: "c13f52e4-db1a-46a3-9d6c-5432c81250c7",
      from: "Production",
      status: "pending",
      items: [
        {
          name: "Item A",
          quantity: 10,
        },
      ],
    },
    {
      id: "657fcaef-4141-47c4-b476-6f7e30a0c815",
      from: "Maintenance",
      status: "pending",
      items: [
        {
          name: "Spare tool B",
          quantity: 10,
        },
      ],
    },
    {
      id: "698060ce-9059-4679-bec0-5174f08661af",
      from: "Maintenance",
      status: "reviewed",
      items: [
        {
          name: "Spare tool B",
          quantity: 10,
        },
      ],
    },
  ],
  purchaseOrders: [
    {
      id: "0c32f60c-e19f-41ca-affe-cf2e4de6e16d",
      vendor: "92d4506b-3161-4936-90ec-74767f981fb2",
      status: "pending",
      items: [
        {
          id: "3d7f4fa5-715e-4e12-b2bd-03eba61741c5",
          quantity: 12,
        },
        {
          id: "c8af7c63-0033-4bd2-86cf-93713a87c57c",
          quantity: 31,
        },
        {
          id: "0135f1e8-0adb-43e4-bc3a-933a77d86acd",
          quantity: 22,
        },
      ],
    },
    {
      id: "5ec6548a-3312-4522-9564-d434f09a0a34",
      vendor: "e20f52c9-5e46-4584-84fb-8ce64a9eb6fb",
      status: "pending",
      items: [
        {
          id: "3f572b75-312f-4daf-bb76-8f5dd48e94b9",
          quantity: 14,
        },
        {
          id: "fea0dc9d-67a3-44a5-8caa-5f55a2ab3572",
          quantity: 24,
        },
        {
          id: "593ff27f-b194-45a4-aed7-587ca4f8cde9",
          quantity: 34,
        },
      ],
    },
  ],
  deliveryOrder: [],
};

export default function (
  state = initialState,
  action: PurchaseTypes.PurchaseAction
): PurchaseTypes.PurchaseState {
  switch (action.type) {
    case PurchaseConstants.ADD_PURCHASE_ORDER:
      return {
        ...state,
        purchaseOrders: [...state.purchaseOrders, action.payload],
      };
    case PurchaseConstants.DEL_PURCHASE_ORDER:
      const nwPurchaseOrders = state.purchaseOrders.filter(
        (order) => order.id != action.payload
      );
      return {
        ...state,
        purchaseOrders: nwPurchaseOrders,
      };
    case PurchaseConstants.REV_PURCHASE_ORDER:
      const PurchaseOrders = state.purchaseOrders.map((order) => {
        if (order.id == action.payload) {
          order.status = "received";
        }
        return order;
      });

      return {
        ...state,
        purchaseOrders: PurchaseOrders,
      };
    case PurchaseConstants.ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    case PurchaseConstants.REV_REQUEST:
      const revRequest = state.requests.map((request) => {
        if (request.id == action.payload) {
          request.status = "reviewed";
        }
        return request;
      });

      return {
        ...state,
        requests: revRequest,
      };
    case PurchaseConstants.COM_REQUEST:
      const comRequest = state.requests.map((request) => {
        if (request.id == action.payload) {
          request.status = "received";
        }
        return request;
      });

      return {
        ...state,
        requests: comRequest,
      };
    default:
      return state;
  }
}
