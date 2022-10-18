require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Record = require('./model/record')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res) => { // details for persons array
  Record.countDocuments({}, (err, count) => {
    res.send(`
        <div>
            Phonebook has information for ${count} people
        </div>
        <div>
            ${new Date()}
        </div>
        `)
  })
})

app.get('/api/persons', (req, res, next) => {
  Record.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => { // specific person object wrt. id
  Record.findById(req.params.id)
    .then((record) => {
      if (record) {
        res.json(record)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => { // delete specific person wrt. id
  Record.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => { // adding new perosn
  const { body } = req

  Record.find({ name: body.name })
    .then((result) => {
      if (result.length) {
        console.log(result)
        res.status(403).send({ err: 'Content already existing' })
      } else {
        addPeron()
      }
    })

  const addPeron = () => {
    const person = new Record({
      name: body.name,
      number: body.number,
    })

    person.save()
      .then((result) => {
        console.log(`Added ${result.name} number ${result.number}`)
        res.status(201).json(person)
      })
      .catch((err) => next(err))
  }
})

app.put('/api/persons/:id', (req, res) => {
  const { body } = req

  const person = {
    name: body.name,
    number: body.number,
  }

  Record.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedRecord) => {
      console.log(updatedRecord)
      res.json(updatedRecord)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknownEndpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformed syntax' })
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
