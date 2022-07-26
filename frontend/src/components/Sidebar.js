import useEffect from 'react'
import allCourses from '../allCourses'

const Sidebar = ({ coursesTaken }) => {
   const ratedCourses = []
   let coursesTakenNames = coursesTaken.map(c => c.name)
   const numCs = coursesTaken
      .filter(c => c.name.includes("CS")).length

   // account for level, prereqs, number of cs taken
   allCourses.forEach(course => {
      if (coursesTakenNames.includes(course.name)) return

      const isLevel = level => {
         return parseInt(course.name.charAt(3)) === level
            ? 1
            : 0
      }

      if (course.name.includes('CS')) {
         let rating = 0
         let preReqsMissing = 0

         switch (true) {
            case numCs <= 0:
               rating +=
                  isLevel(1)
               break
            case numCs <= 1:
               rating +=
                  2 * isLevel(2)
                  + isLevel(3)
                  - isLevel(4)
                  - isLevel(1)
               break
            case numCs <= 6:
               rating +=
                  2 * isLevel(2)
                  + isLevel(3)
                  - isLevel(1)
               break
            case numCs <= 10:
               rating +=
                  2 * isLevel(3)
                  + isLevel(4)
                  - isLevel(1)
               break
            default:
               rating +=
                  2 * isLevel(4)
                  + isLevel(3)
                  - isLevel(1)
         }

         ratedCourses.push({
            course,
            rating
         })
      }
   })

   ratedCourses.sort((a, b) =>
      b.rating - a.rating
   )


   return (
      <div className="sidebar">
         <div className='groupTitle'>
            Recommended Courses
         </div>
         <div>
            {ratedCourses.map(c => (
               <div key={c.course.name}>
                  {`${c.course.name}`}
               </div>
            ))}
         </div>
      </div>
   )
}

export default Sidebar