const usersRouter = require( 'express' ).Router()
const bcrypt = require( 'bcrypt' )
const User = require( '../models/user' )

usersRouter.get( '/', async ( req, res ) => {
	const users = await User.find( {} ).populate( 'blogs', { title: 1, author: 1, url: 1 } )
	res.json( users )
} )

usersRouter.post( '/', async ( req, res ) => {
	const { username, name, password } = req.body

	if( password.length < 3 ){
		return res.status( 400 ).json( { error: 'password must be atleat 3 characters long' } )
	}

	const existingUser = await User.findOne( { username } )
	if( existingUser ){
		return res.status( 400 ).json( { error: 'username must be unique' } )
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash( password, saltRounds )

	const user = new User( {
		username,
		name,
		passwordHash
	} )

	const savedUser = await user.save()
	res.status( 201 ).json( savedUser )

} )


module.exports = usersRouter