const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	group: {
		type: String,
		required: true
	},
	area: String,
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User'
	// }
})

courseSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()

		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Course', courseSchema)