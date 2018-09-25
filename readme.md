[![pipeline status](https://mbx-git.magicboxasia.com/nivea/rewards/badges/develop/pipeline.svg)](https://mbx-git.magicboxasia.com/nivea/rewards/commits/develop)
[![coverage report](https://mbx-git.magicboxasia.com/nivea/rewards/badges/develop/coverage.svg)](https://mbx-git.magicboxasia.com/nivea/rewards/commits/develop)

# Nivea
All of nivea-redeem project

## To start developing
1. clone this repository

### To develop frontend module
1. `cd rewards-frontend`
2. `yarn install` to install project dependencies.
3. create `.env` file from `.env.example`.
4. edit `API_URL` then save the file.
5. `yarn dev` to start development server.

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
