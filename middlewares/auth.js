import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/react";
import User from "../models/user";

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  req.user = await User.findOne({ email: session.token.email });

  next();
});

export { isAuthenticatedUser };
