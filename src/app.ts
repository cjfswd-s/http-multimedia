import { Server } from "http";
import express, {
    Application,
    json,
    urlencoded
} from "express";
import cors from "cors"
import morgan from "morgan"

import staticRoutes from './routes/static';

import environment from './config'
import apiRoutes from './routes/api';

function initExpress(): Server {
    const app: Application = express();

    // Middlewares: Observe with Morgan, Send response as JSON type and Acept URL parameters
    app.use(cors())
    app.use(morgan('tiny'))
    app.use(json());
    app.use(urlencoded({ extended: false }));

    // Serve static assets
    app.use(staticRoutes);

    // Serve static assets like api
    app.use('/api', apiRoutes);

    // Define Express Port
    const PORT: string | number = process.env.PORT || environment.PORT || 8080;

    // Init express server and return port
    return app.listen(
        PORT,
        () => console.log(`Server started on port ${PORT}`)
    );
}

initExpress();