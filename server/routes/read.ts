import { DataSource } from 'typeorm'
import { Express } from 'express'
import { UserData } from '../entities/userData'

const read = function (app: Express, connection: DataSource) {
  app.use('/routes/read', async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(UserData)
      const user = await repository.find()
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Reading Data.\n' + e)
    }
  })
}

export default read
