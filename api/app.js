const http = require('http');
//const { Server } = require('socket.io');

const express = require('express');
const cors = require('cors');

const titularesRoutes = require('./src/routes/titulares.routes.js');
const escuelasRoutes = require('./src/routes/escuelas.routes.js');

const app = express();


//Configuracion de Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//HABILITO CORS
app.use(cors());

//creo servidor http para socket
const server = http.createServer(app);

//configuro socket io con el servidor
//const io=socketIo(server);
{/**
    
    const io = new Server(server,{
        cors:{
            origin:"*",
            methods: ["GET" , "POST"]
        }
    });
    */}

//const io = new Server(server);

//Escucho conexiones de clientes socket
{/**
    io.on("connection", (socket)=>{
        console.log("Cliente conectado: ", socket.id);
    
        socket.on('solicitud-cliente',(data)=>{
            console.log(data);
        });
    })
    
    */}

    //rutas
    //Rutas de Modulo titulares
    app.use('/api', titularesRoutes);
    
    //Rutas de Mmdulo Escuelas
    app.use('/api', escuelasRoutes);


//server.listen(3001,()=>{console.log("Server Socket is Running")})

//module.exports = app;
module.exports = server;