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
        console.log(req.body.fullName)
        console.log(req.body.age)
        console.log(req.body.favoriteColor)
        console.log('asdha')
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
      console.log(user)
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Creating Data.\n' + e)
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
      console.log('id: ' + req.body._id)
      console.log(updateArgs)
      const user = await repository.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateArgs })
      console.log(user)
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Creating Data.\n' + e)
    }
  })

  app.use(`/routes/delete/:id`, async (req, res) => {
    try {
      const id = req.params.id
      console.log('here')
      const repository = (await connection).getMongoRepository(UserData)
      const user = await repository.findOneAndDelete({ _id: new ObjectId(id) })
      return res.status(200).send(user)
    } catch (e) {
      console.log('Error Creating Data.\n' + e)
    }
  })
}

export default routes
