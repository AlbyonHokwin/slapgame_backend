import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { createServer, Server } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

const server: Server = createServer(app);

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Express server with TypeScript');
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
