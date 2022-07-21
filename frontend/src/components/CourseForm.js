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
      <>
         {message}
         <form onSubmit={addCourse}>
            <div>
               <input
                  value={course}
                  onChange={handleCourseChange}
               />
               <button type='submit'>Add Course</button>
            </div>
         </form>
      </>
   )
}

export default CourseForm