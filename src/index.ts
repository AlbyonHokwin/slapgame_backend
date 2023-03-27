import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server as ioServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes/index';
import errorsLogger from './middlewares/errorsLogger';
import errorsHandler from './middlewares/errorsHandler';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string || '3000', 10);
app.set('port', port);

const server = http.createServer(app);
const io = new ioServer(server);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);

app.get('/', (_, res: Response) => {
    res.send('Express server for slapgame');
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.use(errorsLogger);
}

app.use(errorsHandler);

server.listen(port, () => console.log(`listening on port ${port}`));
