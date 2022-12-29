import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm/>', () => {
  test('event handler for creating new blogs is called with right details', async () => {
    const createBlog = jest.fn()
    const container = render(<AddBlogForm createBlog={createBlog}/>).container

    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const createBtn = screen.getByText('create')

    const user = userEvent.setup()
    await user.type(titleInput, 'title')
    await user.type(authorInput, 'author')
    await user.type(urlInput, 'url')
    await user.click(createBtn)

    expect(createBlog.mock.calls.length).toBe(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual({ title:'title', author:'author', url:'url' })
  })
})