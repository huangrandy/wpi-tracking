import { Table } from 'react-bootstrap'

const Group = ({
   groupName,
   numCourses,
   areas,
   coursesTaken
}) => {
   const rows = []
   const courses = coursesTaken.filter(c => areas.includes(c.area))

   const numberCellStyle = {
      width: '30px',
      padding: "2.5px 0",
      textAlign: "center"
   }
   const courseCellStyle = {
      width: '220px',
      padding: "2px 2px 2px 4px"
   }

   for (let i = 0; i < numCourses; i++) {
      let displayCourse = false
      if (i < courses.length) displayCourse = true
      rows.push(
         <tr key={i}>
            <td style={numberCellStyle}>
               {i + 1}
            </td>
            <td
               style={courseCellStyle}
               onClick={(event) => { }}
            >
               {displayCourse ? courses[i].name : ""}
            </td>
         </tr>
      )
   }

   const handleClickCell = () => {

   }

   return (
      <div className="groupInternal">
         <div className="groupTitle">
            {groupName}
         </div>
         <form>
            <table>
               <tbody>
                  {rows}
               </tbody>
            </table>
         </form>
      </div>
   )
}

export default Group