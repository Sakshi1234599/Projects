
const express=require('express');
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
//const ExpressError = require("../utils/expressError.js");
//const {listingSchema} =require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController = require("../controllers/listing.js");
//const { renderNewForm } = require('../controllers/listing.js');
const multer = require('multer');
const { storage } = require("../cloudConfig.js"); 
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'), validateListing,wrapAsync(listingController.createListing) )
// .post((req,res)=>{
//     // res.send(req.file);
//     if (req.file) {
//         res.send(req.file);
//       } else {
//         next(new Error('No file uploaded or something went wrong'));
//       }
// })

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync( listingController.destroyListing))

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync( listingController.renderEditForm));

module.exports=router;