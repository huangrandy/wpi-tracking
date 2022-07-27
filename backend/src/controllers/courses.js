const courseRouter = require('express').Router()
const course = require('../models/course')
const middleware = require('../utils/middleware')

let coursesTaken = [
   {
      id: 1,
      "name": "CS 1101",
      "title": "Introduction to Program Design",
      "group": "cs"
   },
   {
      id: 2,
      "name": "CS 2102",
      "title": "Object-oriented Design Concepts",
      "group": "cs",
      "requirements": [
         "CS 1101"
      ]
   },
   {
      id: 3,
      "name": "CS 3733",
      "title": "Software Engineering",
      "group": "cs",
      "area": "design",
      "requirements": [
         "CS 2102"
      ]
   }
]

courseRouter.get('/', async (request, response) => {
   response.json(coursesTaken)
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
   coursesTaken = coursesTaken.concat(body)

   response.status(201).json(body)
})

courseRouter.put('/:id', async (request, response, next) => {
   const id = parseInt(request.params.id)
   const body = request.body
   const newCourse = {
      ...body,
      id
   }

   coursesTaken = coursesTaken.map(c =>
      c.id === id
         ? newCourse
         : c
   )

coursesTaken.forEach(c => console.log(c.name))

   response.status(200).json(newCourse)
})

module.exports = courseRouter