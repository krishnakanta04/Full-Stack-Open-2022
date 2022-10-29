const supertest = require( 'supertest' )
const app = require( '../app' )
const mongoose = require( 'mongoose' )
const User = require( '../models/user' )
const Blog = require( '../models/blog' )
const api = supertest( app )
const helper = require( './api_test_helper' )
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )

beforeEach( async () => {
	await Blog.deleteMany( {} )
	await Blog.insertMany( helper.intialBlogs )
}, 10000 )

describe( 'when there is initially some blogs saved', () => {
	test( 'all blogs are returned', async () => {
		const response = await api.get( '/api/blogs' )
		expect( response.body.length ).toBe( helper.intialBlogs.length )

		const title = response.body.map( rb => rb.title )
		expect( title ).toContain( 'How to use a iphone 10' )
	}, 100000 )

	test( 'existence of id property is true', async () => {
		const response = await api.get( '/api/blogs' )
		expect( response.body[0].id ).toBeDefined()
	}, 100000 )
} )

describe( 'addition of a new blog', () => {
	let token = null
	beforeEach( async () => {
		await User.deleteMany( {} )

		const passwordHash = await bcrypt.hash( 'sekret', 10 )
		const user = await new User( { username: 'root', passwordHash } )
		await user.save()

		const userForToken = { username: 'root', id: user.id }
		token = jwt.sign( userForToken, process.env.SECRET )
	}, 100000 )

	test( 'succeeds with valid data', async () => {
		const newBlog = {
			title: 'Added a blog successfully',
			author: 'steve jobs 54',
			url: 'www.steveBro542.com',
			likes: '13'
		}

		await api
			.post( '/api/blogs' )
			.set( 'Authorization', `Bearer ${token}` )
			.send( newBlog )
			.expect( 201 )
			.expect( 'Content-Type', /application\/json/ )

		const blogsAtEnd = await helper.blogsInDb()
		expect( blogsAtEnd ).toHaveLength( helper.intialBlogs.length + 1 )

		const blogTitle = blogsAtEnd.map( blog => blog.title )
		expect( blogTitle ).toContain( 'Added a blog successfully' )
	}, 100000 )

	test( 'with missing likes property will set likes to zero', async () => {
		const newBlog = {
			title: 'Added a blog successfully',
			author: 'steve jobs 54',
			url: 'www.steveBro542.com'
		}

		const saveBlog = await api
			.post( '/api/blogs' )
			.set( 'Authorization', `Bearer ${token}` )
			.send( newBlog )
			.expect( 201 )
			.expect( 'Content-Type', /application\/json/ )

		expect( saveBlog.body.likes ).toBeDefined()
		expect( saveBlog.body.likes ).toBe( 0 )

	}, 10000 )

	test( 'without title or url fails with status code 400', async () => {
		const newBlog = {
			author: 'steve jobs 5',
			likes: '23'
		}

		await api
			.post( '/api/blogs' )
			.send( newBlog )
			.expect( 400 )

		const blogsAtEnd = await helper.blogsInDb()
		expect( blogsAtEnd ).toHaveLength( helper.intialBlogs.length )
	}, 10000 )
} )

describe( 'deletion of a blog', () => {
	test( 'succeeds with a statuscode 204 if id is valid', async () => {
		const blogs = await helper.blogsInDb()

		await api
			.delete( `/api/blogs/${blogs[3].id}` )
			.expect( 204 )

		const blogsAtEnd = await helper.blogsInDb()
		expect( blogsAtEnd ).toHaveLength( blogs.length - 1 )

		const blogsTitle = blogsAtEnd.map( b => b.title )
		expect( blogsTitle ).not.toContain( 'How to use a iphone 14' )
	}, 10000 )
} )

describe( 'updation of an existing blog', () => {
	test( 'succeeds with valid data', async () => {
		const blogs = await helper.blogsInDb()

		const updatedBlog = {
			title: 'How to use a iphone 10',
			author: 'steve jobs 7',
			url: 'www.steveBro76.com',
			likes: 110
		}

		const returnedBlog = await api
			.put( `/api/blogs/${blogs[2].id}` )
			.send( updatedBlog )
			.expect( 'Content-Type', /application\/json/ )
		expect( returnedBlog.body.likes ).toBe( updatedBlog.likes )

	}, 10000 )
} )

describe( 'when there is initially some users are saved', () => {
	beforeEach( async () => {
		await User.deleteMany( {} )

		const passwordHash = await bcrypt.hash( 'sekret', 10 )
		const user = new User( { username: 'root', passwordHash } )

		await user.save()
	} )

	test( 'adding of same users fails with proper status code and error message', async () => {
		const usersAtStart = await User.find( {} )

		const existingUser = {
			username: 'root',
			name: 'iamgroot',
			password: 'helloGroot'
		}

		const result = await api
			.post( '/api/users' )
			.send( existingUser )
			.expect( 400 )
			.expect( 'Content-Type', /application\/json/ )

		expect( result.body.error ).toContain( 'username must be unique' )

		const usersAtEnd = await User.find( {} )
		expect( usersAtEnd ).toEqual( usersAtStart )
	} )

	test( 'adding password of length less than 3 characters fails', async () => {
		const usersAtStart = await User.find( {} )

		const existingUser = {
			username: 'root',
			name: 'iamgroot',
			password: 'he'
		}

		const result = await api
			.post( '/api/users' )
			.send( existingUser )
			.expect( 400 )
			.expect( 'Content-Type', /application\/json/ )

		expect( result.body.error ).toContain( 'password must be atleat 3 characters long' )

		const usersAtEnd = await User.find( {} )
		expect( usersAtEnd ).toEqual( usersAtStart )
	} )
} )


afterAll( () => mongoose.connection.close() )
