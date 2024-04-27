import  express  from "express";
import * as HeaderController from '../controllers/headerController.js'
 
const route = express.Router();

// route.route("/create").post( HeaderController.createHeader)
route.route("/").get( HeaderController.getHeader)
route.route("/update/:id").put( HeaderController.updateHeader)



export default route;