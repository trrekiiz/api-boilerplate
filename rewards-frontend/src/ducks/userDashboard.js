export const FETCH_ALL_USER_TRANSACTION = "FETCH_ALL_USER_TRANSACTION";
export const FETCH_ALL_USER_TRANSACTION_SUCCESS = "FETCH_ALL_USER_TRANSACTION_SUCCESS";
export const FETCH_ALL_USER_TRANSACTION_FAIL = "FETCH_ALL_USER_TRANSACTION_FAIL";
export const FETCH_TRANSACTION_BY_ID = "FETCH_TRANSACTION_BY_ID"
export const FETCH_TRANSACTION_BY_ID_SUCCESS = "FETCH_TRANSACTION_BY_ID_SUCCESS"
export const FETCH_TRANSACTION_BY_ID_FAIL = "FETCH_TRANSACTION_BY_ID_FAIL" 

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
      console.log(tansaction)
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
        method: 'GET'
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
        method: 'GET'
      }
    }
  }
}