import  express  from "express";
import * as CommentController from '../controllers/commentController.js'
 
const route = express.Router();

route.route("/create").post( CommentController.createNumber)
route.route("/").get( CommentController.getComment)
route.route("/:id").get( CommentController.getCommentNumber)
route.route("/delete/:id").delete( CommentController.commentDelete)



export default route;