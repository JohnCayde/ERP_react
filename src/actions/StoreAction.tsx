import { v4 as uuidv4 } from "uuid";
import * as StoreConstants from "../constants/Store";
import * as StoreTypes from "../types/Store";

export function AddMaterial(materialName: string): StoreTypes.AddMaterial {
  const item: StoreTypes.MaterialModel = {
    id: uuidv4(),
    name: materialName,
    stock: 0,
    stockLevel: 1,
  };

  return {
    type: StoreConstants.ADD_MATERIAL,
    payload: item,
  };
}

export function AdjustMaterial(
  materialId: string,
  quantity: number
): StoreTypes.AdjustMaterial {
  const profile: StoreTypes.MaterialProfile = {
    materialId,
    quantity,
  };

  return {
    type: StoreConstants.ADJ_MATERIAL,
    payload: profile,
  };
}

export function AdjustFinishGood(
  fgId: string,
  quantity: number
): StoreTypes.AdjustFinishGood {
  const profile: StoreTypes.FinishGoodProfile = {
    fgId,
    quantity,
  };

  return {
    type: StoreConstants.ADJ_FINISH_GOOD,
    payload: profile,
  };
}

export function AddMatRequest(
  req: StoreTypes.MatRequest
): StoreTypes.AddMatRequest {
  const request: StoreTypes.MatRequestModel = {
    id: uuidv4(),
    status: "pending",
    section: req.sectionId,
    item: req.item,
    quantity: req.quantity,
  };

  return {
    type: StoreConstants.ADD_MAT_REQUEST,
    payload: request,
  };
}

export function ReviewMatRequest(reqId: string): StoreTypes.ReviewMatRequest {
  return {
    type: StoreConstants.REV_MAT_REQUEST,
    payload: reqId,
  };
}

export function CompleteMatRequest(
  reqId: string
): StoreTypes.CompleteMatRequest {
  return {
    type: StoreConstants.COM_MAT_REQUEST,
    payload: reqId,
  };
}

export function AddTransaction(
  component: StoreTypes.Transaction
): StoreTypes.AddTransaction {
  const item: StoreTypes.TransactionModel = {
    id: uuidv4(),
    productId: component.productId,
    name: component.name,
    status: "pending",
  };

  return {
    type: StoreConstants.ADD_TRANSACTION,
    payload: item,
  };
}

export function ComTransaction(itemId: string): StoreTypes.ComTransaction {
  return {
    type: StoreConstants.COM_TRANSACTION,
    payload: itemId,
  };
}
