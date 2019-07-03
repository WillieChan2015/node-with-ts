import koa from 'koa';
// import route from 'koa-route';
import route from './route/route';
import bodyparser from 'koa-bodyparser';
import staticMiddleware from 'koa-static';
import path from 'path';

// type Context = koa.ParameterizedContext;

const app: koa = new koa();

const staticPath = '../static';

app.use(bodyparser());
app.use(route.routes());
app.use(staticMiddleware(
    path.join(__dirname, staticPath)
));

app.listen(3001, () => {
    console.log('[demo] route-use-middleware is starting at port 3001')
});