import socketIO from "socket.io-client"
const URLBase = 'http://10.185.2.163:3001'

export const io = socketIO(URLBase)
