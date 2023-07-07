import { getUsersBySessionToken } from './../db/models/user.model'
import { NextFunction, Request, Response } from 'express'
import merge from 'lodash/merge'
import get from 'lodash/get'

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies['auth-node']

    if (!sessionToken) return res.sendStatus(403)

    const existingUser = await getUsersBySessionToken(sessionToken)

    if (!existingUser) return res.sendStatus(401)

    merge(req, { identity: existingUser })
    return next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const accountId: string = get(req, 'identity._id') || ''
    if (accountId.toString() !== id) return res.sendStatus(400)
    return next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
