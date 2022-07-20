const CourseForm = ({
   course,
   handleCourseChange,
   addCourse
}) => {
   return (
      <form onSubmit={addCourse}>
         <div>
            <input
               value={course}
               onChange={handleCourseChange}
            />
            <button type='submit'>Add Course</button>
         </div>
      </form>
   )
}

export default CourseForm