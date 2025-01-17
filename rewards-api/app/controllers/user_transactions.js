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

const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

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
    let result = await TransactionsModel.forge(body).save();
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
  let { where, offset, limit } = req.query;
  try {
    const data = await TransactionsModel
      .where(where ? JSON.parse(where) : defaultWhere)
      .query(qb => {
        qb.offset(offset ? +offset : defaultOffset)
          .limit(limit ? +limit : defaultLimit)
      })
      .orderBy('status' , 'DESC')
      .fetchAll();
    return res.status(200).json(data)
  } catch (error) {
    return handleError(res, error)
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id, body);
  try {
    const model = await TransactionsModel.where('id', id).fetch({ require: true });
    model.set(body);
    await model.save();
    return res.status(200).json(model)
  } catch (error) {
    if (error.message === 'EmptyResponse') {
      return res.status(200).json(NOT_FOUND)
    }
    return handleError(res, error)
  }
};


export const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await TransactionsModel
      .where('id', id)
      .fetch();
    return res.status(200).json(data)
  } catch (error) {
    return handleError(res, error)
  }
};

export const getNumberOfApprove = async(req, res) => {
  try {
    const data = await TransactionsModel
      .where('status', 'Approve')
      .count();
    return res.status(200).json(data)
  } catch (error) {
    return handleError(res, error)
  }
};

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

export const uploadPhoto = async(req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.image[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return res.status(200).send(data);
    }
    catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  });
};