const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.on('listening',function(){
    console.log('Okay, Everything well in '+port);
});

server.listen(port);