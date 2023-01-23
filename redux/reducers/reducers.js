import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
} from "./userReducers";
import { checkBookingReducer, bookedDatesReducer } from "./bookingReducers";

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
});

export default reducers;
