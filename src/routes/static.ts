// Import enviroment variables and express
import enviroment from '../config'
import express from 'express'

// Init express router
const staticRoutes = express.Router()

// Serve statically audio / video
staticRoutes.use(`/${enviroment.STATIC_VIDEO_DIRECTORY}`, express.static(`${enviroment.STATIC_VIDEO_DIRECTORY}`));
staticRoutes.use(`/${enviroment.STATIC_AUDIO_DIRECTORY}`, express.static(`${enviroment.STATIC_AUDIO_DIRECTORY}`));

// Export defined routes
export default staticRoutes