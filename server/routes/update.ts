import { DataSource } from 'typeorm'
import { Express } from 'express'
import { UserData } from '../entities/userData'
import { ObjectId } from 'mongodb'

interface UpdateArgs {
  fullName?: string
  age?: number
  favoriteColor?: string
}

const update = function (app: Express, connection: DataSource) {
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
}

export default update
