FROM node:10.1.0

ADD ./ /app
WORKDIR /app/rewards-frontend
RUN npm install
RUN cp .env.example .env
#RUN yarn migrate
EXPOSE 3000
CMD ["npm", "start"]