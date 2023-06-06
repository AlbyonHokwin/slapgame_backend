import { Socket } from 'socket.io';
import { io } from '../index';
import { ExtendedError } from 'socket.io/dist/namespace';
import { v4 as uuidv4 } from 'uuid';

type MiddlewareSocket = (socket: Socket, next: (err?: ExtendedError | undefined) => void) => void;

export const handshakeUsername: MiddlewareSocket = (socket, next) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error('no username'));
  }

  socket.data.username = username;
  next();
};

export const handshakeRoomId: MiddlewareSocket = async (socket, next) => {
  const roomId = socket.handshake.auth.roomId;

  if (!roomId) {
    let tempRoomId = uuidv4();
    while (true) {
      const socketsInRoom = await io.in(tempRoomId).fetchSockets();
      if (socketsInRoom.length === 0) break;
      tempRoomId = uuidv4();
    }
    socket.data.room = tempRoomId;
    return next();
  }

  const socketsInRoom = await io.in(roomId).fetchSockets();
  if (socketsInRoom.length === 0) return next(new Error('This room Id doesn\'t exist'));

  socket.data.room = roomId;
  next();
};