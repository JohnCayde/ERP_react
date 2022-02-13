import { v4 as uuidv4 } from "uuid";
import * as PurchaseConstants from "../constants/Purchase";
import * as PurchaseTypes from "../types/Purchase";

export function AddPurchaseOrder(
  purchaseOrder: PurchaseTypes.PurchaseOrder
): PurchaseTypes.AddPurchaseOrder {
  const po: PurchaseTypes.PurchaseOrderModel = {
    ...purchaseOrder,
    id: uuidv4(),
  };

  return {
    type: PurchaseConstants.ADD_PURCHASE_ORDER,
    payload: po,
  };
}

export function DelPurchaseOrder(
  orderId: string
): PurchaseTypes.DelPurchaseOrder {
  return {
    type: PurchaseConstants.DEL_PURCHASE_ORDER,
    payload: orderId,
  };
}

export function RevPurchaseOrder(
  orderId: string
): PurchaseTypes.RevPurchaseOrder {
  return {
    type: PurchaseConstants.REV_PURCHASE_ORDER,
    payload: orderId,
  };
}

export function AddRequest(
  request: PurchaseTypes.Request
): PurchaseTypes.AddRequest {
  const tagRequest: PurchaseTypes.RequestModel = {
    ...request,
    id: uuidv4(),
  };

  return {
    type: PurchaseConstants.ADD_REQUEST,
    payload: tagRequest,
  };
}

export function RevRequest(requestId: string): PurchaseTypes.RevRequest {
  return {
    type: PurchaseConstants.REV_REQUEST,
    payload: requestId,
  };
}

export function ComRequest(requestId: string): PurchaseTypes.ComRequest {
  return {
    type: PurchaseConstants.COM_REQUEST,
    payload: requestId,
  };
}
