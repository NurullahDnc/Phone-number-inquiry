import  express  from "express";
import * as logoController from '../controllers/logoController.js'
 
const route = express.Router();

// route.route("/create").post( logoController.createLogo)
route.route("/").get( logoController.getLogo)
route.route("/update/:id").put( logoController.updateLogo)



export default route;