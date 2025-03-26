import { Request, Response } from 'express'
import { ILogin, IRegister } from '../dto/auth.dto'
import { AuthService } from '../services/auth.servise'

export class AuthController {
	private authService: AuthService
	constructor() {
		this.authService = new AuthService()
	}

	public register = async (req: Request, res: Response) => {
		try {
			const data: IRegister = req.body
			const user = await this.authService.register(data)
			res.status(201).json({ message: 'User created', userId: user.id })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}

	public login = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: ILogin = req.body
			const result = await this.authService.login(data)
			res.status(201).json({ token: result.token, user: result.user })
		} catch (error: any) {
			res.status(400).json({ message: error.message })
		}
	}
}
