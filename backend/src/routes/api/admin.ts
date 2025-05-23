import express from "express";

import { usersSchemas } from "../../schemas/index";
import { validateBody } from "../../decorators/index";
import { authenticateToken } from "../../middlewares/index";
import adminController from "src/controllers/adminController";

const { usersUpdateSubscriptionSchema, usersCheckSubscriptionSchema } =
  usersSchemas;
const {
  getAllUser,
  updateUsersSubscription,
  updateUserSubscription,
  getUnpublishedPosts,
  getUnpublishedPostById,
  checkUsersSubscription,
  getMessageToSprt,
  updateUserBlockStatus,
} = adminController;

const adminRouter = express.Router();
adminRouter.get("/users", authenticateToken, getAllUser);

adminRouter.patch(
  "/user",
  authenticateToken,
  validateBody(usersUpdateSubscriptionSchema),
  updateUserSubscription
);

adminRouter.patch(
  "/users/status-blocked",
  authenticateToken,
  updateUserBlockStatus
);

adminRouter.patch(
  "/users",
  authenticateToken,
  // validateBody(usersUpdateSubscriptionSchema),
  updateUsersSubscription
);

adminRouter.patch(
  "/users/status",
  validateBody(usersCheckSubscriptionSchema),
  authenticateToken,
  checkUsersSubscription
);

adminRouter.get("/posts", authenticateToken, getUnpublishedPosts);

adminRouter.get("/post/:postId", authenticateToken, getUnpublishedPostById);
adminRouter.post("/message", authenticateToken, getMessageToSprt);
export default adminRouter;
