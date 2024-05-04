import  express  from "express";
import * as SocialController from '../controllers/socialController.js'
 
const route = express.Router();

route.route("/create").post( SocialController.createSocial)
route.route("/").get( SocialController.getSocial)
route.route("/update/:id").put( SocialController.updateSocial)


export default route;