import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  console.log('rendered!')
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const loggedUser = JSON.parse(loggedInUser)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log(`Username - ${username}, Password - ${password}`)
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      setMessage({
        text: `${error.response.data.error}`,
        type: 'error'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const loginForm = () => (
    <>
      <h1>LogIn to Blogs Application</h1>
      <form onSubmit={handleLogin}>
        <div>
        Username :
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        Password :
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  const newBlog = async (blogObject) => {
    try {
      const returnedNewBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      console.log(returnedNewBlog)
      setBlogs(blogs.concat(returnedNewBlog))

      setMessage({
        text: `a new blog "${returnedNewBlog.title} by "${returnedNewBlog.author}" added`,
        type: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }

  }

  const addBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <AddBlogForm createBlog={newBlog}/>
    </Togglable>
  )

  const handleBlogLikes = async (updateBlog, blogId) => {
    const updatedBlog = await blogService.update(updateBlog, blogId)
    const newBlogs = blogs.map(blog =>
      blog.id === blogId ? updatedBlog : blog
    )
    setBlogs(newBlogs)
  }

  const handleRemovedBlog = async (blogId) => {
    await blogService.remove(blogId)
    const newBlogs = blogs.filter(blog => blog.id !== blogId)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <Notification message={message}/>

      {user === null ?
        loginForm() :
        <>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>
          <button onClick={handleLogOut}>logout</button>

          {addBlogForm()}

          {blogs
            .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLikes={handleBlogLikes}
                removedBlog={handleRemovedBlog}
                username={user.username}
              />
            )}
        </>
      }

    </div>
  )
}

export default App
