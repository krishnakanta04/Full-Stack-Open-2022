const Notification = ({ message }) => {
  if(message === null){
    return null
  }

  return(
    <div className={`${message.type} notification`}>
      {message.text}
    </div>
  )
}

export default Notification