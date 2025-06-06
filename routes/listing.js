const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require('../controllers/listings.js');


router.route("/")
  .get(
    wrapAsync(listingsController.index)
  )
  .post( isLoggedIn, validateListing,
    wrapAsync(listingsController.create)
  );

// new route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router.route("/:id")
  .get(
    wrapAsync(listingsController.showListing)
  )
  .put(isLoggedIn, isOwner, validateListing,
    wrapAsync(listingsController.updateListing)
  )
  .delete(isLoggedIn, isOwner,
    wrapAsync(listingsController.deleteListing)
  );

// edit route
router.get(
  "/:id/edit", isLoggedIn, isOwner,
  wrapAsync(listingsController.editListing)
);

module.exports = router;
