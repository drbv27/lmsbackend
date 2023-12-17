const express = require("express");
const { registerAUser, loginUser, getAllUsers, updateUser, deleteUser } = require("../controllers/userCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

/* post routes */
userRouter.post("/register", registerAUser);
userRouter.post("/login", loginUser);

/* get routes */
userRouter.get("/all-users", isAdmin, getAllUsers);

/* put routes*/
userRouter.put("/update-profile", authMiddleware, updateUser);

/* delete routes */
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = userRouter;