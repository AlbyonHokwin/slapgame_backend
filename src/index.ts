import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server as ioServer } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

const server: http.Server = http.createServer(app);
const io = new ioServer(server);

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Express server for slapgame');
});

io.on('connection', (socket) => console.log('user connected'));

server.listen(port, () => console.log(`listening on ${port}`));
