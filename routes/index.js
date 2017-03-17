var Promise = require('bluebird');
var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();
var models = require('../models');

module.exports = router;

var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

router.get('/', function(req, res, next) {
	var outerScopeContainer = {};

	Hotel.findAll()
	.then(function (dbHotels) {
		outerScopeContainer.dbHotels = dbHotels;
		return Restaurant.findAll();
	})
	.then(function (dbRestaurants) {
		outerScopeContainer.dbRestaurants = dbRestaurants;
		return Activity.findAll();
	})
	.then(function (dbActivities) {
		outerScopeContainer.dbActivities = dbActivities;
		 res.render('index', {
			templateHotels: outerScopeContainer.dbHotels,
			templateRestaurants: outerScopeContainer.dbRestaurants,
			templateActivities: outerScopeContainer.dbActivities
			}

		);
	})
	.catch(next);
})
