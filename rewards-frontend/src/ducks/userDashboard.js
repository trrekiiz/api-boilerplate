import querystring from 'querystring';
export const FETCH_ALL_USER_TRANSACTION = "FETCH_ALL_USER_TRANSACTION";
export const FETCH_ALL_USER_TRANSACTION_SUCCESS = "FETCH_ALL_USER_TRANSACTION_SUCCESS";
export const FETCH_ALL_USER_TRANSACTION_FAIL = "FETCH_ALL_USER_TRANSACTION_FAIL";
export const FETCH_TRANSACTION_BY_ID = "FETCH_TRANSACTION_BY_ID";
export const FETCH_TRANSACTION_BY_ID_SUCCESS = "FETCH_TRANSACTION_BY_ID_SUCCESS";
export const FETCH_TRANSACTION_BY_ID_FAIL = "FETCH_TRANSACTION_BY_ID_FAIL";
export const UPDATE_USER_TRANSACTION = "UPDATE_USER_TRANSACTION";
export const UPDATE_USER_TRANSACTION_SUCCESS = "UPDATE_USER_TRANSACTION_SUCCESS";
export const UPDATE_USER_TRANSACTION_FAIL = "UPDATE_USER_TRANSACTION_FAIL";
export const SEND_SMS_TO_USER = "SEND_SMS_TO_USER";
export const SEND_SMS_TO_USER_SUCCESS = "SEND_SMS_TO_USER_SUCCESS";
export const SEND_SMS_TO_USER_FAIL = "SEND_SMS_TO_USER_FAIL";
export const GET_APPROVE_NUMBER = "GET_APPROVE_NUMBER";
export const GET_APPROVE_NUMBER_SUCCESS = "GET_APPROVE_NUMBER_SUCCESS";
export const GET_APPROVE_NUMBER_FAIL = "GET_APPROVE_NUMBER_FAIL";
export const MAP_USER_WITH_REDEEM = "MAP_USER_WITH_REDEEM";
export const MAP_USER_WITH_REDEEM_SUCCESS = "MAP_USER_WITH_REDEEM_SUCCESS";
export const MAP_USER_WITH_REDEEM_FAIL = "MAP_USER_WITH_REDEEM_FAIL";
export const GET_REDEEM_CODE_BY_ID = "GET_REDEEM_CODE_BY_ID";
export const GET_REDEEM_CODE_BY_ID_SUCCESS = "GET_REDEEM_CODE_BY_ID_SUCCESS";
export const GET_REDEEM_CODE_BY_ID_FAIL = "GET_REDEEM_CODE_BY_ID_FAIL";

export default function (state = {}, action = {} ) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_ALL_USER_TRANSACTION:
      return ({
        ...state, loading:true
      });
    case FETCH_ALL_USER_TRANSACTION_SUCCESS:
      const data = action.payload.data;
      return ({
        ...state,
        ...data,
        message: `success`,
        loading: false
      });
    case FETCH_ALL_USER_TRANSACTION_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case FETCH_TRANSACTION_BY_ID:
      return ({
        ...state, loading: true
      });
    case FETCH_TRANSACTION_BY_ID_SUCCESS:
      const tansaction = action.payload.data;
      return ({
        ...state,
        ...tansaction,
        message: `success`,
        loading: false
      });
    case FETCH_TRANSACTION_BY_ID_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case UPDATE_USER_TRANSACTION:
      return ({
        ...state, loading:true
      });
    case UPDATE_USER_TRANSACTION_SUCCESS:
      return ({
        message: `success`,
        loading: false
      });
    case UPDATE_USER_TRANSACTION_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case SEND_SMS_TO_USER:
      return ({
        ...state, loading:true
      });
    case SEND_SMS_TO_USER_SUCCESS:
      const response = action.payload.data;
      return ({
        ...state,
        ...response,
        message: `success`,
        loading: false
      });
    case SEND_SMS_TO_USER_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case GET_APPROVE_NUMBER:
      return ({
        ...state, loading: true
      });
    case GET_APPROVE_NUMBER_SUCCESS:
      const count = action.payload.data;
      return ({
        ...state,
        ...count,
        message: `success`,
        loading: false
      });
    case GET_APPROVE_NUMBER_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case MAP_USER_WITH_REDEEM:
      return ({
        ...state, loading:true
      });
    case MAP_USER_WITH_REDEEM_SUCCESS:
      return ({
        message: `success`,
        loading: false
      });
    case MAP_USER_WITH_REDEEM_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    case GET_REDEEM_CODE_BY_ID:
      return ({
        ...state, loading: true
      });
    case GET_REDEEM_CODE_BY_ID_SUCCESS:
      const redeem_id = action.payload.data;
      return ({
        ...state,
        ...redeem_id,
        message: `success`,
        loading: false
      });
    case GET_REDEEM_CODE_BY_ID_FAIL:
      return ({
        message: `fail ${action.error}`
      });
    default:
      return state;
  }
}

