import { Router } from 'express';
import verifyToken from "../middlewares/verifyToken.js"
import { createAdmin, deleteAdmin, getAdmin, getAllAdmins, loginAdmin, updateAdmin } from '../controllers/admin.js';

const AdminRouter = Router();

AdminRouter.get("/admins", getAllAdmins);
AdminRouter.get("/admin",verifyToken, getAdmin);//agregar verifitoken
AdminRouter.post("/admin", createAdmin);
AdminRouter.post("/loginAdmin", loginAdmin);
AdminRouter.put("/admin/:id", updateAdmin);
AdminRouter.delete("/admin/:id", deleteAdmin);

export default AdminRouter;