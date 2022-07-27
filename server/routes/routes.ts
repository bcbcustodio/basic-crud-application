import { DataSource } from 'typeorm'
import { Express } from 'express'
import create from './create'
import read from './read'
import update from './update'
import _delete from './delete'

const routes = function (app: Express, connection: DataSource) {
  create(app, connection)
  read(app, connection)
  update(app, connection)
  _delete(app, connection)
}

export default routes
