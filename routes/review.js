const express=require('express');
const router=express.Router({mergeParams:true});
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewController = require("../controllers/review.js");



// Reviews
// post review route
router.post("/",isLoggedIn ,validateReview ,wrapAsync(reviewController.createReview))
 
 //delete review route
// router.delete("/listings/:id/reviews/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))
 router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

 module.exports= router;
 

