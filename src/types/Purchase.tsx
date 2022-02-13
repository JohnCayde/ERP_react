import * as PurchaseConstants from "../constants/Purchase";

export type PurchasedItem = {
  id: string;
  quantity: number;
};

export type PurchaseOrder = {
  vendor: string;
  status: "pending" | "received";
  items: Array<PurchasedItem>;
};

export type PurchaseOrderModel = PurchaseOrder & {
  id: string;
};

export type AddPurchaseOrder = {
  type: typeof PurchaseConstants.ADD_PURCHASE_ORDER;
  payload: PurchaseOrderModel;
};

export type DelPurchaseOrder = {
  type: typeof PurchaseConstants.DEL_PURCHASE_ORDER;
  payload: string;
};

export type RevPurchaseOrder = {
  type: typeof PurchaseConstants.REV_PURCHASE_ORDER;
  payload: string;
};

export type Department = {};

export type RequestItem = {
  name: string;
  quantity: number;
};

export type Request = {
  from: Department;
  status: "pending" | "reviewed" | "received";
  items: Array<RequestItem>;
};

export type RequestModel = Request & {
  id: string;
};

export type AddRequest = {
  type: typeof PurchaseConstants.ADD_REQUEST;
  payload: RequestModel;
};

export type RevRequest = {
  type: typeof PurchaseConstants.REV_REQUEST;
  payload: string;
};

export type ComRequest = {
  type: typeof PurchaseConstants.COM_REQUEST;
  payload: string;
};

export type Vendor = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  name: string;
  type: string;
  stock: 100;
};

export type PurchaseState = {
  vendors: Array<Vendor>;
  items: Array<Item>;
  requests: Array<RequestModel>;
  purchaseOrders: Array<PurchaseOrderModel>;
  deliveryOrder: Array<any>;
};

export type PurchaseAction =
  | AddPurchaseOrder
  | DelPurchaseOrder
  | RevPurchaseOrder
  | AddRequest
  | RevRequest
  | ComRequest;
