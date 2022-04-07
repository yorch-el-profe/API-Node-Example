const http = require('http');

const server = http.createServer(function (request, response) {
    response.write('Hello World');
    response.end();
});

server.listen(process.env.PORT || 3000, function () {
    console.log('Servidor escuchando peticiones');
});