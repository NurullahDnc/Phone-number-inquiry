import  express  from "express";
import * as NumberPhoneController from '../controllers/numberPhoneController.js'
 
const route = express.Router();

route.route("/").get( NumberPhoneController.getNumber)
route.route("/delete/:id").delete( NumberPhoneController.NumberDelete)




 


export default route;