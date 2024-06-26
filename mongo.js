const mongoose = require('mongoose')
const password = 'Mmmaahheerr24'

const url = `mongodb+srv://maher:Mmaahheerr24@cluster0.7xzauu8.mongodb.net/PersonsApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: "Maher",
  number: "055"
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})