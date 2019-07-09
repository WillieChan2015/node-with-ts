import log4js from 'log4js';
import koa from 'koa';

console.log("当前环境: ", `'${process.env.NODE_ENV}'`);
console.log(process.env.NODE_ENV === 'development');
const logLevel = process.env.NODE_ENV === 'development' ? "debug" : "info";
console.log("logLevel: ", logLevel);

log4js.configure({
    appenders: {
        console: { type: 'stdout' },
        normal: {
            type: 'dateFile', 
            filename: 'logs/log',
            maxLogSize: 1024*1024*10, // 只有type为file时生效
            backups: 10,    // 只有type为file时生效，表示超过10个log文件时，删除旧的，保留最新的10个
            category: "dateFileLog",
            pattern: "_yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m%n'
            }
        },
        log_error: {
            type: "file",  
            filename: "logs/error.log",
            maxLogSize: 1024*1024*100, // 只有type为file时生效
            layout: {
                type: 'pattern',
                pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m%n'
            }
        },
        error: {
            type: 'logLevelFilter',
            level: 'warn',
            appender: 'log_error',
        }
    },
    categories: {
        default: { appenders: ['console', 'normal', 'error'], level: logLevel },
    },
});

const loggerIns = log4js.getLogger();

export async function loggerMiddleware(ctx: koa.ParameterizedContext, next: () => Promise<any>): Promise<any> {
    if (ctx.path.indexOf('/src/') === 0) {
        return next();
    }
    loggerIns.info('request: ', ctx.method, ctx.path);
    loggerIns.info('user-agent: ' + ctx.headers['user-agent']);
    return next();
}

export function log(name: string): log4js.Logger {
    const logger = log4js.getLogger(name);
    return logger;
}

export default log4js.getLogger();