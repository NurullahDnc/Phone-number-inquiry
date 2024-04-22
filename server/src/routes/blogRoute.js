import  express  from "express";
import * as BlogController from '../controllers/blogController.js'
 
const route = express.Router();

route.route("/create").post( BlogController.createBlog)
route.route("/").get( BlogController.getBlog)
route.route("/:id").get( BlogController.getDetailBlog)
route.route("/delete/:id").delete( BlogController.deleteBlog)
route.route("/update/:id").put( BlogController.updateBlog)


export default route;