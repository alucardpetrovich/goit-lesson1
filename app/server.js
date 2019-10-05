const QuestionsRouter = require('./routers/questions.router');
const http = require('http');

const PORT = 3000;
const paths = Object.entries(QuestionsRouter)
    .map(([ routeStr, handler ]) => {
        const [ method, url ] = routeStr.split(' ');
        return { method, url, handler };
    });

http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    paths.some(pathInfo => {
        if ( method === pathInfo.method && url === pathInfo.url ) {
            pathInfo.handler(req, res);
            return true;
        }
    });

})
    .listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
