// Import enviroment variables, utils types and functions, express and types
import environment from '../config'
import glob from 'glob';
import express, {
    Request,
    Response,
} from "express";

// Init express router glob.sync(`${directory}/**/*`)
const apiRoutes = express.Router()

// Return all video data
for (const key in environment) {
    const environmentValue = environment[key as keyof typeof environment]
    console.log(environmentValue)
    apiRoutes.get(String(environmentValue?.replace('public', '')), (req: Request, res: Response) => res.json(glob.sync(`${environmentValue}/**/*`)))
}

// Export defined routes
export default apiRoutes