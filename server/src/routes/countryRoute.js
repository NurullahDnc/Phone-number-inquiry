import  express  from "express";
import * as CountryController from '../controllers/countryController.js'
 
const route = express.Router();

route.route("/create").post( CountryController.createCountry)
route.route("/").get( CountryController.getCountry)
route.route("/delete/:id").delete( CountryController.deleteCountry)
route.route("/update/:id").put( CountryController.updateCountry)


export default route;