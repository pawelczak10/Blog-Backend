const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Route = require('../models/route');

const addRoute = async (req, res, next) => {
	console.log('backendroutes')

	let places = req.params.places.toString();

	const createdRoute = new Route({
		route_owner: req.params.route_owner,
		places: places
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
exports.addRoute = addRoute;
