const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Route = require('../models/route');
const User = require('../models/user');
const mongoose = require('mongoose')

const addRoute = async (req, res, next) => {
	console.log("NOOOOOOOOOO..........................")
	let route_owner = req.body.route_owner;
	let places = req.body.places;
	
	let origin=places[0].Lat+','+places[0].Long;
	let dest=places[places.length-1].Lat+','+places[places.length-1].Long;
	let waypoints='';
	for (let i = 1; i < places.length-1; i++) {
		if(i!=1) waypoints+="|"+places[i].Lat+','+places[i].Long;
		else waypoints+=places[i].Lat+','+places[i].Long
	}

	let googleUrl="https://www.google.com/maps/dir/?api=1&origin="+
					origin+"&destination="+dest+"&waypoints="+waypoints+"&travelmode=car";

	
	const createdRoute = new Route({
		route_owner: route_owner,
		places: googleUrl
	  });

	try {
		await createdRoute.save();
	} catch (err) {
		const error = new HttpError(
		  'Signing up failed, please try again later.',
		  500
		);
		return next(error);
  	};

}

const getRoute = async (req, res, next) => {
	const userId = req.params.uid;
	console.log("AAAAA " ,userId);
	let userRoutes;
	try {

		userRoutes = await Route.find({'route_owner' : new RegExp(userId, 'i')});
		console.log(userRoutes);
	} catch (err) {
	  const error = new HttpError(
		'Fetching routes failed, please try again later.',
		500
	  );
	  return next(error);
	}

	if (!userRoutes || userRoutes.length === 0) {
	  return next(
		new HttpError('Could not find routes for the provided user id.', 404)
	  );
	}

	console.log("EEEEEE",userRoutes[userRoutes.length-1]);
	res.json({ route: userRoutes[userRoutes.length-1].toObject({ getters: true })});

}



exports.addRoute = addRoute;
exports.getRoute = getRoute;