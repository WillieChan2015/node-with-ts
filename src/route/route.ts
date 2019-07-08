import koa from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import {log} from '../util/logger';
import Mongo from '../controller/mongo';
import Mongoose from 'mongoose';

type MongooseInstance = typeof Mongoose;

const logger = log("route");
const getStaticFile = (filename: string): string => {
    let filepath = path.join(__dirname, `../../static/${filename}`);
    return filepath;
}
const route = new Router();

// 引入MongoDB
const mongoose: MongooseInstance = new Mongo().connect();
// 创建 Schema 对象
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    nickName: {
        type: String,
        required: true,
    },
    email: String,
});
const UserModel = mongoose.model("UserModel", UserSchema);

type Context = koa.ParameterizedContext;
type Next = () => Promise<any>;

const check = async (ctx: Context, next: Next): Promise<any> => {
    // logger.info('method: ' + ctx.method);
    // logger.info('request path: ' + ctx.path);
    // logger.info("request time: " + new Date());
    return next();
};

const about = (ctx: Context) => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};

const main = (ctx: Context, next: Next) => {
    // ctx.response.type = 'html';
    // ctx.response.body = `
    //     Hello World
    //     <br>
    //     <a href="/about">About Page</a>
    //     <br>
    //     <a href="/get_name">get name</a>
    //     <br>
    //     <a href="/test_post">Test post</a>
    // `;
    ctx.cookies.set(
        'cid', 
        'hello world',
        {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',       // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('2019-08-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
        }
    );
    let content = fs.readFileSync(getStaticFile("index.html"), 'binary');
    ctx.body = content;
};

const testPost = async (ctx: Context) => {
    if (  ctx.method === 'GET' ) {
        // 当GET请求时候返回表单页面
        let html = `
          <h1>koa2 request post demo</h1>
          <form method="POST" action="/test_post">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
          </form>
        `;
        ctx.body = html
    } else if (  ctx.method === 'POST' ) {
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.request.body;
        logger.info('post data: ', postData);

        const doc = new UserModel(postData);
        let resDoc;

        try {
            resDoc = await doc.save();
            logger.debug('resDoc', resDoc);

            ctx.body = `
                <p>提交成功</p>
                <p>data:</p>
                <pre>${JSON.stringify(postData, undefined, 4)}</pre>
                <br>
                <a href="/">Return Index Page</a>
            `;
        } catch(e) {
            logger.error("写入MongoDB失败", e);

            ctx.body = `
                <p>提交失败</p>
                <br>
                <a href="/">Return Index Page</a>
            `;
        }
        
    } else {
        // 其他请求显示404
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
};

const getName = async (ctx: Context) => {
    // if (ctx.method.toLowerCase() === 'get') {
    //     ctx.response.status = 403;
    //     ctx.response.type = 'json';
    //     ctx.response.body = {
    //         code: 2000,
    //         msg: 'method not allowed'
    //     };
    //     return
    // }
    logger.debug("getName===================");
    let users = await UserModel.find({
        // userName: /name/,
    }, {
        userName: 1,
        nickName: 1,
        email: 1,
        _id: 0,
    });
    // ctx.response.type = 'html';
    ctx.response.body = users;
};


route.all("*", check);
route.get('/', main);
route.get('/about', about);
route.get('/get_name', getName);
route.all('/test_post', testPost);
route.all("*", (ctx) => {
    ctx.status = 404;
    ctx.body = '404 Not Found'
});

export default route;