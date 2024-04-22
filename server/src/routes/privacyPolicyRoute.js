import  express  from "express";
import * as PrivacyPolicyController from '../controllers/privacyPolicyController.js'
 
const route = express.Router();

route.route("/create").post( PrivacyPolicyController.createPrivacyPolicy)
route.route("/").get( PrivacyPolicyController.getPrivacyPolicy)
route.route("/delete/:id").delete( PrivacyPolicyController.deletePrivacyPolicy)
route.route("/update/:id").put( PrivacyPolicyController.updatePrivacyPolicy)


export default route;