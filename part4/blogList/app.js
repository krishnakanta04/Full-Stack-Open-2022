const express = require( 'express' )
require( 'express-async-errors' )
const config = require( './utils/config' )
const logger = require( './utils/logger' )
const middleware = require( './utils/middleware' )
const loginRouter = require( './controllers/login' )
const usersRouter = require( './controllers/users' )
const blogsRouter = require( './controllers/blogs' )
const app = express()
const cors = require( 'cors' )
const mongoose = require( 'mongoose' )

logger.info( `Connecting to ${config.MONGODB_URI} ` )
mongoose.connect( config.MONGODB_URI )
	.then( () => logger.info( 'Connected to MongoDB' ) )
	.catch( err => logger.error( `Error connecting to MongoDB : ${err.message}` ) )

app.use( cors() )
app.use( express.json() )
app.use( middleware.requestLogger )
app.use( middleware.tokenExtractor )

app.use( '/api/login', loginRouter )
app.use( '/api/users', usersRouter )
app.use( '/api/blogs', middleware.userExtractor, blogsRouter )

if(process.env.NODE_ENV === 'test'){
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use( middleware.unknownEndpoint )
app.use( middleware.errorHandler )

module.exports = app