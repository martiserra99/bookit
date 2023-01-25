import { combineReducers } from "redux";

import {
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  newRoomReducer,
  reviewReducer,
  roomDetailsReducer,
  roomReducer,
  roomReviewsReducer,
} from "./roomReducers";
import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./userReducers";
import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from "./bookingReducers";

const reducers = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  room: roomReducer,
  newRoom: newRoomReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
});

export default reducers;
