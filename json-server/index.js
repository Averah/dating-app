const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const auth = require('json-server-auth');
const middlewares = jsonServer.defaults();

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth);

// const rules = auth.rewriter({

//   users: 664,

// })


// server.use(rules)
server.use(router);

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});