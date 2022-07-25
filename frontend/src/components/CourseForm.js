import { useState, useEffect } from 'react'

const CourseForm = ({
   allCourses,
   courseService,
   coursesTaken,
   setCoursesTaken,
   message,
   setMessage
}) => {
   const [course, setCourse] = useState('')

   const handleCourseChange = (event) => {
      setCourse(event.target.value)
   }

   //checks whether inputted course is valid
   const getCourseValidity = () => {
      const courseNames = coursesTaken.map(c => c.name)

      if (courseNames.includes(course)) {
         setMessage("course already taken")
         setTimeout(() => {
            setMessage(null)
         }, 5000)
         return false
      } else if (!allCourses.some(c => c.name === course)) {
         setMessage("course doesn't exist")
         setTimeout(() => {
            setMessage(null)
         }, 5000)
         return false
      }
      return true
   }

   //adds course to db
   const addCourse = () => {
      event.preventDefault()

      if (!getCourseValidity()) return

      const receivedCourse =
         allCourses.find(c => (
            c.name === course
         ))

      const courseObj = {
         ...receivedCourse,
         id: Math.round(Math.random() * 1000),
      }

      courseService
         .create(courseObj)
         .then(returnedCourse => {
            setCoursesTaken(coursesTaken.concat(returnedCourse))
            setCourse('')
         })
         .catch(error => {
            setMessage(
               "can't add course"
            )
            setTimeout(() => {
               setMessage(null)
            }, 5000)
         })
   }

   return (
      <div className="courseForm">
         {message}
         <form onSubmit={addCourse}>
            <div>
               <input
                  className="addInput"
                  value={course}
                  onChange={handleCourseChange}
               />
               <button
                  type='submit'
                  className="formButton"
               >
                  Add Course
               </button>
            </div>
         </form>
      </div>
   )
}

export default CourseForm