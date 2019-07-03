# node(koa) with ts

## dev
热启动开发服务有以下几种方式：
1. 方法1：
```Bash
tsc --watch
# 打开另一个命令行窗口
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
