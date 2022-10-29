const logger = require( './logger' )
const jwt = require( 'jsonwebtoken' )
const User = require( '../models/user' )

const requestLogger = ( req, res, next ) => {
	logger.info( '- - - - - - - - - - - - - ' )
	logger.info( `Method : ${req.method}` )
	logger.info( `Path   : ${req.path}` )
	logger.info( `Body   : ${JSON.stringify( req.body )}` )
	logger.info( '- - - - - - - - - - - - - ' )
	next()
}

const errorHandler = ( err, req, res, next ) => {
	logger.error( err.message )

	if( err.name === 'CastError' ){
		return res.status( 400 ).send( { error: 'malformed syntax' } )
	} else if( err.name === 'ValidationError' ){
		return res.status( 400 ).json( { error: err.message } )
	} else if( err.name === 'JsonWebTokenError' ){
		return res.status( 400 ).json( { error: 'invalid Token' } )
	}
	next( err )
}

const unknownEndpoint = ( req, res ) => {
	res.status( 404 ).send( { error: 'unknown endpoint' } )
}

const tokenExtractor = ( req, res, next ) => {
	const authorization = req.get( 'authorization' )
	if( authorization && authorization.toLowerCase().startsWith( 'bearer ' ) )
		req.token = authorization.substring( 7 )

	next()
}

const userExtractor = async ( req, res, next ) => {
	if( req.token ){
		const decodedToken = jwt.verify( req.token, process.env.SECRET )
		const user = await User.findById( decodedToken.id )
		req.user = user
	}

	next()
}


module.exports = {
	requestLogger,
	errorHandler,
	unknownEndpoint,
	tokenExtractor,
	userExtractor
}