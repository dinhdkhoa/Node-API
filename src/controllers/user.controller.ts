import { deleteUserById, getUsers, updateUserById } from './../db/models/user.model'
import { Request, Response } from 'express'
import { User } from 'types/user'

export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await getUsers()
      if (!users) return res.sendStatus(500)
      return res.status(200).json(users)
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await deleteUserById(id)
      return res.status(200).send(`User ${id} deleted`)
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
  },
  updateUsername: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { username } = req.body
      if (!username) return res.sendStatus(400)
      const updateUser = await updateUserById(id, username)
      if (!updateUser) return res.sendStatus(500)
      return res.status(200).send(`User ${updateUser.username} changed name to ${username}`)
    } catch (error) {
      console.log(error)
      return res.sendStatus(400)
    }
  }
}
