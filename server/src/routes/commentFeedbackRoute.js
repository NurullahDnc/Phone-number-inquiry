import  express  from "express";
import * as CommentFeedbackController from '../controllers/commentFeedbackController.js'
 
const route = express.Router();

route.route("/create").post( CommentFeedbackController.createCommentFeedback)
route.route("/").get( CommentFeedbackController.getCommentFeedback)
route.route("/delete/:id").delete( CommentFeedbackController.deleteCommentFeedback)



export default route;