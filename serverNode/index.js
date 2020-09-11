console.log('Rodando');
const express = require('express');
const app = express();
const http = require("http");
const port = process.env.Port || 3000;
const server = http.createServer(app);
const rest = require('./rest');



app.use('/', rest);
server.listen(port,()=>console.log('Running..'));
