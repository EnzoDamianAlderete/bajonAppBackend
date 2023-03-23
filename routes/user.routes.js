import { getAllUsers, createUser, updateUser ,deleteUser, login, getUser } from '../controllers/user.js';
import { Router } from 'express';
import verifyToken from "../middlewares/verifyToken.js"

const UserRouter = Router();

UserRouter.get("/users", getAllUsers);
UserRouter.get("/user/:id", getUser);
UserRouter.post("/users",verifyToken, createUser);
UserRouter.post("/login", login);
UserRouter.put("/user/:id", updateUser);
UserRouter.delete("/user/:id", deleteUser);

export default UserRouter;