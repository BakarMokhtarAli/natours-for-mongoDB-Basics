const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.route("/top-5-cheap-tour")
.get(tourController.get_five_cheap_tour,tourController.getAllTours);


router
.route("/")
.get(tourController.getAllTours)
.post(tourController.createTour);

router
.route("/:id")
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router;