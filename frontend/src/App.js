import { useState, useEffect } from 'react'
import courseService from './services/courses'
import CourseForm from './components/CourseForm'
import allCourses from './allCourses'
import Group from './components/Group'
import Masonry from 'react-masonry-css'
import { Navbar, Container } from 'react-bootstrap'
import "./App.css"

function App() {
   const [coursesTaken, setCoursesTaken] = useState([])
   const [message, setMessage] = useState(null)
   const [groups, setGroups] = useState([])

   const numCoursesMap = new Map([
      ['Computer Science', 15],
      ['General', 21],
      ['Math', 7],
      ['Science', 5]
   ])

   const areaMap = new Map([
      ['Computer Science', ['none', 'theory', 'systems', 'social', 'design']],
      ['General', ['humanities', 'ss', 'iqp', 'mqp']],
      ['Math', []],
      ['Science', []]
   ])

   //loads in taken courses
   useEffect(() => {
      courseService.getAll().then(courses =>
         setCoursesTaken(courses)
      )
      setGroups(['Computer Science', 'General', 'Math', 'Science'])

   }, [])

   const breakpoints = {
      default: 4,
      1220: 3,
      780: 2,
      540: 1
   }

   return (
      <div>
         <Navbar variant="light">
            <h4>
               Tracking App
            </h4>
         </Navbar>
         <div className="body">
            <CourseForm
               allCourses={allCourses}
               courseService={courseService}
               coursesTaken={coursesTaken}
               setCoursesTaken={setCoursesTaken}
               message={message}
               setMessage={setMessage}
            />

            <h2>all courses taken</h2>
            {coursesTaken.map(course =>
               <div key={course.id}>
                  {course.name} {course.area}
               </div>
            )}

            <h2>groups</h2>
            <Masonry
               breakpointCols={breakpoints}
               className="my-masonry-grid"
               columnClassName="my-masonry-grid_column"
            >
               {groups.map(group =>
                  <div key={group} className="tableDiv">
                     <Group
                        groupName={group}
                        numCourses={numCoursesMap.get(group)}
                        areas={areaMap.get(group)}
                        coursesTaken={coursesTaken}
                     />
                  </div>
               )}
            </Masonry>
         </div>
      </div>
   )
}

export default App
