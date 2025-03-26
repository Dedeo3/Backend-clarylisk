import {express} from 'express';
import { swaggerUi } from 'swagger-ui-express';
import { swaggerJsDoc } from 'swagger-jsdoc';
import 'dotenv/config'

const app= express();


const swaggerOptions = {
    swaggerDefinition: {
        myapi: '3.0.0',
        info: {
            title: 'Clarylisk API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: process.env.BASE_URL_APP,
            },
        ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.listen(process.env.PORT, () => {
    console.log('App listening on port 3000!');
});