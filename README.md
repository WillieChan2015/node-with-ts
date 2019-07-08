# node(koa) with ts

本项目模版使用ts为编程语言编写的node后台，服务器使用 `koa`，数据库使用 `MongoDB`，并使用 `mongoose` 去操作`MongoDB`。

## dev
热启动开发服务有以下几种方式：
1. 方法1：
```Bash
# 首先需要启动该命令把 ts 文件编译成 js，打包出的文件位于 `./dist` 目录下
tsc --watch

# 之后打开另一个命令行窗口，并运行
# 使用 yarn:
yarn dev
# 使用 npm:
npm run dev
```

2. 方法2：
```bash
gulp
```
**注意：** 此方法需要 `package.json` 上的 `gulp` 版本 与全局安装的 `gulp` 版本一致，不然会报错.


## build
打包文件
```bash
yarn build
# 使用 npm:
npm run build
```
