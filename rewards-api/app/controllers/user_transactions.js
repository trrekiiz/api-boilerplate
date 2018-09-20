import TransactionsModel from '../models/user_transactions'
import _ from 'lodash'
import {REQUIRED} from '../config/error'
import handleError from '../utils/handleError'
import {
  defaultWhere,
  defaultOffset,
  defaultLimit,
  defaultOrderDesc
} from '../config/default'

export const create = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (
    _.isUndefined(body.firstName) ||
    _.isUndefined(body.lastName) ||
    _.isUndefined(body.mobileNumber)
  ) {
    return res.status(REQUIRED.code).json(REQUIRED)
  }
  try {
    const result = await TransactionsModel.forge(body).save();
    console.log(result);
    await result.save();
    return res.status(200).json(result)
  }
  catch (error) {
    console.log(error);
    return handleError(res, error)
  }
};

export const get = async (req, res) => {
  let { where, offset, limit, order } = req.query;
  try {
    const data = await TransactionsModel
      .where(where ? JSON.parse(where) : defaultWhere)
      .query(qb => {
        qb.offset(offset ? +offset : defaultOffset)
          .limit(limit ? +limit : defaultLimit)
      })
      .orderBy(
        order ? order[0] : defaultOrderDesc[0],
        order ? _.toUpper(order[1]) : defaultOrderDesc[1])
      .fetchAll();
    return res.status(200).json(data)
  } catch (error) {
    return handleError(res, error)
  }
};

export const update = async (req, res) => {
  console.log("Hello this is update");
  const result = {
    message: `this patch endpoint`
  };
  return res.status(200).json(result)
};