import { useState, useEffect, useRef } from 'react'
import CourseCell from './CourseCell'

//temp td styling? maybe refactor to stylesheet
const numberCellStyle = {
   width: '30px',
   padding: "2.5px 0",
   textAlign: "center"
}

const Group = ({
   groupName,
   numCourses,
   areas,
   coursesTaken,
   setCoursesTaken,
   courseService
}) => {
   const ref = useRef()
   const rows = []
   const courses = coursesTaken.filter(c => (
      areas.includes(c.area) || areas.includes(c.group)
   ))

   //escape/click out hook
   useEffect(() => {
      const checkIfClickedOutside = e => {
         if ((ref.current &&
            !ref.current.contains(e.target))
            || e.key === 'Escape') {
         }
      }

      document.addEventListener("mousedown", checkIfClickedOutside)
      document.addEventListener('keydown', checkIfClickedOutside)

      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
         document.removeEventListener("keydown", checkIfClickedOutside)
      }
   })

   const handleRowClick = () => {
      console.log()
      //add classname to tr?
      // TODO
   }

   //set up table rows with numbering and courses
   for (let i = 0; i < numCourses; i++) {
      let displayCourse = false
      if (i < courses.length) displayCourse = true
      const text = displayCourse ? courses[i].name : ""

      rows.push(
         <tr
            ref={ref}
            key={i}
            onClick={handleRowClick}
         >
            <td style={numberCellStyle}>
               {i + 1}
            </td>
            <CourseCell
               text={text}
               coursesTaken={coursesTaken}
               setCoursesTaken={setCoursesTaken}
               courseService={courseService}
            />
         </tr>
      )
   }


   return (
      <div className="groupInternal">
         <div className="groupTitle">
            {groupName}
         </div>

         <table>
            <tbody>
               {rows}
            </tbody>
         </table>
      </div>
   )
}

export default Group