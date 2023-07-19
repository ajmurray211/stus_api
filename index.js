const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
dotenv.config()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
mongoose.set('strictQuery', true)

const merchRoutes = require('./routes/merch.js')
const beanRoutes = require('./routes/bean.js')
const newsLetterRoutes = require('./routes/newsLetter.js')

let mongoURI = ""
if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.DB_URL;
} else {
  mongoURI = process.env.LOCALHOST;
}

mongoose.connect(mongoURI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', () => {
  console.log('Database connected')
})

app.use('/merch', merchRoutes)
app.use('/newsLetter', newsLetterRoutes)
app.use('/bean', beanRoutes)

app.get('/', (req, res) => {
  res.send('API for stus brews')
})

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});