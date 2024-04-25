import express from 'express'
import dotenv from 'dotenv'
import conn from './config/db.js'
import cors from 'cors';  
import bodyParser from 'body-parser';
import CommentRoute from './src/routes/commentRoute.js'
import BlogRoute from './src/routes/blogRoute.js'
import {v2 as cloudinary} from 'cloudinary'
import fileUpload from 'express-fileupload';
import FaqRoute from './src/routes/faqRoute.js'
import PrivacyPolicyRoute from './src/routes/privacyPolicyRoute.js'
import NumberPhoneRoute from './src/routes/numberPhoneRoute.js'
import CommentFeedbackRoute from './src/routes/commentFeedbackRoute.js'
import LogoRoute from './src/routes/logoRoute.js'
import InformationRoute from './src/routes/informationRoute.js'
import AuthRoute from './src/routes/authRoute.js'








dotenv.config();

//img yukleme
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET

})

const app = express();

conn();

// CORS middleware'ini uygulamaya ekle
app.use(cors());

app.use(fileUpload({useTempFiles: true}))
 
const port = process.env.PORT || 5000;

app.use(express.json());


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.use("/comment", CommentRoute)
app.use("/blog", BlogRoute)
app.use("/faq", FaqRoute)
app.use("/privacyPolicy", PrivacyPolicyRoute)
app.use("/number", NumberPhoneRoute)
app.use("/commentFeedback", CommentFeedbackRoute)
app.use("/logo", LogoRoute)
app.use("/information", InformationRoute)
app.use("/auth", AuthRoute)












app.listen(port, ()=>{
    console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});