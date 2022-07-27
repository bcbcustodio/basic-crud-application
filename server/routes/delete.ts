import { DataSource } from 'typeorm'
import { Express } from 'express'
import { UserData } from '../entities/userData'
import { ObjectId } from 'mongodb'

const _delete = function (app: Express, connection: DataSource) {
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

export default _delete
