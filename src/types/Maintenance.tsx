import * as MaintenanceConstant from "../constants/Maintenance";

export type ReviewMRequest = {
  type: typeof MaintenanceConstant.REV_MRequest;
  payload: string;
};

export type CompletInfo = {
  requestId: string;
  remark: string;
};

export type CompleteMRequest = {
  type: typeof MaintenanceConstant.COM_MRequest;
  payload: CompletInfo;
};

export type AddSRequest = {
  type: typeof MaintenanceConstant.ADD_SRequest;
  payload: string;
};

export type DelSRequest = {
  type: typeof MaintenanceConstant.DEL_SRequest;
  payload: string;
};

export type CompleteSRequest = {
  type: typeof MaintenanceConstant.COM_SRequest;
  payload: string;
};

export type Item = {
  id: string;
  name: string;
  stock: number;
};

export type AddItem = {
  type: typeof MaintenanceConstant.ADD_INV;
  payload: Item;
};

export type ItemInfo = {
  itemId: string;
  quantity: number;
};

export type AdjustItem = {
  type: typeof MaintenanceConstant.ADJ_INV;
  payload: ItemInfo;
};

export type IncomingMRequest = {
  sectionId: string;
  issue: string;
};

export type MRequest = {
  id: string;
  status: "pending" | "reviewed" | "completed" | "received";
  section: string;
  issue: string;
  remark: string;
};

export type AddMRequest = {
  type: typeof MaintenanceConstant.ADD_MRequest;
  payload: MRequest;
};

export type MaintenanceState = {
  inventory: Array<Item>;
  requests: Array<MRequest>;
};

export type MaintenanceAction =
  | ReviewMRequest
  | CompleteMRequest
  | AddSRequest
  | DelSRequest
  | CompleteSRequest
  | AddItem
  | AdjustItem
  | AddMRequest;
