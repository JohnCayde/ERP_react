import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import MainReducer from "./reducers/MainReducer";
import EngineerReducer from "./reducers/EngineerReducer";
import ProductionReducer from "./reducers/ProductionReducer";
import PurchaseReducer from "./reducers/PurchaseReducer";
import SaleReducer from "./reducers/SaleReducer";
import QcReducer from "./reducers/QcReducer";
import StoreReducer from "./reducers/StoreReducer";

const initialState = {};
const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = compose;
const rootReducer = combineReducers({
  maintenance: MainReducer,
  engineer: EngineerReducer,
  production: ProductionReducer,
  purchasing: PurchaseReducer,
  sales: SaleReducer,
  qc: QcReducer,
  store: StoreReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
export type RootState = ReturnType<typeof store.getState>;

export default store;
