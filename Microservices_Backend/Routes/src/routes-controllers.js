const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Route = require('../models/route');

const addRoute = async (req, res, next) => {

    let route_owner = req.body.route_owner;
    let places = req.body.places;

    let origin = places[0].Lat + ',' + places[0].Long;
    let dest = places[places.length - 1].Lat + ',' + places[places.length - 1].Long;
    let waypoints = '';
    for (let i = 1; i < places.length - 1; i++) {
        if (i != 1) waypoints += "|" + places[i].Lat + ',' + places[i].Long;
        else waypoints += places[i].Lat + ',' + places[i].Long
    }

    let googleUrl = "https://www.google.com/maps/dir/?api=1&origin=" +
        origin + "&destination=" + dest + "&waypoints=" + waypoints + "&travelmode=car";


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
exports.addRoute = addRoute;