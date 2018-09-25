FROM node:10.1.0

ADD ./ /app
WORKDIR /app/rewards-api
RUN npm install
RUN npm i -g nodemon
RUN npm i -g knex
RUN npm install yarn
RUN cp .env.example .env
#RUN yarn migrate
EXPOSE 4000
CMD ["npm", "start"]