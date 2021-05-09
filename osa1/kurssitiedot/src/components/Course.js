import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} name={part.name} 
                exercises={part.exercises}/>
            ))}
        </div>
    )
}

const Total = ({ parts }) => {
    const sum = parts.map(part =>
        part.exercises).reduce((a, b) => a + b, 0)
    return (
        <div>
            <b>total of {sum} exercises</b>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.exercises}</p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course