import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: process.env.PORT,
    STATIC_VIDEO_DIRECTORY: process.env.STATIC_VIDEO_DIRECTORY,
    STATIC_AUDIO_DIRECTORY: process.env.STATIC_AUDIO_DIRECTORY,
    STATIC_IMAGE_DIRECTORY: process.env.STATIC_IMAGE_DIRECTORY,
}
