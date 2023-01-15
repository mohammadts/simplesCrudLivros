const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')
const hbs = exphbs.create({
  partialsDir: ['views/partials']
})
const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pageqty = req.body.pageqty
  const language = req.body.language
  const description = req.body.description
  const publisher = req.body.publisher
  const publication_date = req.body.publication_date
  const isbn_13 = req.body.isbn_13
  const isbn_10 = req.body.isbn_10

  const sql = `INSERT INTO BOOKS(??, ??,??,??,??,??,??,??) values(?,?,?,?,?,?,?,?)`

  const data = [
    'title',
    'pageqty',
    'language',
    'description',
    'publisher',
    'publication_date',
    'isbn_13',
    'isbn_10',
    title,
    pageqty,
    language,
    description,
    publisher,
    publication_date,
    isbn_13,
    isbn_10
  ]

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/books')
  })
})

app.get('/books', (req, res) => {
  const sql = 'SELECT id, title, pageqty FROM BOOKS'
  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const books = data
    res.render('books', { books })
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM BOOKS WHERE ?? = ?`

  const data = ['id', id]

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    if (data[0].publication_date) {
      data[0].publication_date = data[0].publication_date.toLocaleDateString()
    }

    const book = data[0]
    if (!book) {
      res.render('404')
      return
    }

    res.render('book', { book })
  })
})
app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM BOOKS WHERE ?? = ?`

  const data = ['id', id]
  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    if (data[0].publication_date) {
      data[0].publication_date = data[0].publication_date
        .toISOString()
        .split('T')[0]
    }

    const book = data[0]

    if (!book) {
      res.render('404')
      return
    }
    res.render('editbook', { book })
  })
})

app.post('/books/updatebook/', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty
  const language = req.body.language
  const description = req.body.description
  const publisher = req.body.publisher
  const publication_date = req.body.publication_date
  const isbn_13 = req.body.isbn_13
  const isbn_10 = req.body.isbn_10

  const sql = `UPDATE BOOKS SET ?? = ?, ?? = ?, ?? = ?,?? = ?,?? = ?,?? = ?,?? = ?, ?? = ?  WHERE ?? = ?`
  data = [
    'title',
    title,
    'pageqty',
    pageqty,
    'language',
    language,
    'description',
    description,
    'publisher',
    publisher,
    'publication_date',
    publication_date,
    'isbn_13',
    isbn_13,
    'isbn_10',
    isbn_10,
    'id',
    id
  ]

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  })
})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id
  const sql = `DELETE FROM BOOKS WHERE ??=?`
  data = ['id', id]

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  })
})

app.get('/*', (req, res) => {
  res.render('404')
})
app.listen(3000)
