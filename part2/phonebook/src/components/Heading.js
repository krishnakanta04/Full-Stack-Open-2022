const Heading = ({type, text}) => {
    if(type === 'h1'){
        return(
            <>
                <h1>{text}</h1>
            </>
        )
    } else if (type === 'h2'){
        return(
            <>
                <h2>{text}</h2>
            </>
        )
    }
}

export default Heading