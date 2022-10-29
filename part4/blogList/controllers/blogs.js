const blogsRouter = require( 'express' ).Router()
const User = require( '../models/user' )
const Blog = require( '../models/blog' )
const jwt = require( 'jsonwebtoken' )

blogsRouter.get( '/', async ( req, res ) => {
	const blogs = await Blog.find( {} ).populate( 'user', { username: 1, name: 1 } )
	res.json( blogs )
} )

blogsRouter.post( '/', async ( req, res ) => {
	const body = req.body
	const decodedToken = jwt.verify( req.token, process.env.SECRET )
	if( !decodedToken.id ){
		return res.status( 401 ).json( { error: 'token missing or invalid' } )
	}
	const user = req.user

	const newBlog = new Blog( {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0,
		user: user._id
	} )

	const savedBlog = await newBlog.save()
	user.blogs = user.blogs.concat( savedBlog._id )
	await user.save()

	res.status( 201 ).json( savedBlog )
} )

blogsRouter.delete( '/:id', async ( req, res ) => {
	const blog = await Blog.findById( req.params.id )
	const user = req.user
	if( blog.user.toString() === user._id.toString() ){
		await Blog.findByIdAndRemove( req.params.id )
		res.status( 204 ).end()

	} else {
		return res.status( 401 ).json( { error: 'unauthorized' } )
	}
} )

blogsRouter.put( '/:id', async ( req, res ) => {
	const updatedBlog = req.body

	const returnedBlog = await Blog.findByIdAndUpdate( req.params.id, updatedBlog, { new: true } )
	res.json( returnedBlog )
} )

module.exports = blogsRouter