const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const {createAuthor, readAuthor, 
    updateAuthor, deleteAuthor} = require('./src/controllers/authorController')

const {createGenre, readGenres, 
    updateGenre, deleteGenre} = require('./src/controllers/genreController')

const {createBook, readBooks, updateBook, deleteBook} = require('./src/controllers/bookController')

const {createUser, readUsers} = require('./src/controllers/userController')

const {login, auth, logout, logoutAll} = require('./src/controllers/authController')

require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(router)

mongoose.connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>console.log("Successfully connected to database"))


router.route("/authors")
.get(readAuthor)
.post(auth, createAuthor)

router.route("/authors/:id")
.patch(auth, updateAuthor)
.delete(auth, deleteAuthor)

router.route("/genres")
.get(readGenres)
.post(auth, createGenre)

router.route("/genres/:id")
.patch(auth, updateGenre)
.delete(auth, deleteGenre)

router.route("/books")
.post(auth, createBook)
.get(auth, readBooks)

router.route("/books/:id")
.patch(auth, updateBook)
.delete(auth, deleteBook)

router.route("/users")
.post(createUser)
.get(readUsers)

router.route("/login")
.post(login)

router.route("/logout")
.post(auth, logout)

router.route('/logoutAll')
.post(auth, logoutAll)

app.listen(process.env.PORT, ()=> console.log("Listening to port", process.env.PORT))