const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
dotenv.config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.set('strictQuery', true)

const createCheckoutSession = require('./utils/checkout.js');

const merchRoutes = require('./routes/merch.js')
const beanRoutes = require('./routes/bean.js')
const newsLetterRoutes = require('./routes/newsLetter.js')
const bakedGoodRoutes = require('./routes/bakedGoods.js')

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
app.use('/bakedGoods', bakedGoodRoutes)
app.use('/newsLetter', newsLetterRoutes)
app.use('/beans', beanRoutes)
app.post('/create-checkout-session', createCheckoutSession, (req, res) => {
  const session = res.locals.session;
  res.json({ url: session.url });
});

app.get('/', (req, res) => {
  res.send('API for stus brews')
})

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});