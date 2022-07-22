const courseRouter = require('express').Router()
const middleware = require('../utils/middleware')

let courses = [
   {
      id: 1,
      name: "CS 1101",
      group: "cs",
      area: "none"
   },
   {
      id: 2,
      name: "CS 2102",
      group: "cs",
      area: "none"
   },
   {
      id: 3,
      name: "CS 3733",
      group: "cs",
      area: "design"
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