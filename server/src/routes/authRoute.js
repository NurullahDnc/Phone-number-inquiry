import  express  from "express";
import * as AdminController from '../controllers/adminController.js'
 
const route = express.Router();

route.route("/create").post( AdminController.createUser)
route.route("/login").post( AdminController.login)
route.route("/update/:id").put( AdminController.resetPassword)



export default route;