const http = require('http');

// importation application
const app = require('./app');
//dire a l'application sur quel port elle doit tourner
app.set('port', process.env.PORT || 3000);
//on passe l'application au server
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);