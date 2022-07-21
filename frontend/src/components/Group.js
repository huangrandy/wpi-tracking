import { Table } from 'react-bootstrap'

const Group = ({
   groupName,
   numCourses,
   areas,
   coursesTaken
}) => {
   const rows = []
   const courses = coursesTaken.filter(c => areas.includes(c.area))
   const tableStyle = {
      width: 'auto',
      whiteSpace:"nowrap"
   }
   
   const groupTdStyle = {
      padding: "5px"
   }
   const numberTdStyle = {
      width: '40px',
      padding: "5px"
   }
   const courseTdStyle = {
      width: '200px',
      padding: "5px"
   }

   for (let i = 0; i < numCourses; i++) {
      let displayCourse = false
      if (i < courses.length) displayCourse = true
      rows.push(
         <tr key={i}>
            <td style={numberTdStyle}>
               {i + 1}
            </td>
            <td style={courseTdStyle}>
               {displayCourse ? courses[i].name : ""}
            </td>
         </tr>
      )
   }

   return (
      <div>
         <Table striped bordered style={tableStyle}>
            <tbody>
               <tr>
                  <td colSpan={2} style={groupTdStyle}>
                     {groupName}
                  </td>
               </tr>
               {rows}
            </tbody>
         </Table>
      </div>
   )
}

export default Group