import { v4 as uuidv4 } from "uuid";
import * as SaleConstants from "../constants/Sale";
import * as SaleTypes from "../types/Sale";

export function AddCustomer(
  customer: SaleTypes.Customer
): SaleTypes.AddCustomer {
  return {
    type: SaleConstants.ADD_CUSTOMER,
    payload: { ...customer, id: uuidv4() },
  };
}

export function DelCustomer(customerId: string): SaleTypes.DelCustomer {
  return {
    type: SaleConstants.DEL_CUSTOMER,
    payload: customerId,
  };
}

export function AddOrder(order: SaleTypes.Order): SaleTypes.AddOrder {
  const formatedItem = order.items.map((item) => {
    return { itemId: item.itemId, quantity: item.quantity };
  });

  return {
    type: SaleConstants.ADD_ORDER,
    payload: {
      id: uuidv4(),
      ...order,
      status: "pending",
      items: formatedItem,
    },
  };
}

export function DelOrder(orderId: string): SaleTypes.DelOrder {
  return {
    type: SaleConstants.DEL_ORDER,
    payload: orderId,
  };
}

export function RevOrder(orderId: string): SaleTypes.RevOrder {
  return {
    type: SaleConstants.REV_ORDER,
    payload: orderId,
  };
}