export function getAllUserTransaction(){
  return{
    type: FETCH_ALL_USER_TRANSACTION,
    payload: {
      client: 'default',
      request: {
        url: process.env.REACT_APP_API_USER_TRANSACTIONS,
        method: 'GET',
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      }
    }
  }
}

export function getUserTransactionById(id){
  return{
    type: FETCH_TRANSACTION_BY_ID,
    payload: {
      client: 'default',
      request: {
        url: `${process.env.REACT_APP_API_USER_TRANSACTIONS}/${id}`,
        method: 'GET',
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      }
    }
  }
}

export function updateUserTransactionById(id, value, receiptNumber, branchId){
  const data = {
    status: value,
    branchId : branchId,
    receiptNumber : receiptNumber
  };
  return{
    type: UPDATE_USER_TRANSACTION,
    payload: {
      client: 'default',
      request: {
        url: `${process.env.REACT_APP_API_USER_TRANSACTIONS}/${id}`,
        method: 'PATCH',
        data: data,
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      }
    }
  }
}

export function sendSMSToUserTransactionWhenApprove(phone,ref,redeem){
  const payload = querystring.stringify({
    username: process.env.REACT_APP_SMS_USERNAME,
    password: process.env.REACT_APP_SMS_PASSWORD,
    msisdn: phone,
    message: `โค้ดส่วนลดของท่านคือ ${redeem} สามารถนำไปแลกใช้ที่แอพลิเคชั่นของเรา`,
    sender: `OTP_SMS`
  });
  console.log(payload);
  return{
    type: SEND_SMS_TO_USER,
    payload: {
      client: 'sms',
      request: {
        url: `https://secure.thaibulksms.com/sms_api.php`,
        method: 'POST',
        data: payload
      }
    }
  }
}

export function countApproveUser(){
  return{
    type: GET_APPROVE_NUMBER,
    payload: {
      client: 'default',
      request: {
        url: `${process.env.REACT_APP_API_ADMIN_USERS}/approve`,
        method: 'GET',
        data: {},
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      }
    }
  }
}

export function mapUserTransactionWithRedeemCode(userId, redeemId){
  const payload = querystring.stringify({
    transactionId: userId,
    redeemId: redeemId
  });
  return{
    type: MAP_USER_WITH_REDEEM,
    payload: {
      client: 'default',
      request: {
        url: `${process.env.REACT_APP_API_ENROLLMENTS}/`,
        method: 'POST',
        data: payload,
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      }
    }
  }
}

export function getRedeemCodeFromId(id){
  return{
    type: GET_REDEEM_CODE_BY_ID,
    payload: {
      client: 'default',
      request: {
        url: `${process.env.REACT_APP_API_REDEEM}/${id}`,
        method: 'GET',
        data: {},
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      }
    }
  }
}