// src/middleware/authMiddleware.ts
import { user } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma'

const JWT_SECRET = process.env.JWT_SERCER || 'your_jwt_secret'

interface AuthRequest extends Request {
	user?: user
}

export const authMiddleware = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader?.startsWith('Bearer ')) {
			res.status(401).json({ message: 'No token provided' })
			return
		}

		const token = authHeader.split(' ')[1]

		jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
			if (err) {
				res.status(401).json({ message: 'Invalid token' })
				return
			}

			const user = await prisma.user.findUnique({ where: { id: decoded.id } })

			if (!user) {
				res.status(401).json({ message: 'User not found' })
				return
			}

			req.user = user
			next()
		})
	} catch (error) {
		console.error(error)
		res.status(401).json({ message: 'Not authorized' })
	}
}
