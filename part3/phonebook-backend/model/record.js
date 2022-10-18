const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(`Connecting to URL - ${url}`)

mongoose
  .connect(url)
  .then((result) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Error connecting to MongoDB => ${err.message}`))

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator(v) {
        return /\d{2,3}-\d+/.test(v)
      },
    },
  },
})

recordSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

module.exports = mongoose.model('Record', recordSchema)
