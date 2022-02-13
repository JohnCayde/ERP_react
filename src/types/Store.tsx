import * as StoreTypes from "../constants/Store";

export type MaterialModel = {
  id: string;
  name: string;
  stock: number;
  stockLevel: number;
};

export type AddMaterial = {
  type: typeof StoreTypes.ADD_MATERIAL;
  payload: MaterialModel;
};

export type MaterialProfile = {
  materialId: string;
  quantity: number;
};

export type AdjustMaterial = {
  type: typeof StoreTypes.ADJ_MATERIAL;
  payload: MaterialProfile;
};

export type FinishGoodProfile = {
  fgId: string;
  quantity: number;
};

export type FinishGoodModel = {
  id: string;
  productId: string;
  name: string;
  stock: number;
};

export type AdjustFinishGood = {
  type: typeof StoreTypes.ADJ_FINISH_GOOD;
  payload: FinishGoodProfile;
};

export type MatRequest = {
  sectionId: string;
  item: string;
  quantity: number;
};

export type MatRequestModel = {
  id: string;
  status: "pending" | "reviewed" | "completed";
  section: string;
  item: string;
  quantity: number;
};

export type AddMatRequest = {
  type: typeof StoreTypes.ADD_MAT_REQUEST;
  payload: MatRequestModel;
};

export type ReviewMatRequest = {
  type: typeof StoreTypes.REV_MAT_REQUEST;
  payload: String;
};

export type CompleteMatRequest = {
  type: typeof StoreTypes.COM_MAT_REQUEST;
  payload: String;
};

export type Transaction = {
  productId: string;
  name: string;
};

export type TransactionModel = Transaction & {
  id: string;
  status: "pending" | "received" | "completed";
};

export type AddTransaction = {
  type: typeof StoreTypes.ADD_TRANSACTION;
  payload: TransactionModel;
};

export type ComTransaction = {
  type: typeof StoreTypes.COM_TRANSACTION;
  payload: String;
};

export type StoreState = {
  transaction: Array<TransactionModel>;
  matstore: Array<MaterialModel>;
  fgstore: Array<FinishGoodModel>;
  requests: Array<MatRequestModel>;
};

export type StoreAction =
  | AddMaterial
  | AdjustMaterial
  | AdjustFinishGood
  | AddMatRequest
  | ReviewMatRequest
  | CompleteMatRequest
  | AddTransaction
  | ComTransaction;
