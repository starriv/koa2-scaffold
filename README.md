# koa2-startkit
[![Build Status](https://travis-ci.org/starriv/koa2-scaffold.svg?branch=master)](https://travis-ci.org/starriv/koa2-scaffold)
一个 基于Koa2 制作的的WEB 基本框架

使用了最新的 `latest plugin` + `stage 0`可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）以及提案中的特性，借助 Babel 编译

[开发模式] 开发模式下，文件修改后~~自动重启 Node.js~~ 自动热重启服务。

[调试模式] 断点调试 (test feature)

[线上模式] 借助 pm2 使用 cluster 模式压榨多核 CPU 性能

## Getting Start

```
git clone https://github.com/starriv/koa2-scaffold
cd koa2-scaffold
npm install # 国内可以使用 cnpm 加速, 教育网可使用 rednpm (https://npm.mirror.cqupt.edu.cn) 加速
npm start
```

然后使用浏览器打开 http://127.0.0.1:9083/ 即可

## Npm scripts

```
$ npm start # 开发模式, 开启开发模式之后对于 /src 目录内的任何改动会自动热替换生效
$ npm run build # build
$ npm test # 单元测试
$ npm run compile # 编译
$ npm run prod # 生产模式
```


## Docker部署
```
git clone https://github.com/starriv/koa2-scaffold
cd koa2-scaffold
docker build -t koa2app .
```

## 线上部署

```
npm run build # 单测, 编译 ES6/7 代码至 ES5
vim pm2.json # 检查 pm2 的配置
pm2 start pm2.json # 请确保已经 global 安装 pm2    (npm i pm2-cli -g)
cp nginx.conf /etc/nginx/conf.d/YourProject.conf # 自行配置 nginx 反代
```



## 目录结构说明

```
.
├── Dockerfile
├── README.md
├── bin
│   ├── debug.js
│   ├── development.js
│   └── production.js
├── database
├── lib
├── log
├── nginx.conf
├── package.json
├── pm2.json
├── public
│   ├── robots.txt
│   └── static
│       └── stylesheets
│           └── main.css
├── src
│   ├── app.js
│   ├── config
│   │   └── index.js
│   ├── controllers
│   │   └── index.js
│   ├── middlewares
│   ├── models
│   ├── routes
│   │   └── index.js
│   ├── server.js
│   └── services
├── storage
├── test
│   └── test.js
└── views
    ├── index.html
    └── public
        ├── 404.html
        └── 500.html

```


## 最后

感谢 [koa2-startkit](https://github.com/17koa/koa2-startkit.git)
