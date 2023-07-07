import { Router } from 'express'

const authRouter = Router()

authRouter.get('/register', (req, res) => {
  res.send('register')
})
authRouter.get('/login', (req, res) => {
  res.send('login')
})

export default authRouter
