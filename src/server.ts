import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import prisma from './config/prisma'
import { authMiddleware } from './middlewares/authMiddleware'
import authRouter from './routes/authRouter'
import basketRouter from './routes/basketRouter'
import orderRouter from './routes/orderRouter'
import paymentRouter from './routes/paymentRouter'
import productRouter from './routes/productRouter'

dotenv.config()

const app = express()
const WEB_URL = process.env.WEB_URL || 'http://localhost:3000'
const PORT = process.env.PORT || 5000

async function main() {
	app.use(express.json())
	app.use(cors())
	app.use(helmet())
	app.use(morgan('dev'))
	app.use(cors({ origin: WEB_URL, credentials: true }))

	app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
	app.use('/api/payment/', authMiddleware, paymentRouter)
	app.use('/api/order/', authMiddleware, orderRouter)
	app.use('/api/basket/', authMiddleware, basketRouter)
	app.use('/api/auth/', authRouter)
	app.use('/api/product/', productRouter)

	app.get('/users', async (req: Request, res: Response) => {
		const ALL_USERS = await prisma.user.findMany()
		res.send(ALL_USERS)
	})
	app.get('/delete', async (req: Request, res: Response) => {
		const DELETE_ALL = await prisma.user.deleteMany()
		const ALL_USERS = await prisma.user.findMany()
		res.send(ALL_USERS)
	})

	app.get('/', (req: Request, res: Response) => {
		res.send('API is running...')
	})

	app.listen(PORT, () => {
		console.log('Server is running on port ', PORT)
	})
}

main()
