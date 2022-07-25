import { useState, useRef, useEffect } from 'react'
import courseService from '../services/courses'
import allCourses from '../allCourses'

const courseCellStyle = {
   width: '220px',
   padding: "2px 2px 2px 4px",
   height: 'auto'
}

const CourseCell = ({
   text,
   coursesTaken,
   setCoursesTaken
}) => {
   const ref = useRef()
   const [editMode, setEditMode] = useState(false)
   const [message, setMessage] = useState(null)
   const [courseCellText, setCourseCellText] = useState('')


   useEffect(() => {
      setCourseCellText(text)
   }, [coursesTaken])

   //escape/click out hook
   useEffect(() => {
      const checkIfClickedOutside = e => {
         if ((editMode &&
            ref.current &&
            !ref.current.contains(e.target))
            || e.key === 'Escape') {
            setEditMode(false)
            setCourseCellText(text)
         }
      }

      document.addEventListener("mousedown", checkIfClickedOutside)
      document.addEventListener('keydown', checkIfClickedOutside)

      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
         document.removeEventListener("keydown", checkIfClickedOutside)
      }
   }, [editMode])

   //enter to submit
   useEffect(() => {
      if (editMode) {
         const keyDownHandler = event => {
            console.log('User pressed: ', event.key)

            if (event.key === 'Enter') {
               event.preventDefault()
               console.log("courseCellText", courseCellText)
               handleSubmit()
            }
         }

         document.addEventListener('keydown', keyDownHandler)

         return () => {
            document.removeEventListener('keydown', keyDownHandler)
         }
      }
   }, [editMode, courseCellText])

   const getCourseValidity = () => {
      const courseNames = coursesTaken.map(c => c.name)

      if (courseCellText === text) return true
      if (courseNames.includes(courseCellText)) {
         setMessage("course already taken")
         setTimeout(() => {
            setMessage(null)
         }, 5000)
         return false
      } else if (!allCourses.some(c => c.name === courseCellText)) {
         setMessage("course doesn't exist")
         setTimeout(() => {
            setMessage(null)
         }, 5000)
         return false
      }
      return true
   }

   const handleSubmit = () => {
      //update coursesTaken
      //change td back to text
      if (!getCourseValidity()) return

      //same text as pre-edit (no change)
      if (courseCellText === text) {
         setEditMode(false)
         return
      }


      //edit course
      if (text !== '') {
         const courseToChange = coursesTaken.find(c => (
            c.name === text
         ))

         const id = courseToChange.id
         const courseObj = allCourses.find(c => (
            c.name === courseCellText
         ))
         courseObj.id = id

         console.log('editing course')
         console.log('prev course', courseToChange)
         console.log('new course', courseObj)
         console.log('courseCellText', courseCellText)

         courseService
            .update(courseObj.id, courseObj)
            .then(returnedCourse => {
               setCoursesTaken(coursesTaken.concat(returnedCourse))
            })
            .catch(error => {
               setMessage(
                  "can't edit course"
               )
               setTimeout(() => {
                  setMessage(null)
               }, 5000)
            })
      }
      //add course
      else {
         const courseObj = allCourses.find(c => (
            c.name === courseCellText
         ))
         courseObj.id = Math.round(1000 * Math.random())

         console.log('adding new course')
         console.log('new course', courseObj)
         console.log('courseCellText', courseCellText)

         courseService
            .create(courseObj)
            .then(returnedCourse => {
               setCoursesTaken(coursesTaken.concat(returnedCourse))
               setEditMode(false)
            })
            .catch(error => {
               console.log(error)
               setMessage(
                  "can't add course"
               )
               setTimeout(() => {
                  setMessage(null)
               }, 5000)
            })
      }

   }

   const handleCourseCellClick = () => {
      setEditMode(!editMode)
   }

   const handleCourseCellChange = event => {
      setCourseCellText(event.target.value)
   }



   if (!editMode) {
      return (
         <td
            style={courseCellStyle}
            onClick={handleCourseCellClick}
         >
            {courseCellText}
         </td>
      )
   }
   //edit mode 
   else {

      return (
         <td ref={ref}>
            <form>
               <input
                  className='courseCellInput'
                  value={courseCellText}
                  onChange={handleCourseCellChange}
                  autoFocus
               />
            </form>
            <div>
               {message}
            </div>
         </td>
      )
   }
}

CourseCell.displayName = 'CourseCell'


export default CourseCell