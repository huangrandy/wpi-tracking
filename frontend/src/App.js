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
      1350: 3,
      1080: 2,
      810: 1
   }

   return (
      <div>
         <nav className='sticky'>
            <h2 className="navLabel">
               Tracking App
            </h2>
         </nav>
         <div className='bodyContainer'>
            <div className="bodyContent justifyStart">
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

               <p></p>

               <Masonry
                  breakpointCols={breakpoints}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
               >
                  {groups.map(group =>
                     <div key={group}>
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
            <div className="sidebar">
               Recommended Courses:

            </div>
         </div>
      </div>
   )
}

export default App
