import dotenv from 'dotenv';
import express, { Response } from 'express';
import http from 'http';
import { Server as ioServer, Socket } from 'socket.io';
import cors, { type CorsOptions } from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes/index';
import errorsLogger from './middlewares/errorsLogger';
import errorsHandler from './middlewares/errorsHandler';
import { handshakeRoomId, handshakeUsername } from './middlewares/socket.middleware';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string || '3000', 10);
app.set('port', port);

const corsOption: CorsOptions = {
    origin: 'http://localhost:3001',
}

const server = http.createServer(app);
export const io = new ioServer(server, {
    cors: corsOption,
});

app.use(cors(corsOption));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);

app.get('/', (_, res: Response) => {
    res.send('Express server for slapgame');
});

io.use(handshakeUsername);
io.use(handshakeRoomId);

io.on('connection', async (socket) => {
    console.log('user connected:', socket.data.username);
    const room = socket.data.room;
    socket.join(room);
    socket.broadcast.emit('player:new', socket.data.username);
    socket.emit('moveToLobby', room);

    socket.on('test', () => {
        console.log('test');
        socket.to(room).emit('testback');
    })

    socket.on('disconnect', async () => {
        socket.leave(room);
        console.log('user disconnected');
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.use(errorsLogger);
}

app.use(errorsHandler);

server.listen(port, () => console.log(`listening on port ${port}`));
