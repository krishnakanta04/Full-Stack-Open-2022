const Header = (props) => {
    return(
        <>
            <h1>Course Name : {props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return(
        <p>Part : {props.partName} <br />
           Exercises : {props.exercise}
        </p>
    )
}

const Content = (props) => {  
    return(
        <>
            <h2>Syllabus</h2>
            <Part partName = {props.parts[0].name} exercise = {props.parts[0].exercise} />
            <Part partName = {props.parts[1].name} exercise = {props.parts[1].exercise} />
            <Part partName = {props.parts[2].name} exercise = {props.parts[2].exercise} />
        </>
    )
}

const Total = (props) => {
    let sum = props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise
    return(
        <>
            <p>Total number of Exercises : <b>{sum}</b></p>
        </>
    )
}


const App = () => {
    // Header takes care of rendering the name of the course, 
    // Content renders the parts and their number of exercises and 
    // Total renders the total number of exercises.

    const course = {
        name : 'Half Stack application development',
        parts : [ 
            {
                name: 'Fundamentals of React',
                exercise: 10
            },
            {
                name: 'Using props to pass data',
                exercise: 7
            },
            {
                name: 'State of a component',
                exercise: 14
            } 
        ]
    }

    return(
        <>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </>
    )
  }
  
  export default App