import multer from 'multer'
import { join } from 'path'

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, join(__dirname, '../uploads'))
	},
	filename: (_req, file, cb) => {
		const unique = Date.now() + '-' + file.originalname
		cb(null, unique)
	},
})

export const upload = multer({ storage })
