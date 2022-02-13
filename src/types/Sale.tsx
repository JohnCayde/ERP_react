import * as SaleConstants from "../constants/Sale";

export type Customer = {
  name: string;
  phone: string;
  email: string;
};

export type CustomerModel = Customer & {
  id: string;
};

export type AddCustomer = {
  type: typeof SaleConstants.ADD_CUSTOMER;
  payload: CustomerModel;
};

export type DelCustomer = {
  type: typeof SaleConstants.DEL_CUSTOMER;
  payload: string;
};

export type OrderItem = {
  name?: string;
  itemId: string;
  quantity: number;
};

export type DisplayOrder = {
  id: string;
  orderNo: string;
  customer: string;
  items: Array<{ name: string; quantity: number }>;
};

export type Order = {
  customerId: string;
  items: Array<OrderItem>;
};

export type OrderModel = Order & {
  id: string;
  status: "pending" | "reviewed";
};

export type AddOrder = {
  type: typeof SaleConstants.ADD_ORDER;
  payload: OrderModel;
};

export type DelOrder = {
  type: typeof SaleConstants.DEL_ORDER;
  payload: string;
};

export type RevOrder = {
  type: typeof SaleConstants.REV_ORDER;
  payload: string;
};

export type SaleState = {
  customers: Array<CustomerModel>;
  salesOrder: Array<OrderModel>;
};

export type SaleAction =
  | AddCustomer
  | DelCustomer
  | AddOrder
  | DelOrder
  | RevOrder;
