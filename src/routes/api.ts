// Import enviroment variables, utils types and functions, express and types
import enviroment from '../config'
import * as utils from '../utils/utils'
import express, {
    Request,
    Response,
} from "express";

// Init express router
const apiRoutes = express.Router()

let multimedia

// Return all video data
for (const key in enviroment) {
    multimedia = new utils.Multimedia(`${enviroment[key as keyof typeof enviroment]}`)
    const json = [...multimedia.data]
    apiRoutes.get(String(enviroment[key as keyof typeof enviroment]?.replace('public', '')), (req: Request, res: Response) => res.json(json))
}

multimedia = null

// Export defined routes
export default apiRoutes