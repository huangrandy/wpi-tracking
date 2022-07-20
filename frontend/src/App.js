import { useState, useEffect } from 'react'
import courseService from './services/courses'
import CourseForm from './components/CourseForm'

function App() {
  const [coursesTaken, setCoursesTaken] = useState([])
  const [course, setCourse] = useState('')

  useEffect(() => {
    courseService.getAll().then(courses =>
      setCoursesTaken(courses)
    )
  }, [])

  const handleCourseChange = (event) => {
    setCourse(event.target.value)
  }

  const addCourse = () => {
    event.preventDefault()

    const courseObj = {
      id: Math.round(Math.random()*1000),
      name: course
    }

    courseService
    .create(courseObj)
    .then(returnedCourse => {
      setCoursesTaken(coursesTaken.concat(returnedCourse))
      setCourse('')
    })

  }

  return (
    <>
      <CourseForm 
        course={course}
        handleCourseChange={handleCourseChange}
        addCourse={addCourse}
      />
      {coursesTaken.map(course =>
        <div key={course.id}>
          {course.name}
        </div>
      )}
    </>
  )
}

export default App
