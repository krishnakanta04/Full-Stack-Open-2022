// const mongoose = require('mongoose')

// if(process.argv.length < 4){
//     console.log('Missing or wrong values found : node mongo.js <password> <name> <phone number>')
//     process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const number = Number(process.argv[4])

// const url = `mongodb+srv://fullStack:${password}@cluster0.qctztsz.mongodb.net/phonebookRecords?retryWrites=true&w=majority`

// const phonebookSchema = new mongoose.Schema({
//     name : String,
//     number : Number
// })

// const Record = mongoose.model('Record', phonebookSchema)

// mongoose
//     .connect(url)
//     .then(result => {
//         console.log("Connected")
//         const newPerson = new Record({name, number})

//         return newPerson.save()
//     })
//     .then(result => {
//         console.log(result)
//         console.log(`Added ${result.name} number ${result.number} to phonebook`)
//         return mongoose.connection.close()
//     })
//     .catch(err => console.log(err))
