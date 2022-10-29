const Blog = require( '../models/blog' )

const intialBlogs = [
	{
		title: 'How to use a iphone 5',
		author: 'steve jobs 5',
		url: 'www.steveBro54.com',
		likes: 23
	},
	{
		title: 'How to use a iphone 7',
		author: 'steve jobs 4',
		url: 'www.steveBro23.com',
		likes: 12
	},
	{
		title: 'How to use a iphone 10',
		author: 'steve jobs 7',
		url: 'www.steveBro76.com',
		likes: 65
	},
	{
		title: 'How to use a iphone 14',
		author: 'steve jobs 8',
		url: 'www.steveBro23.com',
		likes: 45
	},
]

const blogsInDb = async () => {
	const blogs = await Blog.find( {} )
	return blogs
}

module.exports = { intialBlogs, blogsInDb }