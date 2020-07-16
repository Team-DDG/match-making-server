FROM node:14
MAINTAINER ljsung0805 <admin@jepanglee.page>

ENV NODE_ENV production

ADD . /app
WORKDIR /app

RUN yarn && yarn build
CMD yarn start:prod
