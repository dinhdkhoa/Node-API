import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import routes from './routes'

const app: express.Application = express()
const PORT = 4000

app.use(
  cors({
    credentials: true
  })
)
app.use(express.json())
app.use(compression())
app.use(cookieParser())

app.use('/', routes)

app.listen(PORT, function () {
  console.log(`API listening on port ${PORT}!`)
})
