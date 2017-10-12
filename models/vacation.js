var mongoose = require('mongoose'),
	 Schema = mongoose.Schema;

let VacationSchema = new Schema({
		activity: String,
		city: String,
		country: String,
		photoUrl: String
});

var Vacation = mongoose.model('Vacation', VacationSchema);

module.exports = Vacation;