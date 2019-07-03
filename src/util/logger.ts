import log4js from 'log4js';
import koa from 'koa';

const logger = log4js.getLogger();
logger.level = 'debug';

export async function loggerMiddleware(ctx: koa.ParameterizedContext, next: () => Promise<any>): Promise<any> {
    logger.info('method: ' + ctx.method);
    logger.info('request path: ' + ctx.path);
    console.log();
    return next();
}

export default logger;