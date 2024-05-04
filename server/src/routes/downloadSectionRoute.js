import  express  from "express";
import * as DownloadSectionController from '../controllers/downloadSectionController.js'
 
const route = express.Router();

route.route("/create").post( DownloadSectionController.createDownloadSection)
route.route("/").get( DownloadSectionController.getDownloadSection)
route.route("/delete/:id").delete( DownloadSectionController.deleteDownloadSection)
route.route("/update/:id").put( DownloadSectionController.updateDownloadSection)


export default route;