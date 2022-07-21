import { useState, useEffect } from 'react'
import courseService from './services/courses'
import CourseForm from './components/CourseForm'
import allCourses from './allCourses'

function App() {
  const [coursesTaken, setCoursesTaken] = useState([])
  const [message, setMessage] = useState(null)

  //loads in taken courses
  useEffect(() => {
    courseService.getAll().then(courses =>
      setCoursesTaken(courses)
    )
  }, [])



  return (
    <>
      <CourseForm
        allCourses={allCourses}
        courseService={courseService}
        coursesTaken={coursesTaken}
        setCoursesTaken={setCoursesTaken}
        message={message}
        setMessage={setMessage}
      />
      {coursesTaken.map(course =>
        <div key={course.id}>
          {course.name} {course.group}
        </div>
      )}


    </>
  )
}

export default App
