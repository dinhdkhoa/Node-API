import { createUser, getUsersByEmail } from './../db/models/user.model'
import { Request, Response } from 'express'
import { authentication, random } from './../helpers'
import { User } from 'types/user'

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, username, password } = req.body
      if (!email || !username || !password) return res.sendStatus(400)

      const existingUser = await getUsersByEmail(email, false)
      if (existingUser) return res.sendStatus(400)

      const salt = random()

      const newUser = await createUser({
        email,
        username,
        authentication: {
          salt,
          password: authentication(salt, password)
        }
      })

      return res.status(202).json(newUser).end()
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if (!email || !password) return res.sendStatus(400)

      const user = await getUsersByEmail(email, true)

      if (!user) return res.sendStatus(400)

      const expectedHash = authentication(user.authentication.salt, password)

      if (user.authentication.password !== expectedHash) return res.sendStatus(403)

      const salt = random()

      user.authentication.sessionToken = authentication(salt, (user._id as string).toString())

      await user.save()

      res.cookie('auth-node', user.authentication.sessionToken, { domain: 'localhost', path: '/' })

      return res.status(200).json(user).end()
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
  }
}
