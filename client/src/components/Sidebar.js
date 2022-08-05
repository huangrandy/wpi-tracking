import { useState, useEffect } from 'react'
import allCourses from '../allCourses'
import courses from '../services/courses'

const Sidebar = ({
    coursesTaken
}) => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const ratedCourses = []
    let coursesTakenNames = coursesTaken.map(c => c.name)
    const numCs = coursesTaken
        .filter(c => c.name.includes("CS")).length
    const requirements = {
        systems: false,
        social: false,
        design: false,
        theory: false,
        num4: 0
    }

    window.onmousemove = function (e) {
        setX(e.clientX)
        setY(e.clientY)
    }

    coursesTaken.forEach(c => {
        if (c.area === 'systems') requirements.systems = true
        if (c.area === 'theory') requirements.theory = true
        if (c.area === 'design') requirements.design = true
        if (c.area === 'social') requirements.social = true
        if (c.name.charAt(3) === '4') requirements.num4++
    })

    // account for level, prereqs, number of cs taken
    allCourses.forEach(course => {
        if (coursesTakenNames.includes(course.name)) return

        const isLevel = level => {
            return parseInt(course.name.charAt(3)) === level
                ? 1
                : 0
        }

        if (course.name.includes('CS')) {
            let rating = 0, priority = 0
            let preMissing = course.requirements
                ? course.requirements.filter(course =>
                    !coursesTakenNames.includes(course)
                ).length
                : 0
            rating -= preMissing

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
                    priority = 1
                    break
                case numCs <= 14:
                    rating +=
                        2 * isLevel(4)
                        + isLevel(3)
                        - isLevel(1)
                    priority = 2
                    break
                default:
                    rating +=
                        2 * isLevel(4)
                        + isLevel(3)
                        - isLevel(1)
                    priority = 3
            }

            switch (course.area) {
                case ('systems'):
                    if (!requirements.systems) rating += priority
                    break
                case ('theory'):
                    if (!requirements.theory) rating += priority
                    break
                case ('design'):
                    if (!requirements.design) rating += priority
                    break
                case ('social'):
                    if (!requirements.social) rating += priority
                    break
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
                Requirements
            </div>
            <div>
                <div>
                    Systems Requirement: {
                        requirements.systems ? 'Complete' : "Incomplete"
                    }
                </div>
                <div>
                    Theory Requirement: {
                        requirements.theory ? 'Complete' : "Incomplete"
                    }
                </div>
                <div>
                    Design Requirement: {
                        requirements.design ? 'Complete' : "Incomplete"
                    }
                </div>
                <div>
                    Social Requirement: {
                        requirements.social ? 'Complete' : "Incomplete"
                    }
                </div>
                <div>
                    Completed 4000 Courses: {requirements.num4}/5
                </div>

            </div>

            <div className='groupTitle'>
                Recommended Courses
            </div>
            <div>
                {ratedCourses.map(c => (
                    <div
                        key={c.course.name}
                        className='tooltip'
                    >
                        {`${c.course.name}`}
                        <span
                            style={{
                                top: (y + 20) + 'px',
                                left: (x + 20) + 'px',
                                position: 'fixed'
                            }}
                        >
                            {c.course.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar