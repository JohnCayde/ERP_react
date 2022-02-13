import { v4 as uuidv4 } from "uuid";
import * as MaintenanceConstant from "../constants/Maintenance";
import * as MaintenanceType from "../types/Maintenance";

export function ReviewMRequest(
  requestId: string
): MaintenanceType.ReviewMRequest {
  return {
    type: MaintenanceConstant.REV_MRequest,
    payload: requestId,
  };
}
export function CompleteMRequest(
  completeInfo: MaintenanceType.CompletInfo
): MaintenanceType.CompleteMRequest {
  return {
    type: MaintenanceConstant.COM_MRequest,
    payload: completeInfo,
  };
}
export function AddSRequest(request: string): MaintenanceType.AddSRequest {
  return {
    type: MaintenanceConstant.ADD_SRequest,
    payload: request,
  };
}
export function DelSRequest(requestId: string): MaintenanceType.DelSRequest {
  return {
    type: MaintenanceConstant.DEL_SRequest,
    payload: requestId,
  };
}
export function CompleteSRequest(
  requestId: string
): MaintenanceType.CompleteSRequest {
  return {
    type: MaintenanceConstant.COM_SRequest,
    payload: requestId,
  };
}

export function AddItem(itemName: string): MaintenanceType.AddItem {
  const item = {
    id: uuidv4(),
    name: itemName,
    stock: 0,
  };

  return {
    type: MaintenanceConstant.ADD_INV,
    payload: item,
  };
}

export function AdjustItem(
  itemId: string,
  quantity: number
): MaintenanceType.AdjustItem {
  const profile: MaintenanceType.ItemInfo = {
    itemId,
    quantity,
  };

  return {
    type: MaintenanceConstant.ADJ_INV,
    payload: profile,
  };
}

export function AddMRequest(
  incoming: MaintenanceType.IncomingMRequest
): MaintenanceType.AddMRequest {
  const request: MaintenanceType.MRequest = {
    id: uuidv4(),
    status: "pending",
    section: incoming.sectionId,
    issue: incoming.issue,
    remark: "",
  };

  return {
    type: MaintenanceConstant.ADD_MRequest,
    payload: request,
  };
}
