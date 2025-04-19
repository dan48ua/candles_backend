import { user } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma'
import { ILogin, IRegister } from '../dto/auth.dto'
import { RegularExpressinos } from '../utils/regularExpressions.utils'

const JWT_SECRET = process.env.JWT_SERCER || 'your_jwt_secret'
const regularExpressinos = new RegularExpressinos()

export class AuthService {
	public async register(data: IRegister): Promise<user> {
		const { email, password, name, phone, surname } = data
		regularExpressinos.emailEx(email)
		regularExpressinos.phoneEx(phone)
		const existingUser = await prisma.user.findUnique({ where: { email } })
		if (existingUser) {
			throw new Error('User already exists')
		}

		if (!email || !password || !name || !phone) {
			throw new Error('Enter all details')
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = await prisma.user.create({
			data: { email, password: hashedPassword, name, phone, surname },
		})
		return newUser
	}

	public async login(data: ILogin): Promise<{ token: string; user: user }> {
		const { email, password } = data
		const user = await prisma.user.findUnique({ where: { email } })

		if (!user) {
			throw new Error('User not found')
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			throw new Error('Invalid pasword or email')
		}

		const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
		return { token, user }
	}
}
