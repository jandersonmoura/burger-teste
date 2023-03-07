import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import ProductController from './app/controller/ProductController'
import SessionController from './app/controller/SessionController'
import UserController from './app/controller/UserController'
import CategoryController from './app/controller/CategoryController'

import authMiddlewares from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

export default routes
