import * as http from 'http';

const server = http.createServer(function(req: http.IncomingMessage, res: http.ServerResponse): void {
    console.log("connect server...");
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write("Hello TypeScript");
    res.end();
});

server.listen(8082, function() {
    console.log("Server ls listening at http://localhost:8082");
});