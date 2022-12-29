import { useState } from 'react'

const Blog = ({ blog, handleLikes, removedBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails =  () => {
    setShowDetails(!showDetails)
  }

  const increaseLike = () => {
    const updateLike = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    handleLikes(updateLike, blog.id)
  }

  const removeBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removedBlog(blog.id)
    }
  }


  return(
    <div style={blogStyle} className="blog">
      <span className='blog-title'>{blog.title} - </span>
      <span className='blog-author'>{blog.author}</span>
      <button className='details-btn' onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails
        ? <div className='blog-details'>
          <p className='url'>{blog.url}</p>
          <span className='likes'>likes- {blog.likes}</span>
          <button onClick={increaseLike} className='likes-btn'>like</button>
          <p>{blog.user.name}</p>
          { blog.user.username === username &&
              <button onClick={removeBlog}>remove</button>
          }
        </div>
        : null
      }
    </div>
  )
}

export default Blog