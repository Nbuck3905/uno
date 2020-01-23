import socketIO from "socket.io-client"
import { URLBase } from './URLBase'

export const io = socketIO(URLBase)
