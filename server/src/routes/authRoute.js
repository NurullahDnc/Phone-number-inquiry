import  express  from "express";
import * as AdminController from '../controllers/adminController.js'
import { authenticateToken } from "../helpers/middlewares/authMiddleware.js";
 
const route = express.Router();

route.route("/create").post( AdminController.createUser)
route.route("/login").post( AdminController.login)
route.route("/update/:id").put(AdminController.resetPassword);
route.route("/admin").get( authenticateToken, AdminController.getInfo);




export default route;