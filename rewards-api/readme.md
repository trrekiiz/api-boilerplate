### To develop api module
- Install nodemon with following command
```
npm i -g nodemon
```
- Install knex cli with following command
```
npm i -g knex
```
- Copy `.env.example` to `.env` with following command
```
cp .env.example .env
```
- Add value to field without doube-quote(`""`) or single-quote(`''`) in file `.env`
- Migrate table with following command
```
yarn migrate
```
- Seed data into table 
```
yarn seed
```
