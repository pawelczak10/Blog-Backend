const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const routeSchema = new Schema({
  route_owner: { type: String, required: true },
//   places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
places: { type: String, required: true }
});

routeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Route', routeSchema);