import Enrollements from '../models/enrollments'
import _ from 'lodash'
import {REQUIRED} from '../config/error'
import handleError from '../utils/handleError'

export const create = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (
    _.isUndefined(body.transactionId) ||
    _.isUndefined(body.redeemId)
  ) {
    return res.status(REQUIRED.code).json(REQUIRED)
  }
  try {
    let result = await Enrollements.forge(body).save();
    await result.save();
    return res.status(200).json(result)
  }
  catch (error) {
    console.log(error);
    return handleError(res, error)
  }
};
