import homeReducer from "./Reducers/homeReducer";
import authReducer from "./Reducers/authReducer";
import cardReducer from "./Reducers/cardReducer";
import orderReducer from "./Reducers/orderReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import chatReducer from "./Reducers/chatReducer";
import couponReducer from "./Reducers/couponReducer";
const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  card: cardReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  chat: chatReducer,
  coupon: couponReducer,
};
export default rootReducer;
