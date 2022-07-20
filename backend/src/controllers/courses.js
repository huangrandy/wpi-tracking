const courseRouter = require('express').Router()
const middleware = require('../utils/middleware')

let courses = [
   {
      id: 1,
      name: "CS1101"
   },
   {
      id: 2,
      name: "CS2102"
   }
]

courseRouter.get('/', async (request, response) => {
	response.json(courses)
})

courseRouter.post('/', async (request, response) => {
	const body = request.body
   console.log(body)
	// const user = request.user
	// body.user = user._id

	// const course = new Course(body)
	// const savedCourse = await course.save()

	// user.courses = user.courses.concat(savedCourse._id)
	// await user.save()
   courses = courses.concat(body)

	response.status(201).json(body)
})

module.exports = courseRouter