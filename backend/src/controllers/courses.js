const courseRouter = require('express').Router()
const Course = require('../models/course')
const middleware = require('../utils/middleware')


courseRouter.get('/', async (request, response) => {
   const coursesTaken = await Course.find({})
   response.json(coursesTaken)
})

courseRouter.post('/', async (request, response) => {
   const body = request.body

   // const user = request.user
   // body.user = user._id

   const course = new Course(body)
   const savedCourse = await course.save()

   // user.courses = user.courses.concat(savedCourse._id)
   // await user.save()

   response.status(201).json(savedCourse)
})

courseRouter.put('/:id', async (request, response, next) => {
   const body = request.body
   const course = await Course.findById(request.params.id)

   const updatedCourse = await Course
      .findByIdAndUpdate(request.params.id, body, { new: true })

   updatedCourse
      ? response.status(200).json(updatedCourse.toJSON())
      : response.status(404).end()
})

courseRouter.delete('/:id', async (request, response) => {
   // const decodedToken = jwt.verify(request.token, process.env.SECRET)
   const courseId = request.params.id

   //checks whether token is valid
   // if (!decodedToken.id) {
   // 	return response.status(401).json({ error: 'token missing or invalid' })
   // }

   // const user = request.user
   const course = await Course.findById(courseId)

   //checks whether user is correct
   // if (course.user.toString() !== user._id.toString()) {
   // 	return response.status(401).json({ error: 'bad user' })
   // }

   // user.courses = user.courses.filter(n =>
   //    n.toString() !== blogId
   // )
   // await user.save()
   await Course.findByIdAndRemove(courseId)

   response.status(204).end()
})

module.exports = courseRouter