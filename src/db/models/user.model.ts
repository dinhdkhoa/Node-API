import mongoose from 'mongoose'
import { User } from 'types/user'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false }
  }
})

export const UserModel = mongoose.model('Course', UserSchema)

export const getUsers = async () => {
  const users = await UserModel.find()
  return users
}
export const getUsersByEmail = async (email: string) => await UserModel.findOne({ email })
export const getUsersBySessionToken = async (sessionToken: string) => await UserModel.findOne({ sessionToken })
export const getUserById = async (id: string) => await UserModel.findById({ id })
export const deleteUserById = async (id: string) => await UserModel.findByIdAndDelete({ _id: id })
export const updateUserById = async (id: string, username: string) =>
  await UserModel.findById({ _id: id }, { username })
export const createUser = async (reqBody: User) => {
  const user = new UserModel(reqBody)
  await user.save()
  return user
}
