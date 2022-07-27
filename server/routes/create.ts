import { DataSource } from 'typeorm'
import { Express } from 'express'
import { UserData } from '../entities/userData'

const create = function (app: Express, connection: DataSource) {
  app.use('/routes/create', async (req, res) => {
    try {
      if (!req.body.fullName || !req.body.age || !req.body.favoriteColor) {
        return res.status(400).send('Incomplete Details for user creation')
      }
      const newUser = new UserData(req.body.fullName, req.body.age, req.body.favoriteColor)
      const repository = (await connection).getMongoRepository(UserData)
      const user = await repository.insertOne(newUser)
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Creating Data.\n' + e)
    }
  })
}

export default create
