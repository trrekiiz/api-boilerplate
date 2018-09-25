FROM node:8.11.4-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

COPY ./.babelrc .
COPY ./next.config.js .
COPY ./components ./components
COPY ./config ./config
COPY ./pages ./pages
COPY ./redux ./redux
COPY ./tools ./tools
RUN yarn build
COPY ./server ./server
COPY ./static ./static
EXPOSE 3000

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]