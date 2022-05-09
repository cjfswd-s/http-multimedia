// Import enviroment variables and express
import environment from '../config'
import express from 'express'

// Init express router
const staticRoutes = express.Router()

// Serve statically audio / video
staticRoutes.use(`/${environment.STATIC_VIDEO_DIRECTORY}`, express.static(`${environment.STATIC_VIDEO_DIRECTORY}`));
staticRoutes.use(`/${environment.STATIC_AUDIO_DIRECTORY}`, express.static(`${environment.STATIC_AUDIO_DIRECTORY}`));

// Export defined routes
export default staticRoutes