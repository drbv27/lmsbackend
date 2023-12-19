const express = require("express");
const { registerAUser, loginUser, getAllUsers, updateUser, deleteUser, getAUser, blockUser, unblockUser, updatePassword } = require("../controllers/userCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

/* post routes */
userRouter.post("/register", registerAUser);
userRouter.post("/login", loginUser);

/* get routes */
userRouter.get("/all-users", isAdmin, getAllUsers);
userRouter.get("/:id", authMiddleware, getAUser);

/* put routes*/
userRouter.put("/update-profile", authMiddleware, updateUser);
userRouter.put("/block/:id", authMiddleware, isAdmin, blockUser);
userRouter.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);
userRouter.put("/update-password", authMiddleware, updatePassword);


/* delete routes */
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = userRouter;