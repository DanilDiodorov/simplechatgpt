import { io } from 'socket.io-client'

export const socket = io(
    process.env.NODE_ENV === 'production'
        ? 'https://simplechatgpt-api.onrender.com'
        : 'http://localhost:10000'
)
