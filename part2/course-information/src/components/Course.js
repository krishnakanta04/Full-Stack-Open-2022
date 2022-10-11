const Header = ({name, id}) => <h1>{name}</h1> // name:"<course name>"

const Part = ({name, exercises}) => <p>{name} {exercises}</p> // {name, exercise, id}

const Sum = ({parts}) => {
    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    return(
        <p>Total of <b>{total}</b> exercises</p>
    )
}

const Content = ({parts}) => { // parts:[{name, exercise, id}, { }, ...]
    return(
        <>
            {parts.map(part => 
                 <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}              
            <Sum parts={parts} />    
        </>
    )
}

const Course = ({courses}) => {
    console.log(courses)
    return(
        <>
            {courses.map(course => {
                return(
                <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                </div>
                )
            })}
        </>
    )
}

export default Course