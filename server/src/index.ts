import http from 'http';
import SocketService from './services/socket';

async function init() {
    const httpServer = http.createServer();
    const socketService = new SocketService()
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    //attaching socket io to our http server, after this our socket server will start running
    socketService.io.attach(httpServer);
    httpServer.listen(PORT, () =>
        console.log(`HTTP Server started at PORT: ${PORT}`)
    )
}

init()