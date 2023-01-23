import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../controllers/roomControllers";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";

import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(getSingleRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom);

export default handler;
