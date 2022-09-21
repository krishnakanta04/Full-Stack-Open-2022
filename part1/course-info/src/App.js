const Header = (props) => {
    return(
        <>
            <h1>Course Name : {props.courseName}</h1>
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
            <Part partName = {props.part1} exercise = {props.exe1} />
            <Part partName = {props.part2} exercise = {props.exe2} />
            <Part partName = {props.part3} exercise = {props.exe3} />
        </>
    )
}

const Total = (props) => {
    return(
        <>
            <p>Total number of Exercises : <b>{props.total}</b></p>
        </>
    )
}


const App = () => {
    // Header takes care of rendering the name of the course, 
    // Content renders the parts and their number of exercises and 
    // Total renders the total number of exercises.

    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return(
        <>
            <Header courseName={course}/>
            <Content part1={part1} exe1={exercises1}
                     part2={part2} exe2={exercises2}
                     part3={part3} exe3={exercises3}
            />
            <Total total={exercises1+exercises2+exercises3}/>
        </>
    )
  }
  
  export default App