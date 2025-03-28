import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js'
import aiRoutes from './routes/aiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';


const app= express();
app.use(express.json());
app.use(cookieParser());

app.use(errorMiddleware)


const corsOptions = {
    origin: process.env.ALLOWED_CORS?.split(',') || '',
    credentials: true, // Wajib untuk mengizinkan cookie
}

app.use(cors(corsOptions));
// app.use(cors())

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Clarylisk API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: process.env.BASE_URL_APP || 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs-clarylisk', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/user',userRoutes)
app.use('/ai',aiRoutes)
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
});