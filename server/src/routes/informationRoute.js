import  express  from "express";
import * as informationController from '../controllers/featurePresentationController.js'
 
const route = express.Router();

route.route("/create").post( informationController.createInformation)
route.route("/").get( informationController.getInformation)
route.route("/delete/:id").delete( informationController.deleteInformation)
route.route("/update/:id").put( informationController.updateInformation)


export default route;