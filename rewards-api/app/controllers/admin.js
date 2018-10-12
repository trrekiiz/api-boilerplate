import AdminModel from '../models/admin'
import _ from 'lodash'
import {REQUIRED} from '../config/error'
import handleError from '../utils/handleError'
import {
  defaultWhere,
  defaultOffset,
  defaultLimit,
  defaultOrderDesc
} from '../config/default'

let jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');


export const create = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (
    _.isUndefined(body.username) ||
    _.isUndefined(body.password) ||
    _.isUndefined(body.aliasName)
  ) {
    return res.status(REQUIRED.code).json(REQUIRED)
  }
  try {
    body.password = bcrypt.hashSync(body.password, 10);
    console.log(body);
    let result = await AdminModel.forge(body).save();
    console.log(result);
    await result.save();
    return res.status(200).json(result)
  }
  catch (error) {
    console.log(error);
    return handleError(res, error)
  }
};

export const signIn = async (req, res) => {
  let { where, offset, limit, order } = req.query;
  const username = req.body.username;
  try {
    const data = await AdminModel
      .where('username', username)
      .fetch();
    if (!data){
      return handleError(res, error)
    }
    else if(data){
        if (bcrypt.compareSync(req.body.password,data.get('password'))) {
          let token = jwt.sign({ username: data.get('username'), id: data.get('id')}, 'RESTFULAPIs');
          return res.status(200).json({
            token: token,
            name : data.get('aliasName')
          });
        }
        else {
          return handleError(res, error)
        }
    }
  } catch (error) {
    return handleError(res, error)
  }
};