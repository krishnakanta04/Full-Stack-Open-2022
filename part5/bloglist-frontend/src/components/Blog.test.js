import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://www.testingBlogs.com/',
    likes: 0,
    user: {
      username: 'Username',
      name: 'Name',
    }
  }

  let container
  const likesMockHandler = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    container = render(<Blog blog={blog} handleLikes={likesMockHandler}/>).container
  })

  test('renders title and author but not url or number of likes by default', () => {
    expect(container.querySelector('.blog-title')).toHaveTextContent(blog.title)
    expect(container.querySelector('.blog-author')).toHaveTextContent(blog.author)

    expect(container.querySelector('.additional-details')).not.toBeInTheDocument()
  })

  test('shows the blog\'s url and number of likes when view button is clicked', async () => {
    expect(container.querySelector('.additional-details')).not.toBeInTheDocument()

    const button = container.querySelector('.details-btn')
    await user.click(button)

    expect(container.querySelector('.url')).toBeInTheDocument()
    expect(container.querySelector('.likes')).toBeInTheDocument()
  })

  test('eventhandler for likes is called twice if like button is clicked twice', async () => {
    const button = container.querySelector('.details-btn')
    await user.click(button)

    const likesBtn = container.querySelector('.likes-btn')
    await user.click(likesBtn)
    await user.click(likesBtn)

    expect(likesMockHandler.mock.calls).toHaveLength(2)
  })

})
