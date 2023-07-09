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

export const getUsers = async (): Promise<User[]> => await UserModel.find()

export const getUsersByEmail = async (email: string, login: boolean): Promise<(User & Document) | null> =>
  login
    ? ((await UserModel.findOne({ email }).select('+authentication.salt +authentication.password')) as User & Document)
    : ((await UserModel.findOne({ email })) as User & Document)

export const getUsersBySessionToken = async (sessionToken: string): Promise<(User & Document) | null> => {
  return await UserModel.findOne({ 'authentication.sessionToken': sessionToken })
}

export const getUserById = async (id: string): Promise<(User & Document) | null> => await UserModel.findById({ id })

export const deleteUserById = async (id: string) => await UserModel.findByIdAndDelete({ _id: id })

export const updateUserById = async (id: string, username: string): Promise<(User & Document) | null> =>
  await UserModel.findByIdAndUpdate({ _id: id }, { username })

export const createUser = async (user: User) => {
  const newUser = new UserModel(user)
  await newUser.save()
  return newUser
}
