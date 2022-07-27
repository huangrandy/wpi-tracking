import { useState, useEffect } from 'react'
import courseService from './services/courses'
import allCourses from './allCourses'
import CourseForm from './components/CourseForm'
import Group from './components/Group'
import Sidebar from './components/Sidebar'
import Masonry from 'react-masonry-css'
import "./styles/App.css"

function App() {
   const [coursesTaken, setCoursesTaken] = useState([])
   const [message, setMessage] = useState(null)
   const [groups, setGroups] = useState([])

   //maps group name to number of courses in group
   const numCoursesMap = new Map([
      ['Computer Science', 15],
      ['General', 21],
      ['Math', 7],
      ['Science', 5]
   ])

   //courses with no area have area-name = group-name
   const areaMap = new Map([
      ['Computer Science', ['cs', 'theory', 'systems', 'social', 'design']],
      ['General', ['humanities', 'ss', 'iqp', 'mqp']],
      ['Math', ['math']],
      ['Science', []]
   ])

   //loads in taken courses
   useEffect(() => {
      const getCourses = async () => {
         const courses = await courseService.getAll()
         setCoursesTaken(courses)
      }
      getCourses()

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
               Interactive Tracking App
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
                           setCoursesTaken={setCoursesTaken}
                        />
                     </div>
                  )}
               </Masonry>
            </div>
            <Sidebar
               coursesTaken={coursesTaken}
            />
         </div>
      </div>
   )
}

export default App
