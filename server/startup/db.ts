import config from '../config/config'
import { UserData } from '../entities/userData'
import { DataSource } from 'typeorm'

const database: string = process.env.db ? process.env.db : config.db

const initDatabase = async () => {
  const connection = new DataSource({
    type: 'mongodb',
    url: database,
    entities: [UserData],
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  await connection.initialize().then(() => {
    console.log('Database CONNECTED! ')
  })

  if (connection.isInitialized) {
    console.log('Running database')
  }
  return connection
}

export default initDatabase
