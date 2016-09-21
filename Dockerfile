FROM cusspvz/node:latest

# copy app
ADD . /home/koa2app/app
WORKDIR /home/koa2app/app

RUN npm install --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist

CMD ["npm", "run", "prod"]
EXPOSE 9083
