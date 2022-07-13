import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity()
export class UserData {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  fullName: string

  @Column()
  age: number

  @Column()
  favoriteColor: string

  constructor(fullName: string, age: number, favoriteColor: string) {
    this._id = new ObjectId()
    this.fullName = fullName
    this.age = age
    this.favoriteColor = favoriteColor
  }
}
