import  express  from "express";
import * as seoController from '../controllers/seoController.js'
 
const route = express.Router();

route.route("/detail/create").post( seoController.createDetailSeo)
route.route("/detail").get( seoController.getDetailSeo)
route.route("/detail/update/:id").put( seoController.updateDetailSeo)


route.route("/blog/create").post( seoController.createBlogSeo)
route.route("/blog").get( seoController.getBlogSeo)
route.route("/blog/update/:id").put( seoController.updateBlogSeo)

route.route("/detail/blog/create").post( seoController.createBlogDetailSeo)
route.route("/detail/blog").get( seoController.getBlogDetailSeo)
route.route("/detail/blog/update/:id").put( seoController.updateBlogDetailSeo)

export default route;