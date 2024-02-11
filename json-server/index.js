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

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// Эндпоинт для логина
// server.post('/login', (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
//         const { users = [] } = db;

//         const userFromBd = users.find(
//             (user) => user.email === email && user.password === password,
//         );

//         if (userFromBd) {
//             console.log(userFromBd);
//             return res.json(userFromBd);
//         }

//         return res.status(403).json({ message: 'Пользователь не найден' });
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ message: e.message });
//     }
// });


server.use((req, res, next) => {
    try {
    if (req.method === 'POST' && req.path === '/signup') {
        const { email, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.email === email && user.password === password,
        );

        if (userFromBd) {
            console.log(userFromBd);
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'Пользователь не найден' });
    }} catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/signup') {
      const { email, password, username } = req.body;
      const users = router.db.get('users').value();
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      } else {
        next();
      }
    } else {
      next();
    }
  });

// проверяем, авторизован ли пользователь
// server.use((req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.status(403).json({ message: 'AUTH ERROR' });
//     }

//     next();
// });

//для регистрации
server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/signup') {
      const { email, password } = req.body;
      const users = router.db.get('users').value();
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      } else {
        next();
      }
    } else {
      next();
    }
  });


server.use(router);

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});