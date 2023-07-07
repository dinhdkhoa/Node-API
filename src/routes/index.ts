import { Router } from 'express'
import authRouter from './authenticate'
import userRouter from './user'

const routes = Router()

routes.use('/', authRouter)
routes.use('/user', userRouter)

export default routes
