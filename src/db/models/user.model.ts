import mongoose, { Document } from 'mongoose'
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

export const UserModel = mongoose.model('user', UserSchema)

export const getUsers = async () => (await UserModel.find()) as User[]

export const getUsersByEmail = async (email: string, login: boolean) =>
  login
    ? ((await UserModel.findOne({ email }).select('+authentication.salt +authentication.password')) as User & Document)
    : ((await UserModel.findOne({ email })) as User & Document)

export const getUsersBySessionToken = async (sessionToken: string) => {
  return (await UserModel.findOne({ 'authentication.sessionToken': sessionToken })) as User & Document
}

export const getUserById = async (id: string) => (await UserModel.findById({ id })) as User & Document

export const deleteUserById = async (id: string) => await UserModel.findByIdAndDelete({ _id: id })

export const updateUserById = async (id: string, username: string) =>
  (await UserModel.findByIdAndUpdate({ _id: id }, { username })) as User & Document

export const createUser = async (user: User) => {
  const newUser = new UserModel(user)
  await newUser.save()
  return newUser
}
