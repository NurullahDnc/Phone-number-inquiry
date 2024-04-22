import  express  from "express";
import * as faqController from '../controllers/faqController.js'
 
const route = express.Router();

route.route("/create").post( faqController.createFaq)
route.route("/").get( faqController.getFaq)
route.route("/delete/:id").delete( faqController.deleteFaq)
route.route("/update/:id").put( faqController.updateFaq)


export default route;