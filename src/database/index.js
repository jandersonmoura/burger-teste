import Sequelize from 'sequelize'
import Category from '../app/models/Category'
import Products from '../app/models/Products'

import User from '../app/models/User'
import configDatabase from '../config/database'

const models = [User, Products, Category]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.conection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.conection))
      .map((model) => model.associate && model.associate(this.conection.models))
  }
}

export default new Database()
