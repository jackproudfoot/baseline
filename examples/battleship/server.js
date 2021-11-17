import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import { workgroup } from './workgroup.js'

const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app)
const io = new Server(server)

workgroup(io)

server.listen(port, () => console.log(`Listening on port ${port}`));