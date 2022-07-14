import { UserData } from '../entities/userData'
import { DataSource } from 'typeorm'
import { Express } from 'express'
import { ObjectId } from 'mongodb'

interface UpdateArgs {
  fullName?: string
  age?: number
  favoriteColor?: string
}
const routes = function (app: Express, connection: DataSource) {
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

  app.use('/routes/read', async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(UserData)
      const user = await repository.find()
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Reading Data.\n' + e)
    }
  })

  app.use('/routes/update/:id', async (req, res) => {
    try {
      const repository = (await connection).getMongoRepository(UserData)

      const id = req.params.id
      let updateArgs: UpdateArgs = {}
      if (req.body.fullName) updateArgs.fullName = req.body.fullName
      if (req.body.age) updateArgs.age = req.body.age
      if (req.body.favoriteColor) updateArgs.favoriteColor = req.body.favoriteColor
      const user = await repository.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateArgs })
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Updating Data.\n' + e)
    }
  })

  app.use(`/routes/delete/:id`, async (req, res) => {
    try {
      const id = req.params.id
      const repository = (await connection).getMongoRepository(UserData)
      const user = await repository.findOneAndDelete({ _id: new ObjectId(id) })
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Deleting Data.\n' + e)
    }
  })
}

export default routes
