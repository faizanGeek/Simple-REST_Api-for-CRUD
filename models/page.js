const mongoose = require('mongoose');
const pageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	likerToPost: {
		type: String,
		required: true,
	},

	likeDates: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model('pager', pageSchema);
