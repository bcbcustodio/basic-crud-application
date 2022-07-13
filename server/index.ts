import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import db from './startup/db'
import routes from './routes/routes'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT_SERVER

const httpServer = http.createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With')
  next()
})
app.use(
  cors({
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
  })
)
app.get('/test', (req, res) => {
  res.send('Well done!')
})
httpServer.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}!`)
})

async function initRoutes(): Promise<void> {
  const connection = await db()
  routes(app, connection)
}

initRoutes()
